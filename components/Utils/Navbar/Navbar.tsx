import React from 'react';
import { css } from 'twin.macro';

import Link from 'next/link';

export type NavbarItem = {
  text: string;
  href: string;
};

interface NavbarProps {
  navbarItems: Array<NavbarItem>;
}

const Navbar: React.FC<NavbarProps> = (props) => {
  const { navbarItems } = props;
  return (
    <div
      tw="h-16 w-full fixed top-0 left-0 z-50 background[#FFF]"
      css={css`
        box-shadow: 0px 3px 16px 0px #00000012;
      `}
    >
      <div
        tw="flex justify-center py-5 px-5 max-w-none md:(px-8 mx-auto max-w-3xl) 
      lg:(px-28 max-w-5xl) xl:(px-20 max-w-7xl) 2xl:(px-40 max-w-full)"
      >
        <div tw="w-full flex justify-between items-center">
          <Link href="/">
            <a tw="block cursor-pointer">
              <img tw="h-6 w-auto" src="/images/wave.png" alt="Logo" />
            </a>
          </Link>
          <div tw="flex space-x-10">
            {navbarItems.map((navbarItem, key) => (
              <Link href={navbarItem.href} key={key}>
                <a tw="block cursor-pointer">{navbarItem.text}</a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
