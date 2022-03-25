import React from 'react';
import 'twin.macro';
import Head from 'next/head';
import { Layout } from '../../../components/Utils/Layout';
import { dummyGetDetailBookingResponse as dataMock } from '../../../__mocks__/apis/detailBookingMocks';
import DetailRingkasan from '../../../components/Detail/DetailRingkasan';
import tw, { css } from 'twin.macro';
import DetailTable from '../../../components/Detail/DetailTable';

const DetailBooking: React.FC = () => {
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
        <div tw="flex flex-row flex-wrap justify-center items-stretch gap-x-12">
          <div id="info" tw="flex flex-col justify-center items-center">
            <div tw="mb-5">
              <DetailTable>
                <DetailTable.Title>Informasi Booking</DetailTable.Title>
                <DetailTable.InfoContent
                  customer={'Budi'}
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
          <div tw="flex flex-col justify-start">
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
            <div tw="flex flex-col items-center justify-center">
              <button
                onClick={() => {}}
                css={[
                  css`
                    box-shadow: 0px 3px 0px 0px #888888;
                    border-color: #03bd36;
                    border-radius: 10px;
                    padding-top: 9.5px;
                    padding-bottom: 9.5px;
                  `,
                  tw`font-bold mt-12 mb-5 text-2xl w-full border-2 background[#03BD36] color[#FFFFFF] duration-150 hover:(brightness-110)`,
                ]}
              >
                Terima
              </button>
              <button
                onClick={() => {}}
                css={[
                  css`
                    box-shadow: 0px 3px 0px 0px #888888;
                    border-color: #fe3131;
                    border-radius: 10px;
                    padding-top: 9.5px;
                    padding-bottom: 9.5px;
                  `,
                  tw`font-bold text-2xl w-full border-2 background[#FFFFFF] color[#FE3131] duration-150 hover:(background[#FE3131] color[#FFFFFF])`,
                ]}
              >
                Tolak
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DetailBooking;
