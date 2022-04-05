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

const CardBooking: React.FC<CardBookingProps> = (props) => {
  return (
    <>
      <StyledCardBookingContainer tw="shadow-md">
        <div tw="flex flex-row w-full items-center justify-center">
          <div tw="w-1/6 mx-3 my-3 font-semibold leading-tight">
            <p tw="text-center text-base">
              {`${moment(props.start_time).utc().format('HH:mm')} - ${moment(
                props.end_time
              )
                .utc()
                .format('HH:mm')}`}
            </p>
          </div>
          <div tw="w-8/12 py-4 px-3 flex flex-col">
            <p
              tw="text-base overflow-hidden leading-normal font-bold"
              css={css`
                text-overflow: ellipsis;
                white-space: nowrap;
              `}
            >
              {props.name}
            </p>

            <div tw="mb-2">
              <p
                tw="text-base font-light text-[#868686] leading-normal"
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
              {`${moment(props.date).format('dddd, D MMMM YYYY')}`}
            </p>
          </div>
          <div tw="w-1/6 mx-10 my-3">
            <Link href={`/booking/${props.bookingID}`}>
              <div>
                <Button>Detail</Button>
              </div>
            </Link>
          </div>
        </div>
      </StyledCardBookingContainer>
    </>
  );
};

export default CardBooking;

const StyledCardBookingContainer = styled.div`
  margin: 0.5rem 6rem;
  border-radius: 1rem;
  overflow: hidden;
  align-items: center;
`;
