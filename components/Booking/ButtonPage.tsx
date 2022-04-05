import React, { useState } from 'react';
import 'twin.macro';
import tw, { css } from 'twin.macro';

interface ButtonPageProps {
  onClick: any;
  pages: any;
  maxLimitPage: any;
  minLimitPage: any;
}

const ButtonPage: React.FC<ButtonPageProps> = (props) => {
  let [num, setNum] = useState(1);

  function Back() {
    num > 1 && setNum(--num);
  }

  function renderPageNumbers(number: any) {
    if (number < props.maxLimitPage + 1 && number > props.minLimitPage) {
      return (
        <button
          key={number}
          id={number.toString()}
          css={[
            css`
              box-shadow: 0px 3px 0px 0px #888888;
              border: 2px solid #003366;
              font-size: 16px;
              border-radius: 8px;
              background: #ffffff;
              color: #003366;
            `,
            tw`h-12 border-2 border-r-0 w-12 px-4 py-2`,
          ]}
          onClick={props.onClick}
        >
          {number}
        </button>
      );
    } else {
      return null;
    }
  }

  return (
    <div tw="flex rounded-lg bg-white ">
      {props.pages.map((number: any) => renderPageNumbers(number))}
    </div>
  );
};

export default ButtonPage;
