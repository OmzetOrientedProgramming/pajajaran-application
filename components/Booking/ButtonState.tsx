import React from 'react';
import 'twin.macro';
import tw, { css } from 'twin.macro';

interface ButtonStateProps {
  children: any;
  onClick: any;
  background: any;
  color: any;
}

const ButtonState: React.FC<ButtonStateProps> = (props) => {
  return (
    <button
      css={[
        css`
          box-shadow: 0px 3px 0px 0px #888888;
          border: 2px solid #003366;
          font-size: 16px;
          border-radius: 8px;
          background: ${props.background};
          color: ${props.color};
        `,
        tw`w-full font-bold duration-100 hover:(brightness-110)`,
      ]}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default ButtonState;
