import React from 'react';
import 'twin.macro';
import tw, { css } from 'twin.macro';
import StatusMap from './StatusMap';

interface TitleProps {
  children: string;
}

interface InfoContentProps {
  id: number;
  date: string;
  start_time: string;
  end_time: string;
  capacity: number;
  status: number;
}

interface ItemContentProps {
  items: any;
}

const Title: React.FunctionComponent<TitleProps> = (props) => (
  <div tw="py-3 rounded-t-lg background[#003366] flex justify-center items-center w-full">
    <h2 tw="font-bold text-2xl color[#FFFFFF]">{props.children}</h2>
  </div>
);

const InfoContent: React.FunctionComponent<InfoContentProps> = (props) => {
  const fields = [
    { title: 'Nama Customer', value: props.id },
    { title: 'Jumlah Tiket', value: `${props.capacity} Tiket` },
    { title: 'Tanggal Booking', value: props.date },
    { title: 'Jam Booking', value: `${props.start_time}-${props.end_time}` },
    { title: 'Status Booking', value: StatusMap.get(props.status) },
  ];

  return (
    <div
      css={[
        css`
          border-color: #003366;
        `,
        tw`text-xl color[#003366] py-4 border rounded-b-lg`,
      ]}
    >
      {fields.map((field: any, key: any) => (
        <div key={key} tw="px-12">
          <div
            css={[
              tw`flex flex-row justify-between items-center border-b-2 px-8 py-3`,
              field.title === 'Status Booking' && tw`font-bold border-none`,
            ]}
          >
            <p>{field.title}</p>
            <p>{field.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const formatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

const ItemContent: React.FunctionComponent<ItemContentProps> = (props) => {
  return (
    <div css={[tw`pt-4 border border-black rounded-b-lg color[#003366]`]}>
      <div
        css={[
          css`
            border-bottom-width: 3px;
          `,
          tw`text-xl mx-10 flex flex-row justify-between items-center pb-4 mb-3`,
        ]}
      >
        <p tw="flex-1"></p>
        <p tw="flex-grow">Nama Item</p>
        <p tw="flex-1">Harga Satuan</p>
        <p tw="flex-1">Jumlah Item</p>
      </div>
      <div
        css={[
          css`
            max-height: 280px;
          `,
          tw`overflow-y-scroll overflow-x-hidden`,
        ]}
      >
        {props.items.map((item: any, key: any) => (
          <div
            key={key}
            css={[
              tw`flex flex-row justify-between items-center border-b mx-16 px-8 pb-5 mb-5`,
              item.title === 'Status Booking' && tw`font-bold border-none`,
            ]}
          >
            <div tw="w-[60px] h-auto flex-1 mr-5">
              <img src={item.image} alt={item.name} tw="" />
            </div>
            <p tw="text-left text-xl flex-grow">{item.name}</p>
            <p tw="text-xl flex-1">{formatter.format(item.price)}</p>
            <p tw="text-xl flex-1">{`x${item.qty}`}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

interface DetailTableSubComponents {
  Title: React.FunctionComponent<TitleProps>;
  InfoContent: React.FunctionComponent<InfoContentProps>;
  ItemContent: React.FunctionComponent<ItemContentProps>;
}

const DetailTable: React.FunctionComponent & DetailTableSubComponents = (
  props
) => {
  return <div tw="w-[800px]" {...props} />;
};

DetailTable.Title = Title;
DetailTable.InfoContent = InfoContent;
DetailTable.ItemContent = ItemContent;

export default DetailTable;
