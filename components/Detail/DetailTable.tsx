import React from 'react';
import 'twin.macro';
import tw, { css } from 'twin.macro';
import StatusMap from './ConstantMap';
import moment from 'moment';

interface TitleProps {
  children: string;
}

interface InfoContentProps {
  customer: string;
  date: Date;
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
    { title: 'Nama Customer', value: props.customer },
    { title: 'Jumlah Tiket', value: `${props.capacity} Tiket` },
    {
      title: 'Tanggal Booking',
      value: moment(props.date).format('dddd, D MMMM YYYY'),
    },
    {
      title: 'Jam Booking',
      value: `${moment(props.start_time).format('HH:mm')} - ${moment(
        props.end_time
      ).format('HH:mm')}`,
    },
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
            <p
              css={[
                field.title === 'Status Booking' &&
                  field.value === 'Menunggu Pembayaran' &&
                  tw`color[#FD7702]`,
                field.title === 'Status Booking' &&
                  (field.value === 'Berhasil' || field.value === 'Selesai') &&
                  tw`color[#03BD36]`,
                field.title === 'Status Booking' &&
                  field.value === 'Gagal' &&
                  tw`color[#FE3131]`,
              ]}
            >
              {field.value}
            </p>
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
  // maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

const ItemContent: React.FunctionComponent<ItemContentProps> = (props) => {
  return (
    <div css={[tw`pt-4 mb-5 border border-black rounded-b-lg color[#003366]`]}>
      <div
        css={[
          css`
            border-bottom-width: 3px;
          `,
          tw`text-xl mx-10 grid grid-cols-6 items-center pb-4 mb-3 text-center`,
        ]}
      >
        <p tw=""></p>
        <p tw="col-span-2">Nama Item</p>
        <p tw="col-span-2">Harga Satuan</p>
        <p tw="">Jumlah Item</p>
      </div>
      <div
        css={[
          css`
            max-height: 280px;
          `,
          tw`overflow-y-scroll overflow-x-hidden`,
        ]}
      >
        {props.items?.length === 0 ? (
          <div tw="flex items-center justify-center">
            <p tw="mx-8 mb-8 mt-4 color[#829CB6]">Tidak ada pesanan item</p>
          </div>
        ) : (
          props.items?.map((item: any, key: any) => (
            <div
              key={key}
              css={[
                tw`grid grid-cols-6 border-b mx-16 pb-5 mb-5`,
                item.title === 'Status Booking' && tw`font-bold border-none`,
              ]}
            >
              <div tw="mx-auto w-[60px] h-auto mr-5">
                <img src={item.image} alt={item.name} tw="" />
              </div>
              <p tw="text-left text-xl col-span-2">{item.name}</p>
              <p tw="text-center text-xl col-span-2">
                {formatter.format(item.price)}
              </p>
              <p tw="text-center text-xl">{`x${item.qty}`}</p>
            </div>
          ))
        )}
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
  return (
    <div
      css={[
        css`
          max-width: 800px;
          min-width: 600px;
          width: 53vw;

          @media only screen and (min-width: 1600px) {
            width: 800px;
          }
        `,
      ]}
      {...props}
    />
  );
};

DetailTable.Title = Title;
DetailTable.InfoContent = InfoContent;
DetailTable.ItemContent = ItemContent;

export default DetailTable;
