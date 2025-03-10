
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, MessageSquare, Bell, User, Menu, X } from 'lucide-react';
import { APP_NAME, ROUTES } from '@/lib/constants';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false); // This would come from auth context

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 dark:bg-black/80 backdrop-blur-lg shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-primary font-display font-bold text-2xl transition-transform hover:scale-[1.02] duration-300"
          >
            <span className="text-gradient bg-gradient-to-r from-primary via-primary to-blue-600">{APP_NAME}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              to={ROUTES.SEARCH}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive(ROUTES.SEARCH)
                  ? 'bg-primary/10 text-primary'
                  : 'hover:bg-primary/5 text-foreground/80 hover:text-foreground'
              }`}
            >
              Discover
            </Link>
            <Link
              to="/jobs"
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/jobs')
                  ? 'bg-primary/10 text-primary'
                  : 'hover:bg-primary/5 text-foreground/80 hover:text-foreground'
              }`}
            >
              Jobs
            </Link>
            <Link
              to="/about"
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/about')
                  ? 'bg-primary/10 text-primary'
                  : 'hover:bg-primary/5 text-foreground/80 hover:text-foreground'
              }`}
            >
              About
            </Link>
          </nav>

          {/* Right side - auth or user menu */}
          <div className="flex items-center space-x-2">
            {isAuthenticated ? (
              <>
                {/* Authenticated state */}
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Search className="h-5 w-5" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <MessageSquare className="h-5 w-5" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Bell className="h-5 w-5" />
                </Button>
                <Link to={ROUTES.PROFILE}>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="rounded-full bg-primary/5 hover:bg-primary/10"
                  >
                    <User className="h-5 w-5 text-primary" />
                  </Button>
                </Link>
              </>
            ) : (
              <>
                {/* Unauthenticated state */}
                <div className="hidden sm:block">
                  <Link to={ROUTES.SIGN_IN}>
                    <Button variant="ghost" className="font-medium">
                      Sign in
                    </Button>
                  </Link>
                </div>
                <Link to={ROUTES.SIGN_UP}>
                  <Button className="font-medium shadow-sm">
                    Sign up free
                  </Button>
                </Link>
              </>
            )}

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={toggleMobileMenu}
                className="text-muted-foreground hover:text-foreground"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-t animate-fade-in">
          <div className="container mx-auto px-4 py-4 space-y-2">
            <Link
              to={ROUTES.SEARCH}
              className={`block px-4 py-3 rounded-md text-base font-medium transition-colors ${
                isActive(ROUTES.SEARCH)
                  ? 'bg-primary/10 text-primary'
                  : 'hover:bg-primary/5 text-foreground/80 hover:text-foreground'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Discover
            </Link>
            <Link
              to="/jobs"
              className={`block px-4 py-3 rounded-md text-base font-medium transition-colors ${
                isActive('/jobs')
                  ? 'bg-primary/10 text-primary'
                  : 'hover:bg-primary/5 text-foreground/80 hover:text-foreground'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Jobs
            </Link>
            <Link
              to="/about"
              className={`block px-4 py-3 rounded-md text-base font-medium transition-colors ${
                isActive('/about')
                  ? 'bg-primary/10 text-primary'
                  : 'hover:bg-primary/5 text-foreground/80 hover:text-foreground'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            
            {!isAuthenticated && (
              <Link
                to={ROUTES.SIGN_IN}
                className="block px-4 py-3 rounded-md text-base font-medium hover:bg-primary/5 text-foreground/80 hover:text-foreground transition-colors sm:hidden"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
