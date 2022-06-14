import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import toast from 'react-hot-toast';
import 'twin.macro';
import { useGetTransactionHistory } from '../../apis/hooks/transactionHistoryHooks';
import ButtonPage from '../../components/Booking/ButtonPage';
import { Layout } from '../../components/Utils/Layout';
import ButtonChangePage from '../../components/Booking/ButtonChangePage';
import { getTransactionHistory } from '../../apis/services/transactionHistoryService';
import withAuth from '../../components/Utils/HOC/WithAuth';
import CardTransaction from '../../components/TransactionHistory/CardTransaction';
import tw, { css } from 'twin.macro';

interface ITransaction {
  id: number;
  image: string;
  name: string;
  price: number;
  date: string;
}

const TransactionHistory: React.FC = () => {
  const router = useRouter();
  if (!router.isReady) return <></>;

  const [currentPage, setCurrentPage] = useState(1);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
  const [transaction, setTransaction] = useState<Array<ITransaction>>([]);
  const [totalPage, setTotalPage] = useState(0);

  let limit = 5;
  let pageNumberLimit = 5;

  function handlePagination(page: any) {
    const response = getTransactionHistory({
      limit: limit,
      page: page,
    });

    const result = response.then((res) => {
      return res;
    });

    const getData = () => {
      result.then((data: any) => {
        setTransaction(data.data.data.transactions);
        setCurrentPage(page);
        setTotalPage(data.data.data.pagination.total_page);
      });
    };
    getData();
  }

  const handleClick = (data: any) => {
    let page = data.target.id + '';
    handlePagination(Number(page));
  };

  const handlePrevbtn = () => {
    if (currentPage > 1) {
      let page = currentPage - 1;
      handlePagination(page);
    }

    if ((currentPage - 1) % pageNumberLimit == 0 && currentPage != 1) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  const handleNextbtn = () => {
    if (currentPage < totalPage) {
      let page = currentPage + 1;
      handlePagination(page);
    }

    if (currentPage + 1 > maxPageNumberLimit && currentPage != totalPage) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const { status, error }: any = useGetTransactionHistory(
    {
      limit: limit,
      page: currentPage,
    },
    {
      onSuccess: (res: any) => {
        setTransaction(res.data.data.transactions);
        if (totalPage == 0) {
          setTotalPage(res.data.data.pagination.total_page);
        }
      },
      onError: (err: any) => {
        toast.error(err.response?.data?.message, { position: 'top-right' });
      },
    }
  );

  const pages = [];
  for (let i = 1; i <= totalPage; i++) {
    pages.push(i);
  }

  return (
    <>
      <Layout>
        <Head>
          <title>Riwayat Transaksi</title>
        </Head>
        <div
          css={[
            css`
              width: 100vw;
            `,
            tw`max-w-screen-xl`,
          ]}
        >
          <div tw="flex justify-center items-center gap-6">
            <button
              onClick={() => router.back()}
              data-testid="back-button"
              tw="duration-150 hover:(brightness-125)"
            >
              <img src={'/images/Detail/left-arrow.svg'} alt="back" />
            </button>
            <p
              css={[
                tw`text-[40px] leading-normal font-bold`,
                css`
                  text-align: center;
                `,
              ]}
            >
              Riwayat Transaksi
            </p>
          </div>

          {status === 'error' && <p>Error: {error.response?.data?.message}</p>}
          {status === 'success' && (
            <div tw="max-w-screen-xl mx-52 justify-center">
              <div tw="flex flex-col m-5 ">
                {status === 'loading' && <p>Loading . . .</p>}
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

              <div tw="flex justify-center items-center m-5 gap-x-1">
                <ButtonChangePage
                  onClick={handlePrevbtn}
                  state="<"
                  page={currentPage}
                />
                <ButtonPage
                  pages={pages}
                  onClick={handleClick}
                  maxLimitPage={maxPageNumberLimit}
                  minLimitPage={minPageNumberLimit}
                />
                <ButtonChangePage
                  onClick={handleNextbtn}
                  state=">"
                  page={currentPage}
                />
              </div>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
};

export default withAuth(TransactionHistory);
