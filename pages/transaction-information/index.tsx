import 'twin.macro';
import Head from 'next/head';
import { Layout } from '../../components/Utils/Layout';

import tw, { css } from 'twin.macro';
import Router, { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import 'moment/locale/id';
import { BalanceCard } from '../../components/TransactionInformation/BalanceCard';
import { useGetBalanceInformation } from '../../apis/hooks/balanceInformationHooks';
import withAuth from '../../components/Utils/HOC/WithAuth';
import Button from '../../components/Utils/Button';
import { getTransactionHistory } from '../../apis/services/transactionHistoryService';
import { useState } from 'react';
import CardTransaction from '../../components/TransactionHistory/CardTransaction';
import Link from 'next/link';
import DisbursementModal from '../../components/TransactionInformation/DisbursementModal';
import { useDisbursement } from '../../apis/hooks/disbursementHooks';
import moment from 'moment';

interface ITransaction {
  id: number;
  image: string;
  name: string;
  price: number;
  date: string;
}

const InformasiTransaksi: React.FC = () => {
  const router = useRouter();
  if (!router.isReady) return <></>;
  const [transaction, setTransaction] = useState<Array<ITransaction>>([]);
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: disburse, isLoading } = useDisbursement();
  const [balance, setBalance] = useState(0);
  const [date, setDate] = useState(new Date());

  function difference(date1: Date, date2: Date) {
    const date1utc = Date.UTC(
      date1.getFullYear(),
      date1.getMonth(),
      date1.getDate()
    );
    const date2utc = Date.UTC(
      date2.getFullYear(),
      date2.getMonth(),
      date2.getDate()
    );
    var day = 1000 * 60 * 60 * 24;
    return (date2utc - date1utc) / day;
  }

  function inspectWithdrawalAbility(date: Date, amount: number) {
    var dateNow = new Date(Date.now());
    var availableDate = new Date(moment(date).add(1, 'M').format());

    if (amount === 0) {
      return false;
    } else if (difference(availableDate, dateNow) < 30) {
      return false;
    } else {
      return true;
    }
  }

  function getButtonType(withdrawalAbility: boolean) {
    if (withdrawalAbility) {
      return 'primary';
    } else return 'primaryDisabled';
  }

  const handleDisbursementOnClick = () => {
    var dateNow = new Date(Date.now());
    var availableDate = new Date(moment(date).add(1, 'M').format());
    var state = inspectWithdrawalAbility(date, balance);

    if (state) {
      setIsOpen(true);
    } else {
      if (difference(availableDate, dateNow) < 30) {
        toast.error(
          'Saldo Baru Bisa Dicairkan Setelah 1 Bulan Terhitung Dari Pencairan Terakhir'
        );
      } else {
        toast.error('Saldo Baru Bisa Dicairkan Jika Saldo Lebih Dari Rp0');
      }
    }
  };

  const handleDisbursementButton = async () => {
    setIsOpen(false);
    disburse(
      {
        amount: balance,
      },
      {
        onSuccess: (res: any) => {
          const resData = res?.data;
          if (res.status >= 200 && res.status < 300) {
            refetch();
            toast(
              'Silahkan tunggu beberapa saat, kemudian refresh halaman ini'
            );

            toast.success('Dana Berhasil Dicairkan!');
          } else {
            toast.error(resData.message);
          }
        },
        onError: (err: any) => {
          if (!err.response.data.message) {
            toast.error('Terjadi kesalahan');
          } else {
            console.log('res:', err.response);
            toast.error(err.response.data.errors[0]);
          }
        },
      }
    );
  };

  const {
    data: balanceData,
    status: balanceStatus,
    refetch,
  } = useGetBalanceInformation({
    onSuccess: (res: any) => {
      setBalance(parseInt(res.data.data.balance + ''));
      setDate(res.data.data.latest_disbursement_date);
      const response = getTransactionHistory({
        limit: 6,
        page: 1,
      });

      const result = response.then((res) => {
        return res;
      });

      const getData = () => {
        result.then((data: any) => {
          setTransaction(data.data.data.transactions);
        });
      };
      getData();
    },
    onError: (err: any) => {
      toast.error(err.response.data.message, { position: 'top-right' });
    },
  });

  return (
    <Layout>
      <Head>
        <title>Informasi Transaksi</title>
      </Head>

      <DisbursementModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleConfirm={handleDisbursementButton}
      />

      <div
        css={[
          css`
            width: 100vw;
          `,
          tw`max-w-screen-xl`,
        ]}
      >
        <p
          css={[
            tw`w-full text-[40px] leading-normal font-bold`,
            css`
              text-align: center;
            `,
          ]}
        >
          Informasi Transaksi
        </p>
        {balanceStatus === 'loading' && (
          <div tw="text-center text-xl py-20">loading . . .</div>
        )}
        {balanceStatus === 'success' && (
          <>
            {isLoading ? (
              <div tw="text-center">loading. . .</div>
            ) : (
              <>
                <div css={[tw`flex justify-center`]}>
                  <BalanceCard
                    balanceAmount={balanceData?.data.data.balance}
                    lastDisbursementDate={
                      new Date(balanceData?.data.data.latest_disbursement_date)
                    }
                    butonType={getButtonType(
                      inspectWithdrawalAbility(date, balance)
                    )}
                    onClick={() => handleDisbursementOnClick()}
                  />
                </div>
                <div tw="max-w-screen-xl justify-center">
                  <div
                    css={[
                      css`
                        width: 75vw;
                        margin-top: 2vw;
                      `,
                      tw`w-full flex flex-row`,
                    ]}
                  >
                    <div tw=" w-5/6">
                      <p
                        css={[
                          tw`w-full text-[32px] leading-normal font-bold grid place-items-start pl-10`,
                          css`
                            text-align: center;
                          `,
                        ]}
                      >
                        Riwayat Transaksi
                      </p>
                    </div>
                    <div tw="w-1/6 pr-10">
                      <Link href={`/transaction-history`}>
                        <Button>Lihat Semua</Button>
                      </Link>
                    </div>
                  </div>
                  <div tw="grid grid-cols-2 gap-4 justify-center w-full">
                    {transaction.map((detail: any) => (
                      <div key={detail.id}>
                        <CardTransaction
                          transactionID={detail.id}
                          image={detail.image}
                          name={detail.name}
                          date={detail.date}
                          price={detail.price}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default withAuth(InformasiTransaksi);
