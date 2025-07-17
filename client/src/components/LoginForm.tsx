'use client';

import { useState } from 'react';
import { User, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { login } from '@/lib/auth';

interface LoginFormProps {
  onLogin: (user: { id: string; role: 'viewer' | 'reviewer'; name: string }) => void;
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const user = login(email, password);
      if (user) {
        onLogin(user);
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (role: 'viewer' | 'reviewer') => {
    const credentials = role === 'viewer' 
      ? { email: 'viewer@example.com', password: 'viewer123' }
      : { email: 'reviewer@example.com', password: 'reviewer123' };
    
    setEmail(credentials.email);
    setPassword(credentials.password);
    
    setTimeout(() => {
      const user = login(credentials.email, credentials.password);
      if (user) onLogin(user);
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-primary rounded-full flex items-center justify-center mb-4">
            <User className="h-6 w-6 text-primary-foreground" />
          </div>
          <h2 className="text-3xl font-bold text-foreground">Report Dashboard</h2>
          <p className="mt-2 text-muted-foreground">
            Sign in to access synthetic reports
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="email" className="block text-sm font-medium text-foreground">
              Email address
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <Label htmlFor="password" className="block text-sm font-medium text-foreground">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1"
              placeholder="Enter your password"
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Signing in...
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4 mr-2" />
                Sign in
              </>
            )}
          </Button>
        </form>

        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-background text-muted-foreground">Demo Accounts</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={() => handleDemoLogin('viewer')}
              className="flex flex-col items-center p-4 h-auto"
            >
              <Badge variant="secondary" className="mb-2">Viewer</Badge>
              <span className="text-xs text-muted-foreground">Read-only access</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => handleDemoLogin('reviewer')}
              className="flex flex-col items-center p-4 h-auto"
            >
              <Badge variant="default" className="mb-2">Reviewer</Badge>
              <span className="text-xs text-muted-foreground">Full access</span>
            </Button>
          </div>

          <div className="mt-4 text-xs text-muted-foreground text-center">
            <p>Demo credentials:</p>
            <p>Viewer: viewer@example.com / viewer123</p>
            <p>Reviewer: reviewer@example.com / reviewer123</p>
          </div>
        </div>
      </div>
    </div>
  );
}