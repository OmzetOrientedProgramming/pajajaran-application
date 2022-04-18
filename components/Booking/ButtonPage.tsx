import React from 'react';
import 'twin.macro';
import tw, { css } from 'twin.macro';

interface ButtonPageProps {
  onClick: any;
  pages: any;
  maxLimitPage: any;
  minLimitPage: any;
}

const ButtonPage: React.FC<ButtonPageProps> = (props) => {
  function renderPageNumbers(number: any) {
    if (number < props.maxLimitPage + 1 && number > props.minLimitPage) {
      return (
        <button
          key={number}
          id={number.toString()}
          css={[
            css`
              font-size: 16px;
              border-radius: 8px;
              background: #ffffff;
              color: #003366;

              :hover {
                border: 2px solid #003366;
              }
            `,
            tw`h-10 w-10 my-2 duration-100`,
          ]}
          onClick={props.onClick}
        >
          {number}
        </button>
      );
    }
  }

  return (
    <div tw="flex rounded-lg bg-white ">
      {props.pages.map((number: any) => renderPageNumbers(number))}
    </div>
  );
};

export default ButtonPage;
