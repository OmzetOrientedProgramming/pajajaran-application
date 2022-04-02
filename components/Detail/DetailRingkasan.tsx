import React from 'react';
import 'twin.macro';
import tw, { css } from 'twin.macro';
import StatusMap from './ConstantMap';

interface DetailRingkasanProps {
  title: string;
  status: number;
  customer: string;
  capacity: number;
  date: string;
  start_time: string;
  end_time: string;
  total_price: number;
  total_price_booking: number;
  total_price_item: number;
}

const formatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

const DetailRingkasan: React.FC<DetailRingkasanProps> = (props) => {
  const summaryFields = [
    { title: 'Status', value: StatusMap.get(props.status) },
    { title: 'Customer', value: props.customer },
    { title: 'Jumlah Tiket', value: `${props.capacity} Tiket` },
    {
      title: 'Waktu Booking',
      value: `${props.date}\n${props.start_time}-${props.end_time}`, // DD MMMM YYYY
    },
  ];
  const totalFields = [
    {
      title: 'Sub Total Harga Tiket',
      value: formatter.format(props.total_price_booking),
    },
    {
      title: 'Sub Total Harga Pesanan',
      value: formatter.format(props.total_price_item),
    },
    {
      title: 'Harga Total',
      value: formatter.format(props.total_price),
    },
  ];
  return (
    <div
      css={[
        css`
          border-width: 3px;
          max-width: 400px;
        `,
        tw`text-xl color[#003366] pt-4 pb-3 rounded-xl flex flex-col justify-center`,
      ]}
    >
      <div
        css={[
          css`
            border-bottom: solid;
            border-color: #003366;
            border-bottom-width: 3px;
          `,
          tw`flex justify-center items-center mx-5 pb-4`,
        ]}
      >
        <h2 tw="text-2xl font-bold">{props.title}</h2>
      </div>
      <div tw="pt-5 px-5">
        {summaryFields.map((field: any, key: any) => (
          <div
            key={key}
            css={[tw`flex flex-row justify-between items-center pb-2`]}
          >
            <p tw="flex-1">{field.title}</p>
            <p tw="flex-1 text-right whitespace-pre">{field.value}</p>
          </div>
        ))}
        <div
          css={[
            css`
              border-color: #003366;
            `,
            tw`border-b mx-20 mt-8 mb-10`,
          ]}
        />
        {totalFields.map((field: any, key: any) => (
          <div
            key={key}
            css={[
              tw`flex flex-row justify-between items-center pb-3`,
              field.title === 'Harga Total' && tw`font-bold`,
            ]}
          >
            <p tw="flex-1">{field.title}</p>
            <p tw="flex-1 text-right">{field.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailRingkasan;
