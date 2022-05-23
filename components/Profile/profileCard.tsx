import React from 'react';
import 'twin.macro';
import StarRating from '../Utils/StarRating';
import moment from 'moment';
import 'moment/locale/id';
import Button from '../Utils/Button';
import Link from 'next/link';
moment.locale('id');

interface ProfileCardProps {
  name: string;
  image: string;
  address: string;
  description: string;
  average_rating: number;
}

const ProfileCard: React.FC<ProfileCardProps> = (props) => {
  return (
    <div tw="flex flex-row items-center justify-center">
      <div tw="w-1/3">
        <img src={props.image} alt={props.name} />
      </div>
      <div tw="w-2/3 flex flex-col m-5">
        <div tw="flex flex-row">
          <div tw="text-2xl capitalize font-bold pr-2">{props.name}</div>
          <Link href="/profil/produk">
            <a tw="block cursor-pointer">
              <img tw="h-6 w-auto" src="/images/pencil.png" alt="Edit" />
            </a>
          </Link>
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
  );
};

export default ProfileCard;
