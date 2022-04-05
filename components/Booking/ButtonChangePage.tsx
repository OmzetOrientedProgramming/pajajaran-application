import React, { useState } from 'react';
import 'twin.macro';
import tw, { css } from 'twin.macro';

interface ButtonChangePageProps {
  state: any;
  onClick: any;
  page: any;
}

const ButtonChangePage: React.FC<ButtonChangePageProps> = (props) => {
  return (
    <button
      css={[
        css`
          box-shadow: 0px 3px 0px 0px #888888;
          border: 2px solid #003366;
          font-size: 16px;
          border-radius: 8px;
          background: #003366;
          color: #ffffff;
        `,
        tw`h-12 border-2 rounded-l-lg px-4 py-2`,
      ]}
      onClick={props.onClick}
    >
      {props.state}
    </button>
  );
};

export default ButtonChangePage;
