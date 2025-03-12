
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const GEMINI_API_KEY = "AIzaSyAPuyc1O1jKBi0KawKmi_jeExdwiHq7PXU";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query, context } = await req.json();
    
    if (!query) {
      throw new Error("Query parameter is required");
    }

    console.log("Processing search query:", query);
    console.log("Context items count:", context?.length || 0);

    // Format the context for Gemini with ALL developer data
    const formattedContext = context.map(dev => 
      `ID: ${dev.id}
Name: ${dev.name}
Role: ${dev.role}
Location: ${dev.location}
Skills: ${dev.skills.join(', ')}
Experience: ${dev.experience}
Available: ${dev.available ? 'Yes' : 'No'}
Hourly Rate: ${dev.hourly_rate ? '$' + dev.hourly_rate + '/hr' : 'Not specified'}`
    ).join('\n\n');

    // Call Gemini API
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": GEMINI_API_KEY,
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `You are a specialized search assistant for a tech talent platform.
            
Your task is to analyze a user's natural language search query and find the most relevant developer profiles from the database.

Here is the user's search query: "${query}"

Here are the available developer profiles:
${formattedContext}

Return a JSON object with the following format:
{
  "matches": ["uuid1", "uuid2", "uuid3"], // An array of profile IDs sorted by relevance
  "explanation": "Detailed explanation of why these profiles match the query"
}

Focus on understanding the nuances of the query, including skills, experience level, and other requirements.
Only include profiles that are truly relevant to the query.
Limit your response to JSON format only.`
          }]
        }],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 1000,
        }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API error:", errorText);
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log("API response received");

    // Extract the relevant profiles and explanation
    let result;
    try {
      const content = data.candidates[0].content.parts[0].text;
      console.log("Response content:", content);
      
      // Try to parse as JSON
      try {
        result = JSON.parse(content);
        console.log("Successfully parsed JSON response");
      } catch (e) {
        // If parsing fails, use regex to extract profile IDs
        console.log("Parsing JSON failed, using regex extraction");
        
        // First try to extract UUIDs
        const uuidRegex = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi;
        const matches = content.match(uuidRegex) || [];
        
        // If no UUIDs found, try to extract any numeric IDs
        const numericMatches = matches.length === 0 ? (content.match(/\b\d+\b/g) || []) : [];
        
        result = {
          matches: [...new Set(matches.length > 0 ? matches : numericMatches)],
          explanation: content
        };
      }
    } catch (e) {
      console.error("Error processing API response:", e);
      result = { matches: [], explanation: "Failed to process search results" };
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error in search function:", error);
    return new Response(
      JSON.stringify({ error: error.message, matches: [], explanation: "An error occurred during search" }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
