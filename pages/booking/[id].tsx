import React from 'react';
import 'twin.macro';
import Head from 'next/head';
import { Layout } from '../../components/Utils/Layout';
import { dummyGetDetailBookingResponse as dataMock } from '../../__mocks__/apis/detailMocks';
import DetailRingkasan from '../../components/Detail/DetailRingkasan';
import tw, { css } from 'twin.macro';
import DetailTable from '../../components/Detail/DetailTable';

const Detail: React.FC = () => {
  return (
    <Layout>
      <Head>
        <title>Detail Booking</title>
      </Head>
      <div
        css={[
          css`
            width: 100vw;
          `,
          tw`max-w-screen-xl`,
        ]}
      >
        <div tw="flex flex-row justify-between items-center mb-7">
          <h1 tw="font-bold text-4xl color[#003366]">Detail Booking</h1>
          <div tw="flex flex-col justify-center text-right">
            <h3 tw="font-bold text-xl color[#003366]">
              Id Booking #{dataMock.data.id}
            </h3>
            <p tw="color[#829CB6]">Dibuat pada {dataMock.data.created_at}</p>
          </div>
        </div>
        <div tw="flex flex-row justify-between items-stretch gap-x-12">
          <div id="info" tw="flex flex-col justify-center items-center">
            <div tw="mb-5">
              <DetailTable>
                <DetailTable.Title>Informasi Booking</DetailTable.Title>
                <DetailTable.InfoContent
                  id={dataMock.data.id}
                  date={dataMock.data.date}
                  start_time={dataMock.data.start_time}
                  end_time={dataMock.data.end_time}
                  capacity={dataMock.data.capacity}
                  status={dataMock.data.status}
                />
              </DetailTable>
            </div>
            <div tw="">
              <DetailTable>
                <DetailTable.Title>Pesanan Tambahan</DetailTable.Title>
                <DetailTable.ItemContent items={dataMock.data.items} />
              </DetailTable>
            </div>
          </div>
          <div tw="flex flex-col justify-between">
            <DetailRingkasan
              title="Ringkasan"
              status={dataMock.data.status}
              customer={'Budi'}
              capacity={dataMock.data.capacity}
              date={dataMock.data.date}
              start_time={dataMock.data.start_time}
              end_time={dataMock.data.end_time}
              total_price={dataMock.data.total_price}
              total_price_booking={dataMock.data.total_price_ticket}
              total_price_item={dataMock.data.total_price_item}
            />
            <div></div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Detail;
