import React from 'react';
import Link from 'next/link';
import 'twin.macro';
import { css, styled } from 'twin.macro';
import moment from 'moment';

moment.locale('id');

interface CardTransactionProps {
  transactionID: string;
  image: string;
  name: string;
  price: number;
  date: string;
}

const CardTransaction: React.FC<CardTransactionProps> = (props) => {
  return (
    <Link href={`/transaction-history/${props.transactionID}`}>
      <StyledCardTransactionContainer tw="shadow-md my-5">
        <div tw="flex flex-row w-full hover:cursor-pointer">
          <div tw="my-3 mx-2 w-1/6 flex justify-center rounded-full items-center">
            <div tw="">
              <img
                src={props.image}
                tw="object-cover max-h-[80px] max-w-full"
              ></img>
            </div>
          </div>
          <div tw="w-3/6 py-4 px-3 my-3 flex-col grid">
            <div tw="grid items-start">
              <p
                tw="text-xl font-normal overflow-hidden leading-normal"
                css={css`
                  text-overflow: ellipsis;
                  white-space: nowrap;
                `}
              >
                {props.name}
              </p>
            </div>
            <div tw="grid items-end">
              <p
                tw="text-base font-light text-[#868686] leading-normal"
                css={css`
                  text-overflow: ellipsis;
                  white-space: nowrap;
                `}
              >
                {`${moment(props.date).utc().format('LL')}`}
              </p>
            </div>
          </div>
          <div tw="w-2/6 py-4 px-3 grid place-items-center">
            <p
              tw="text-xl font-bold leading-tight"
              css={css`
                text-overflow: ellipsis;
                white-space: nowrap;
              `}
            >
              Rp{props.price.toLocaleString('id-ID')}
            </p>
          </div>
        </div>
      </StyledCardTransactionContainer>
    </Link>
  );
};

export default CardTransaction;

const StyledCardTransactionContainer = styled.div`
  //   margin: 0.5rem 6rem;
  //   border-radius: 1rem;
  //   overflow: hidden;
  //   align-items: center;
  margin: 0.75rem 1rem;
  border-radius: 0.6rem;
  overflow: hidden;
  align-items: center;
  height: 110px;
`;
