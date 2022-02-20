import React from 'react';
import 'twin.macro';

export const Layout: React.FC = ({ children }) => {
  return (
    <div tw="min-h-screen flex flex-col items-center justify-center">
      <div tw="min-h-screen w-full">{children}</div>
    </div>
  );
};
