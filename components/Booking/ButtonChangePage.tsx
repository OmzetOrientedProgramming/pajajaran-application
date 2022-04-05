import React from 'react';
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
          border: 2px solid #003366;
          font-size: 16px;
          border-radius: 8px;
          color: #ffffff;
        `,
        tw`background[#FFFFFF] color[#003366] duration-150 hover:(background[#003366] color[#FFFFFF]) h-12 border-2 font-bold rounded-l-lg px-4 py-2 duration-100 hover:(brightness-110)`,
      ]}
      onClick={props.onClick}
    >
      {props.state}
    </button>
  );
};

export default ButtonChangePage;
