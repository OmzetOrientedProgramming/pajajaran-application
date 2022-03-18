import React from 'react';
import 'twin.macro';
import Head from 'next/head';
import { Layout } from '../../components/Utils/Layout';
import DetailTable from '../../components/Detail/DetailTable';
import { dummyGetDetailBookingResponse as dataMock } from '../../__mocks__/apis/detailMocks';
import DetailRingkasan from '../../components/Detail/DetailRingkasan';
import { css } from 'twin.macro';

const Detail: React.FC = () => {
  return (
    <Layout>
      <Head>
        <title>Detail Booking</title>
      </Head>
      <div
        css={css`
          width: 100vw;
        `}
      >
        <div tw="flex flex-row justify-around items-center mb-7">
          <h1 tw="font-bold text-4xl color[#003366]">Detail Booking</h1>
          <div tw="flex flex-col justify-center text-right">
            <h3 tw="font-bold text-xl color[#003366]">
              Id Booking {dataMock.id}
            </h3>
            <p tw="color[#829CB6]">Dibuat pada {dataMock.date}</p>
          </div>
        </div>
        <div tw="flex flex-row justify-around items-center">
          <div tw="flex flex-col justify-center items-center">
            <div tw="">
              <DetailTable title="Informasi Booking">
                <div>Booking</div>
              </DetailTable>
            </div>
            <div tw="">
              <DetailTable title="Pesanan Tambahan">
                <div>Item</div>
              </DetailTable>
            </div>
          </div>
          <div tw="" id="ringkasan">
            <DetailRingkasan title="Ringkasan">
              <div>Status</div>
            </DetailRingkasan>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Detail;
