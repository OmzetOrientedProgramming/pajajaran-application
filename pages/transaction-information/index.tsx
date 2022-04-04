import 'twin.macro';
import Head from 'next/head';
import { Layout } from '../../components/Utils/Layout';

import tw, { css } from 'twin.macro';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import 'moment/locale/id';
import { BalanceCard } from '../../components/TransactionInformation/BalanceCard';
import { useGetBalanceInformation } from '../../apis/hooks/balanceInformationHooks';

const InformasiTransaksi: React.FC = () => {
  const router = useRouter();
  if (!router.isReady) return <></>;

  const { data : balanceData, status : balanceStatus, error: balanceError } = useGetBalanceInformation(
    {
      onSuccess: (res: any) => {},
      onError: (err: any) => {
        toast.error(err.response.data.message, { position: 'top-right' });
      }
    }
  );  

  return (
    <Layout>
      <Head>
          <title>Informasi Transaksi</title>
      </Head>

      <div
        css={[
          css`width: 100vw;`,
          tw`max-w-screen-xl`,
        ]}
        >
          <p css={[tw`w-full text-[40px] leading-normal font-bold`, css`text-align: center;`]}>
          Informasi Transaksi
          </p>
          {balanceStatus === 'success' &&
            <div css={[tw`flex justify-center`]}>
              <BalanceCard 
              balanceAmount={balanceData?.data.data.balance} 
              lastDisbursementDate={new Date(balanceData?.data.data.latest_disbursement_date)} />
            </div>
          }
        </div>
    </Layout>
  );
};

export default InformasiTransaksi;
