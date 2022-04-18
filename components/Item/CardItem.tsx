import React from 'react';
import { styled } from 'twin.macro';
import Button from '../Utils/Button';

interface CardItemProps {
  id: string;
  name: string;
  image: string;
  price: number;
  description: string;
}

const formatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
});

const CardItem: React.FC<CardItemProps> = (props) => {
  return (
    <StyledCardBookingContainer tw="flex flex-col text-center items-center justify-center shadow-md">
      <div tw="mx-6 my-4">
        <div tw="my-1">
          <img src={props.image} alt={props.name} />
        </div>
        <h2 tw="text-xl font-bold">{props.name}</h2>
        <p tw="text-xs font-light mb-2">{props.description}</p>
        <h3 tw="text-base mb-3">{formatter.format(props.price)}</h3>
        <div tw="flex flex-row justify-between items-center w-full gap-x-8">
          <Button buttonType="primary" onClick={() => {}}>
            Ubah
          </Button>
          <Button buttonType="secondary" onClick={() => {}}>
            Hapus
          </Button>
        </div>
      </div>
    </StyledCardBookingContainer>
  );
};

export default CardItem;

const StyledCardBookingContainer = styled.div`
  border-radius: 10px;
  overflow: hidden;
  align-items: center;
`;
