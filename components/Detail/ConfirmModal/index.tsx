import { Dialog } from '@headlessui/react';
import React from 'react';
import 'twin.macro';
import Batal from './Batal';
import Terima from './Terima';
import Selesai from './Selesai';

interface ConfirmModalInterface {
  type: string;
  isOpen: boolean;
  setIsOpen: any;
  handleConfirm: any;
}

const ConfirmModal: React.FC<ConfirmModalInterface> = ({
  type,
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
          {type === 'terima' && (
            <Terima setIsOpen={setIsOpen} handleConfirm={handleConfirm} />
          )}
          {type === 'batal' && (
            <Batal setIsOpen={setIsOpen} handleConfirm={handleConfirm} />
          )}
          {type === 'selesai' && (
            <Selesai setIsOpen={setIsOpen} handleConfirm={handleConfirm} />
          )}
        </div>
      </div>
    </Dialog>
  );
};

export default ConfirmModal;
