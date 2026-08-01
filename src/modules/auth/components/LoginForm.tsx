import React, { useState } from 'react';
import { Card, Input, Button } from '@/components';

export interface LoginFormProps {
  onLogin: (email: string) => void;
  isLoading?: boolean;
  error?: string | null;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin, isLoading, error }) => {
  const [email, setEmail] = useState('architect@pathway.io');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      onLogin(email);
    }
  };

  return (
    <Card title="Authentication Module" subtitle="Encapsulated Auth Domain Component">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Work Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="developer@company.com"
          error={error || undefined}
        />
        <Button type="submit" variant="primary" className="w-full" isLoading={isLoading}>
          Authenticate User
        </Button>
      </form>
    </Card>
  );
};
