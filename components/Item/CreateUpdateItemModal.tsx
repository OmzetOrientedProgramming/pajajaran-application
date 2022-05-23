import { Dialog } from '@headlessui/react';
import React, { useState } from 'react';
import tw, { css } from 'twin.macro';
import toast from 'react-hot-toast';

interface UpdateItemModalInterface {
  isOpen: boolean;
  setIsOpen: any;
  handleConfirm: any;
  item: any;
  setItem: any;
  isUpdate: boolean;
  isCreating: boolean;
  isUpdating: boolean;
}

const CreateUpdateItemModal: React.FC<UpdateItemModalInterface> = ({
  isOpen,
  setIsOpen,
  handleConfirm,
  item,
  setItem,
  isUpdate,
  isCreating,
  isUpdating,
}) => {
  const toBase64 = (file: File) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const confirm = (item: any) => {
    const err: Array<string> = [];
    if (!item.name) {
      err.push('Nama wajib diisi!');
    }

    if (!item.description) {
      err.push('Deskripsi wajib diisi!');
    }

    if (!item.price) {
      err.push('Harga wajib diisi!');
    }

    if (!item.image) {
      err.push('Image wajib diisi!');
    }

    if (err.length > 0) {
      err.forEach((element) => {
        toast.error(element);
      });
      return;
    }

    if (item.name.length < 5) {
      toast.error('Nama harus lebih besar dari 5 karakter!');
      return;
    }

    if (item.description.split(' ').length < 1) {
      toast.error('Deskripsi harus lebih besar dari 1 karakter!');
      return;
    }

    if (isUpdate) {
      handleConfirm(item, true);
      return;
    }

    handleConfirm(item, false);
  };

  const handleFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const ALLOWED_MIME_TYPE = [
      'image/png',
      'image/jpeg',
      'image/svg+xml',
      'image/gif',
    ];
    if (
      event.target.files === null ||
      (typeof event.target.files === 'object' && event.target.files.length <= 0)
    ) {
      toast.error('No file selected.');
      return;
    }
    const file = event.target.files[0];
    const type = file.type;
    const sizeInMb = file.size / 1024 / 1024;

    // MS: Validation for file size
    if (sizeInMb > 5) {
      toast.error('Profile picture size cannot be greater than 5MB!');
      return;
    }

    // MS: Validation for MIME type validation
    if (!ALLOWED_MIME_TYPE.includes(type)) {
      toast.error('Non-image files not allowed!');
      return;
    }

    let result;

    try {
      result = await toBase64(file);
    } catch (err) {
      console.error(err);
      return;
    }

    setItem({
      ...item,
      image: result as string,
    });
  };
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      tw="fixed z-10 inset-0 overflow-y-auto"
    >
      <div tw="flex min-h-screen items-center justify-center">
        <Dialog.Overlay tw="fixed inset-0 bg-black opacity-50" />

        <div tw="w-full mx-7 py-12 px-12 relative flex flex-col justify-center items-center rounded-xl bg-white color[#003366]">
          <Dialog.Title tw="text-4xl font-bold mb-6 text-left w-full">
            Informasi Produk
          </Dialog.Title>
          <form tw="w-full text-left my-6">
            <div tw="grid gap-x-4 gap-y-9 text-2xl grid-cols-[0.33fr 0.67fr] w-full justify-between text-black">
              <label htmlFor="name">Nama</label>
              <input
                tw="border border-black rounded-lg py-2 px-4 text-base text-black"
                type="text"
                name="name"
                id="name"
                value={item.name}
                onChange={(e) => {
                  setItem({
                    ...item,
                    name: e.target.value,
                  });
                }}
              />
              <label htmlFor="foto">Foto</label>
              <input
                type="file"
                name="foto"
                id="foto"
                onChange={(e) => {
                  handleFile(e);
                }}
              />
              <label htmlFor="deskripsi">Deskripsi</label>
              <input
                tw="border border-black rounded-lg py-2 px-4 text-base text-black"
                type="text"
                name="deskripsi"
                id="deskripsi"
                value={item.description}
                onChange={(e) => {
                  setItem({
                    ...item,
                    description: e.target.value,
                  });
                }}
              />
              <label htmlFor="harga">Harga</label>
              <input
                tw="border border-black rounded-lg py-2 px-4 text-base text-black"
                type="number"
                name="harga"
                id="harga"
                value={item.price}
                onChange={(e) => {
                  setItem({
                    ...item,
                    price: e.target.value,
                  });
                }}
              />
            </div>
          </form>
          <div tw="flex flex-row items-center justify-center gap-x-12">
            {!isCreating && !isUpdating && (
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
            )}
            <button
              data-testid="create-update-confirm"
              onClick={() => {
                confirm(item);
              }}
              disabled={isCreating || isUpdating}
              css={[
                css`
                  font-size: 18px;
                  box-shadow: 0px 3px 0px 0px #888888;
                  border-color: #003366;
                  border-radius: 10px;
                `,
                tw`py-2 px-6 font-bold w-full border-2 duration-150 hover:(brightness-110)`,
                isCreating ||
                  (isUpdating &&
                    tw`background[#FFFFFF] color[#003366] hover:cursor-default`),
                !(isCreating || isUpdating) &&
                  tw`background[#003366] color[#FFFFFF]`,
              ]}
            >
              {isCreating || isUpdating ? 'Loading . . .' : 'Simpan'}
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default CreateUpdateItemModal;
