
import { Link } from 'react-router-dom';
import { APP_NAME } from '@/lib/constants';

const Footer = () => {
  return (
    <footer className="bg-background border-t mt-auto">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="text-xl font-display font-bold">
              <span className="text-gradient bg-gradient-to-r from-primary via-primary to-blue-600">
                {APP_NAME}
              </span>
            </Link>
            <p className="text-muted-foreground max-w-xs">
              Connecting exceptional tech talent with innovative companies worldwide.
            </p>
            <div className="pt-2">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-foreground mb-4">For Professionals</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/create-profile"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Create Profile
                </Link>
              </li>
              <li>
                <Link 
                  to="/jobs"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link 
                  to="/resources"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Resources
                </Link>
              </li>
              <li>
                <Link 
                  to="/success-stories"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Success Stories
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-foreground mb-4">For Recruiters</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/search"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Find Talent
                </Link>
              </li>
              <li>
                <Link 
                  to="/post-job"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Post a Job
                </Link>
              </li>
              <li>
                <Link 
                  to="/pricing"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link 
                  to="/employer-resources"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Employer Resources
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-foreground mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/about"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/blog"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link 
                  to="/privacy"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  to="/terms"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
