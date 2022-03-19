import React from 'react';
import 'twin.macro';
import tw from 'twin.macro';

const statusMap: Map<number, string> = new Map([
  [0, 'Menunggu Konfirmasi'],
  [1, 'Menunggu Pembayaran'],
  [2, 'Diterima'],
  [3, 'Selesai'],
]);

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
    { title: 'Jumlah Pengunjung', value: props.capacity },
    { title: 'Tanggal Booking', value: props.date },
    { title: 'Jam Booking', value: `${props.start_time}-${props.end_time}` },
    { title: 'Status Booking', value: statusMap.get(props.status) },
  ];

  return (
    <div tw="py-4">
      {fields.map((field: any, key: any) => (
        <div key={key} tw="px-12">
          <div
            css={[
              tw`flex flex-row justify-between items-center border-b-2 px-8 py-3`,
              field.title === 'Status Booking' && tw`font-bold border-none`,
            ]}
          >
            <p tw="text-xl color[#003366] ">{field.title}</p>
            <p tw="text-xl color[#003366]">{field.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const ItemContent: React.FunctionComponent<ItemContentProps> = (props) => {
  return (
    <div tw="py-4">
      {props.items.map((item: any, key: any) => (
        <div key={key} tw="px-12">
          <div
            css={[
              tw`flex flex-row justify-between items-center border-b px-8 py-3`,
              item.title === 'Status Booking' && tw`font-bold border-none`,
            ]}
          >
            <img src={item.image} alt={item.name} tw="w-[60px] h-auto" />
            <p tw="text-xl color[#003366]">{item.name}</p>
            <p tw="text-xl color[#003366]">{item.price}</p>
            <p tw="text-xl color[#003366]">{item.qty}</p>
          </div>
        </div>
      ))}
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
  return <div tw="w-[800px] border rounded-b-lg" {...props} />;
};

DetailTable.Title = Title;
DetailTable.InfoContent = InfoContent;
DetailTable.ItemContent = ItemContent;

export default DetailTable;
