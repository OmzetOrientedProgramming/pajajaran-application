import React from 'react';
import 'twin.macro';

// TODO
export const Layout: React.FC = ({ children }) => {
  return (
    <div tw="flex flex-col items-center">
      <div tw="h-16 w-full border flex flex-row items-center justify-center">
        Navbar
      </div>
      <div tw="max-w-[1366px] mx-28 mt-4 mb-8">{children}</div>
    </div>
  );
};
