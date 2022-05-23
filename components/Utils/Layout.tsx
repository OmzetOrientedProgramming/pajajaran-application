import React from 'react';
import 'twin.macro';

import { Navbar } from './Navbar';

// TODO
export const Layout: React.FC = ({ children }) => {
  return (
    <div tw="flex flex-col items-center">
      <Navbar navbarItems={navbarItems} />
      <div tw="max-w-[1366px] mx-44 my-20">{children}</div>
    </div>
  );
};

const navbarItems = [
  {
    text: 'Profil Bisnis',
    href: '/profil',
  },
  {
    text: 'Booking Customer',
    href: '/booking',
  },
  {
    text: 'Informasi Transaksi',
    href: '/transaction-information',
  },
];
