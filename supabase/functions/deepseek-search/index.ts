
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const DEEPSEEK_API_KEY = Deno.env.get('DEEPSEEK_API_KEY');

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

    // Call DeepSeek API
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek-coder",
        messages: [
          {
            role: "system",
            content: `You are a specialized search assistant for a tech talent platform. 
            Your task is to enhance search queries by understanding user intent and context.
            When given a search query and context information about available developer profiles, 
            return an array of relevant profile UUIDs sorted by relevance, 
            along with an explanation of why each profile matches.
            Format your response as a JSON object with 'matches' (array of profile UUIDs as strings) 
            and 'explanation' (text explaining the reasoning).`
          },
          {
            role: "user",
            content: `Search query: "${query}"
            Available profiles context: ${JSON.stringify(context)}`
          }
        ],
        temperature: 0.2,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("DeepSeek API error:", errorText);
      throw new Error(`DeepSeek API error: ${response.status}`);
    }

    const data = await response.json();
    console.log("DeepSeek response received");

    // Extract the relevant profiles and explanation
    let result;
    try {
      const content = data.choices[0].message.content;
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
      console.error("Error processing DeepSeek response:", e);
      result = { matches: [], explanation: "Failed to process search results" };
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error in deepseek-search function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
