import { Dialog } from '@headlessui/react';
import React from 'react';
import 'twin.macro';
import tw, { css } from 'twin.macro';

interface DisbursementModalInterface {
  isOpen: boolean;
  setIsOpen: any;
  handleConfirm: any;
}

const DisbursementModal: React.FC<DisbursementModalInterface> = ({
  isOpen,
  setIsOpen,
  handleConfirm,
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      tw="fixed z-10 inset-0 overflow-y-auto"
    >
      <div tw="flex min-h-screen items-center justify-center">
        <Dialog.Overlay tw="fixed inset-0 bg-black opacity-50" />

        <div tw="w-[500px] py-12 px-12 relative flex flex-col justify-center items-center text-center rounded-xl bg-white color[#003366]">
          <div>
            <h1 tw="text-4xl font-bold mt-7 mb-8">Cairkan Saldo Sekarang?</h1>
            <div tw="flex flex-row items-center justify-center w-full gap-x-7">
              <button
                onClick={() => handleConfirm(handleConfirm)}
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
        </div>
      </div>
    </Dialog>
  );
};

export default DisbursementModal;
