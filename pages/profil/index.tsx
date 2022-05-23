import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import 'twin.macro';
import ButtonPage from '../../components/Booking/ButtonPage';
import { Layout } from '../../components/Utils/Layout';
import ButtonChangePage from '../../components/Booking/ButtonChangePage';
import withAuth from '../../components/Utils/HOC/WithAuth';
import tw, { css } from 'twin.macro';
import { useGetReview } from '../../apis/hooks/reviewHooks';
import ReviewCard from '../../components/Profile/reviewCard';
import { useGetDetailProfile } from '../../apis/hooks/detailProfileHooks';
import ProfileCard from '../../components/Profile/profileCard';

const ProfilBisnis: React.FC = () => {
  const router = useRouter();
  if (!router.isReady) return <></>;

  const [currentPage, setCurrentPage] = useState(1);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
  const [pages, setPages] = useState<Array<number>>([]);

  let limit = 5;
  let pageNumberLimit = 5;

  const {
    data: dataReview,
    status: statusReview,
    error: errorReview,
    refetch,
  }: any = useGetReview(
    {
      limit: limit,
      page: currentPage,
    },
    {
      onSuccess: (res: any) => {
        if (pages.length === 0) {
          const temp: number[] = [];
          for (let i = 1; i <= res.data.data.pagination.total_page; i++) {
            temp.push(i);
          }
          setPages(temp);
        }
      },
      onError: (err: any) => {
        toast.error(err.response?.data?.message, { position: 'top-right' });
      },
    }
  );

  const {
    data: dataProfile,
    status: statusProfile,
    error: errorProfile,
  }: any = useGetDetailProfile({
    onSuccess: (res: any) => {},
    onError: (err: any) => {
      toast.error(err.response?.data?.message, { position: 'top-right' });
    },
  });

  useEffect(() => {
    refetch();
  }, [currentPage]);

  const handleClick = (data: any) => {
    setCurrentPage(parseInt(data.target.id));
  };

  const handlePrevbtn = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }

    if ((currentPage - 1) % pageNumberLimit == 0 && currentPage != 1) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  const handleNextbtn = () => {
    if (currentPage < pages[pages.length - 1]) {
      setCurrentPage((prevPage) => prevPage + 1);
    }

    if (
      currentPage + 1 > maxPageNumberLimit &&
      currentPage != pages[pages.length - 1]
    ) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  return (
    <>
      <Layout>
        <Head>
          <title>Profil Bisnis</title>
        </Head>
        <div
          css={[
            css`
              width: 100vw;
            `,
            tw`max-w-screen-xl`,
          ]}
        >
          {statusReview === 'error' && (
            <p>Error: {errorReview.response?.data?.message}</p>
          )}

          {statusProfile === 'error' && (
            <p>Error: {errorProfile.response?.data?.message}</p>
          )}
          {statusProfile === 'success' && (
            <div tw="max-w-screen-xl mx-52 justify-center pt-10">
              <ProfileCard
                name={dataProfile.data.data.name}
                image={dataProfile.data.data.image}
                address={dataProfile.data.data.address}
                description={dataProfile.data.data.description}
                average_rating={dataProfile.data.data.average_rating}
              />
              {statusReview === 'loading' && <p>Loading . . .</p>}

              {statusReview === 'success' && (
                <div tw="pt-5">
                  <p
                    css={[tw`w-full text-[28px] leading-normal font-bold py-3`]}
                  >
                    Ulasan({dataReview?.data?.data?.total_review})
                  </p>
                  <div tw="flex flex-col">
                    {dataReview?.data?.data?.reviews.map((detail: any) => (
                      <div key={detail.id} tw="pb-2">
                        <ReviewCard
                          name={detail.name}
                          rating={detail.rating}
                          content={detail.content}
                          time={detail.created_at}
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
          )}
        </div>
      </Layout>
    </>
  );
};

export default withAuth(ProfilBisnis);
