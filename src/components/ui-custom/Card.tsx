
import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'glass' | 'elevated';
  hover?: boolean;
  className?: string;
}

const Card = ({ 
  children, 
  variant = 'default', 
  hover = false,
  className,
  ...props 
}: CardProps) => {
  return (
    <div
      className={cn(
        'rounded-xl overflow-hidden',
        variant === 'default' && 'bg-card border shadow-sm',
        variant === 'glass' && 'glass shadow-glass',
        variant === 'elevated' && 'bg-card border shadow-elevated',
        hover && variant === 'default' && 'transition-all duration-300 hover:shadow-md hover:-translate-y-1',
        hover && variant === 'glass' && 'transition-all duration-300 hover:shadow-glass-hover hover:-translate-y-1',
        hover && variant === 'elevated' && 'transition-all duration-300 hover:shadow-elevated-hover hover:-translate-y-1',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("p-6 flex flex-col space-y-1.5", className)}
    {...props}
  />
);

export const CardTitle = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
);

export const CardDescription = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
);

export const CardContent = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("p-6 pt-0", className)} {...props} />
);

export const CardFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
);

export default Card;
