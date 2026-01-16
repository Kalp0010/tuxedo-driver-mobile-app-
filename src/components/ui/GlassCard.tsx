import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'strong' | 'subtle';
  onClick?: () => void;
}

export function GlassCard({ children, className = '', variant = 'default', onClick }: GlassCardProps) {
  const variantClasses = {
    default: 'glass-card',
    strong: 'glass-strong',
    subtle: 'glass-subtle'
  };
  
  const baseClass = variantClasses[variant];
  
  return (
    <div 
      className={`${baseClass} p-6 ${onClick ? 'cursor-pointer hover-lift active:scale-[0.98] transition-all duration-300' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
