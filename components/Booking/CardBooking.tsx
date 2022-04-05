import React from 'react';
import Link from 'next/link';
import 'twin.macro';
import { css, styled } from 'twin.macro';
import Button from '../Utils/Button';
import moment from 'moment';
import 'moment/locale/id';

moment.locale('id');

interface CardBookingProps {
  bookingID: string;
  name: string;
  capacity: number;
  date: string;
  start_time: string;
  end_time: string;
}

function formatDate(date: any) {
  const fDate = new Date(date);
  return fDate.toDateString();
}

const CardBooking: React.FC<CardBookingProps> = (props) => {
  return (
    <Link href={`/business-admin/booking/${props.bookingID}`}>
      <StyledCardBookingContainer tw="shadow-md">
        <div tw="flex flex-row w-full items-center justify-center">
          <div tw="w-1/6 mx-3 my-3 font-bold leading-tight">
            <p tw="text-center">
              {`${moment(props.start_time).format('HH:mm')} - ${moment(
                props.end_time
              ).format('HH:mm')}`}
              -
            </p>
          </div>
          <div tw="w-8/12 py-4 px-3 flex flex-col">
            <p
              tw="text-base font-normal overflow-hidden leading-normal"
              css={css`
                text-overflow: ellipsis;
                white-space: nowrap;
              `}
            >
              {props.name}
            </p>

            <div tw="mb-2">
              <p
                tw="text-xs font-light text-[#868686] leading-normal"
                css={css`
                  text-overflow: ellipsis;
                  white-space: nowrap;
                `}
              >
                Jumlah: {props.capacity} orang
              </p>
            </div>

            <p
              tw="text-base font-normal leading-tight"
              css={css`
                text-overflow: ellipsis;
                white-space: nowrap;
              `}
            >
              {`${moment(props.date).format('dddd, DD MMMM YYYY')}`}
            </p>
          </div>
          <div tw="w-1/6 mx-10 my-3">
            <Button>Detail</Button>
          </div>
        </div>
      </StyledCardBookingContainer>
    </Link>
  );
};

export default CardBooking;

const StyledCardBookingContainer = styled.div`
  margin: 0.5rem 6rem;
  border-radius: 1rem;
  overflow: hidden;
  align-items: center;
`;
