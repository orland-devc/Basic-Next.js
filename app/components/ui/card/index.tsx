// components/ui/card/index.tsx
import React, { ReactNode, HTMLAttributes } from 'react';

// Define the props for the components
interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}

// Update the components with type definitions
export const Card = ({ children, className = '', ...props }: CardProps) => (
  <div className={`bg-white shadow rounded-md ${className}`} {...props}>
    {children}
  </div>
);

export const CardContent = ({ children, className = '', ...props }: CardProps) => (
  <div className={`p-6 ${className}`} {...props}>
    {children}
  </div>
);

export const CardHeader = ({ children, className = '', ...props }: CardProps) => (
  <div className={`border-b border-gray-200 px-6 py-3 ${className}`} {...props}>
    {children}
  </div>
);

export const CardTitle = ({ children, className = '', ...props }: CardTitleProps) => (
  <h3 className={`text-lg font-medium text-gray-900 ${className}`} {...props}>
    {children}
  </h3>
);
