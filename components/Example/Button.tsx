import React from 'react';
import Link from 'next/link';
import 'twin.macro';

interface ButtonProps {
  children: string;
}

const Button: React.FC<ButtonProps> = ({ children }) => {
  return (
    <Link href="/">
      <button tw="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        {children}
      </button>
    </Link>
  );
};

export default Button;
