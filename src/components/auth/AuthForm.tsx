
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ROUTES } from '@/lib/constants';
import { useToast } from '@/hooks/use-toast';
import { Github } from 'lucide-react';

interface AuthFormProps {
  type: 'sign-in' | 'sign-up';
}

const AuthForm = ({ type }: AuthFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [accountType, setAccountType] = useState<'professional' | 'recruiter'>('professional');
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // This would be a real auth API call in a production app
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast({
        title: type === 'sign-in' ? 'Welcome back!' : 'Account created!',
        description: type === 'sign-in' 
          ? 'You have successfully signed in.' 
          : 'Your account has been created successfully.',
      });
      
      navigate(ROUTES.DASHBOARD);
    } catch (error) {
      toast({
        title: 'Authentication failed',
        description: 'Please check your credentials and try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setIsLoading(true);
    
    // This would be a real auth API call in a production app
    setTimeout(() => {
      toast({
        title: 'Demo mode activated',
        description: `You're now signed in as a ${accountType}.`,
      });
      navigate(ROUTES.DASHBOARD);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="w-full max-w-md p-8 space-y-8 bg-card rounded-xl shadow-sm border animate-scale-in">
      <div className="text-center">
        <h2 className="text-2xl font-bold tracking-tight">
          {type === 'sign-in' ? 'Welcome back' : 'Create your account'}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {type === 'sign-in' 
            ? 'Enter your credentials to access your account' 
            : 'Fill out the form below to create your account'}
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {type === 'sign-up' && (
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
              className="h-11"
            />
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="h-11"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            {type === 'sign-in' && (
              <Button variant="link" className="p-0 h-auto text-xs" type="button">
                Forgot password?
              </Button>
            )}
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={type === 'sign-in' ? 'Enter your password' : 'Create a password'}
            required
            className="h-11"
          />
        </div>
        
        {type === 'sign-up' && (
          <div className="space-y-2">
            <Label htmlFor="account-type">I am a</Label>
            <div className="grid grid-cols-2 gap-4">
              <Button
                type="button"
                variant={accountType === 'professional' ? 'default' : 'outline'}
                onClick={() => setAccountType('professional')}
                className={`h-11 ${accountType === 'professional' ? 'border-primary' : ''}`}
              >
                Professional
              </Button>
              <Button
                type="button"
                variant={accountType === 'recruiter' ? 'default' : 'outline'}
                onClick={() => setAccountType('recruiter')}
                className={`h-11 ${accountType === 'recruiter' ? 'border-primary' : ''}`}
              >
                Recruiter
              </Button>
            </div>
          </div>
        )}
        
        <Button 
          type="submit" 
          className="w-full h-11 font-medium"
          disabled={isLoading}
          isLoading={isLoading}
        >
          {type === 'sign-in' ? 'Sign in' : 'Create account'}
        </Button>
        
        <div className="flex items-center">
          <Separator className="flex-grow" />
          <span className="px-3 text-xs text-muted-foreground">or</span>
          <Separator className="flex-grow" />
        </div>
        
        <Button
          type="button"
          variant="outline"
          className="w-full h-11 font-medium"
          onClick={handleDemoLogin}
          disabled={isLoading}
        >
          Continue with demo account
        </Button>
        
        <Button
          type="button"
          variant="outline"
          className="w-full h-11 font-medium"
          disabled={isLoading}
        >
          <Github className="mr-2 h-4 w-4" />
          Continue with GitHub
        </Button>
      </form>
      
      <div className="text-center text-sm">
        {type === 'sign-in' ? (
          <p className="text-muted-foreground">
            Don't have an account?{' '}
            <Button 
              variant="link" 
              className="p-0 h-auto" 
              type="button"
              onClick={() => navigate(ROUTES.SIGN_UP)}
            >
              Sign up
            </Button>
          </p>
        ) : (
          <p className="text-muted-foreground">
            Already have an account?{' '}
            <Button 
              variant="link" 
              className="p-0 h-auto" 
              type="button"
              onClick={() => navigate(ROUTES.SIGN_IN)}
            >
              Sign in
            </Button>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
