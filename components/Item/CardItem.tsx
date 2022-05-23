import React from 'react';
import tw, { css, styled } from 'twin.macro';
import Button from '../Utils/Button';

interface CardItemProps {
  id: string;
  name: string;
  image: string;
  price: number;
  description: string;
  setIsOpen: any;
  setItemId: any;
  setIsOpenUpdate: any;
  setItem: any;
  setIsUpdate: any;
}

const formatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
});

const CardItem: React.FC<CardItemProps> = (props) => {
  return (
    <StyledCardBookingContainer tw="flex flex-col text-center items-center justify-center shadow-md">
      <div tw="mx-6 my-4">
        <div tw="my-1 w-[200px] max-w-[220px] flex justify-center">
          <img
            src={props.image}
            alt={props.name}
            css={[
              css`
                max-width: 100%;
                max-height: 100%;
                width: 140px;
                height: 140px;
              `,
              tw`object-cover`,
            ]}
          />
        </div>
        <h2 tw="text-xl font-bold">{props.name}</h2>
        <p tw="text-xs font-light mb-2">{props.description}</p>
        <h3 tw="text-base mb-3">{formatter.format(props.price)}</h3>
        <div tw="flex flex-row justify-center items-center w-full gap-x-6">
          <Button
            buttonType="primary"
            onClick={() => {
              props.setItemId(props.id);
              props.setIsOpenUpdate(true);
              props.setItem({
                name: props.name,
                image: null,
                description: props.description,
                price: props.price,
              });
              props.setIsUpdate(true);
            }}
          >
            Ubah
          </Button>
          <Button
            buttonType="secondary"
            onClick={() => {
              props.setItemId(props.id);
              props.setIsOpen(true);
            }}
          >
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
