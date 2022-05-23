import React from 'react';
import 'twin.macro';
import StarRating from '../Utils/StarRating';
import moment from 'moment';
import 'moment/locale/id';
moment.locale('id');

interface ReviewCardProps {
  name: string;
  rating: number;
  content: string;
  time: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  name,
  rating,
  content,
  time,
}) => {
  return (
    <div tw="text-left border-2 border-black rounded-md pl-2 py-2">
      <div tw="flex flex-row items-center">
        <div tw="text-base capitalize font-bold">{name}</div>
        <div tw="ml-3">
          <StarRating rating={rating} type={'golden'} size={'14'} />
        </div>
      </div>
      <div tw="text-xs pb-2 font-light">
        {moment(time, 'YYYY-MM-DDTHH:mm:ss').format('DD MMMM YYYY')}
      </div>
      <div tw="text-sm pb-2">{content}</div>
    </div>
  );
};

export default ReviewCard;
