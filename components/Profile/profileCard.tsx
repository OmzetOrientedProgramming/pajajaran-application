import React, { useState } from 'react';
import 'twin.macro';
import StarRating from '../Utils/StarRating';
import moment from 'moment';
import 'moment/locale/id';
import Button from '../Utils/Button';
import Link from 'next/link';
import EditProfileModal from './EditProfilModal';
import toast from 'react-hot-toast';
import { useUpdateProfile } from '../../apis/hooks/updateProfileHooks';
moment.locale('id');

interface ProfileCardProps {
  name: string;
  image: string;
  address: string;
  description: string;
  average_rating: number;
}

const ProfileCard: React.FC<ProfileCardProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const {mutate: updateProfile} = useUpdateProfile()

  const handleConfirm = (newBusinessName: string, newBusinessDescription: string) => {
    if (newBusinessName.length < 3) {
        toast.error("Panjang Nama Bisnis harus diatas 3", {duration:1500})
      return
    };

    if (newBusinessDescription.length < 10) {
      toast.error("Panjang Deskripsi Bisnis harus diatas 10", {duration:1500})
    return
    };

    if (newBusinessDescription === props.description && newBusinessName === props.name) {
      toast.error("Tidak ada perubahan")
      return
    }

    toast.loading("Updating...")
    updateProfile({name: newBusinessName, description: newBusinessDescription}, 
      {
        onSuccess: (res: any) => {
          setIsOpen(false);
          toast.success(
            "Update berhasil"
          );
          window.location.reload();
          // queryClient.invalidateQueries('get_detail_booking');
        },
        onError: (err: any) => {
          // console.log('err', err);
          toast.error(err.response.data.message, {
            position: 'top-right',
          });
        },
      })



  }


  return (
    <>
    <div tw="flex flex-row items-center justify-center">
      <div tw="w-1/3">
        <img src={props.image} alt={props.name} />
      </div>
      <div tw="w-2/3 flex flex-col m-5">
        <div tw="flex flex-row">
          <div tw="text-2xl capitalize font-bold pr-2">{props.name}</div>
            <a tw="block cursor-pointer" onClick={() => setIsOpen(true)}>
              <img tw="h-6 w-auto" src="/images/pencil.png" alt="Edit" />
            </a>
        </div>

        <div tw="text-xs font-light">{props.address}</div>
        <div tw="py-2">
          <StarRating
            rating={props.average_rating}
            type={'golden'}
            size={'28'}
          />
        </div>
        <div tw="text-base pb-2">{props.description}</div>
        <div tw="w-1/2">
          <Link href="/profil/item">
            <Button buttonType="secondary" onClick={() => {}}>
              Lihat Daftar Barang
            </Button>
          </Link>
        </div>
      </div>
    </div>
    <EditProfileModal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      handleConfirm={handleConfirm}
      defaultName={props.name}
      defaultDescription={props.description}
    />
    </>
  );
};

export default ProfileCard;
