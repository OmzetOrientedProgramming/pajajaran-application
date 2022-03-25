import React from 'react';
import tw, { css } from 'twin.macro';

interface ButtonProps {
  children: string;
  buttonType?: 'primary' | 'secondary' | 'customPrimary' | 'customSecondary';
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  color?: string; // required when choosing customPrimary or customSecondary
}

const Button: React.FC<ButtonProps> = ({
  children,
  buttonType = 'primary',
  type = 'button',
  onClick,
  color,
}) => {
  console.log(buttonType);
  return (
    <button
      type={type}
      onClick={onClick}
      css={[
        css`
          box-shadow: 0px 3px 0px 0px #888888;
          border: 2px solid;
          font-size: 18px;
          border-radius: 10px;
        `,
        tw`w-full h-9 font-bold`,
        buttonType === 'primary' && [
          tw`background[#003366] text-white duration-150 hover:(brightness-110)`,
          css`
            border-color: #003366;
          `,
        ],
        buttonType === 'secondary' && [
          tw`background[#FFFFFF] color[#003366] duration-150 hover:(background[#003366] color[#FFFFFF])`,
          css`
            border-color: #003366;
          `,
        ],
        buttonType === 'customPrimary' && [
          css`
            background: ${color};
            color: #ffffff;
            border-color: ${color};
          `,
          tw`duration-150 hover:(brightness-110)`,
        ],
        buttonType === 'customSecondary' &&
          css`
            background: #ffffff;
            color: ${color};
            border-color: ${color};
            transition: 0.15;

            :hover {
              background: ${color};
              color: #ffffff;
            }
          `,
      ]}
    >
      {children}
    </button>
  );
};

export default Button;
