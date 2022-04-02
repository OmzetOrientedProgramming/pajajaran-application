import { Dialog } from '@headlessui/react';
import React from 'react';
import tw, { css } from 'twin.macro';
import { ConfirmModalContentInterface } from './types';

const Terima: React.FC<ConfirmModalContentInterface> = ({
  setIsOpen,
  handleConfirm,
}) => {
  return (
    <div>
      <Dialog.Title tw="text-xl text-center">
        Apakah anda yakin untuk konfirmasi:
      </Dialog.Title>
      <h1 tw="text-4xl font-bold mt-7 mb-8">Terima?</h1>
      <div tw="flex flex-row items-center justify-center w-full gap-x-7">
        <button
          onClick={() => handleConfirm(true)}
          css={[
            css`
              box-shadow: 0px 3px 0px 0px #888888;
              border-color: #03bd36;
              border-radius: 10px;
              padding-top: 9.5px;
              padding-bottom: 9.5px;
            `,
            tw`font-bold text-2xl w-full border-2 background[#03BD36] color[#FFFFFF] duration-150 hover:(brightness-110)`,
          ]}
        >
          Ya
        </button>
        <button
          onClick={() => setIsOpen(false)}
          css={[
            css`
              box-shadow: 0px 3px 0px 0px #888888;
              border-color: #003366;
              border-radius: 10px;
              padding-top: 9.5px;
              padding-bottom: 9.5px;
            `,
            tw`font-bold text-2xl w-full border-2 background[#FFFFFF] color[#003366] duration-150 hover:(background[#003366] color[#FFFFFF])`,
          ]}
        >
          Batal
        </button>
      </div>
    </div>
  );
};

export default Terima;
