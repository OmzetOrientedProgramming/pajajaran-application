import { Dialog } from '@headlessui/react';
import React from 'react';
import tw, { css } from 'twin.macro';

interface DeleteItemModalInterface {
  isOpen: boolean;
  setIsOpen: any;
  handleConfirm: any;
}

const DeleteItemModal: React.FC<DeleteItemModalInterface> = ({
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

        <div tw="w-[500px] py-7 px-12 relative flex flex-col justify-center items-center text-center rounded-xl bg-white color[#003366]">
          <Dialog.Title tw="text-4xl font-bold mb-6">
            Apakah anda yakin?
          </Dialog.Title>
          <div tw="flex flex-row items-center justify-center gap-x-12">
            <button
              data-testid="hapus-confirm"
              onClick={handleConfirm}
              css={[
                css`
                  font-size: 18px;
                  box-shadow: 0px 3px 0px 0px #888888;
                  border-color: #fe3131;
                  border-radius: 10px;
                `,
                tw`py-2 px-6 font-bold w-full border-2 background[#FE3131] color[#FFFFFF] duration-150 hover:(brightness-110)`,
              ]}
            >
              Hapus
            </button>
            <button
              onClick={() => setIsOpen(false)}
              css={[
                css`
                  font-size: 18px;
                  box-shadow: 0px 3px 0px 0px #888888;
                  border-color: #003366;
                  border-radius: 10px;
                `,
                tw`py-2 px-6 font-bold w-full border-2 background[#FFFFFF] color[#003366] duration-150 hover:(background[#003366] color[#FFFFFF])`,
              ]}
            >
              Batal
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default DeleteItemModal;
