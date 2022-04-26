import Head from "next/head"
import 'twin.macro';
import { useRouter } from "next/router";
import withAuth from "../../../components/Utils/HOC/WithAuth";
import { Layout } from "../../../components/Utils/Layout"
import { mockGetDetailTransactionHistoryResponse } from "../../../__mocks__/apis/detailTransactionHistoryMocks";
import tw, { css } from "twin.macro";
import moment from "moment";
import "moment/locale/id"
import CustomerInformationCard from "../../../components/TransactionHistory/Detail/customerInformationCard";
import React from "react";
import { useGetDetailTransactionHistory } from "../../../apis/hooks/detailTransactionHistoryHooks";
import toast from "react-hot-toast";


const DetailTransactionHistory: React.FC = () => {

	const router = useRouter();
	if (!router.isReady) return <></>;
	const { id } = router.query;
	const stringId: string = id as string;
	
	const { data, status, error }: any = useGetDetailTransactionHistory(
		{ id: stringId },
		{
		  onSuccess: (res: any) => {
			console.log(res);
		  },
		  onError: (err: any) => {
			// console.log('err', err.response);
			toast.error(err.response.data.message);
		  },
		}
	  );

	// const mockData = mockGetDetailTransactionHistoryResponse
	const detail = data?.data.data
	console.log(detail)
	
	return (
		<Layout>
			<Head>
				<title>Transaction history detail</title>
			</Head>  
			<div
				css={[
					css`width: 100vw;`,
					tw`max-w-screen-xl`,
				]}
			>	
				<div tw="flex flex-row items-end ml-16 mt-3 mb-12">
					<button
					onClick={() => router.back()}
					data-testid="back-button"
					tw="duration-150 hover:(brightness-125) mr-3"
					>
					<img src={'/images/Detail/left-arrow.svg'} alt="back" />
					</button>
					<h1 tw="font-bold text-4xl color[#003366]">Riwayat Transaksi</h1>
				</div>

				{status=== "loading" && (
					<div tw="flex flex-row justify-center h-full">
						<p tw="font-bold text-2xl">Loading Data ...</p>
					</div>
				)}

				{status === "success" && (
				<div tw="flex flex-col">
					<CustomerInformationCard customerName={detail.customer_name} customerProfilePicture={detail.customer_image} />


					<div tw='grid grid-rows-6 grid-cols-11 gap-y-1 space-y-3'>
						<div tw="row-start-1 col-start-4 col-span-2 pt-3">
							<h4 tw="font-bold text-xl">Waktu Pemesanan </h4>
						</div>

						<div tw="row-start-1 col-start-6 col-span-3">
							<span tw="flex text-xl"><p tw="font-bold whitespace-pre-wrap">: </p> {moment.utc(detail.start_time).format("HH:mm")}-{moment.utc(detail.end_time).format("HH:mm")} | {moment.utc(detail.date).format("Do MMMM YYYY")}</span>
						</div>

						<div tw="row-start-2 col-start-4 col-span-2">
							<h4 tw="font-bold text-xl">Jumlah Pesanan </h4>
						</div>

						<div tw="row-start-2 col-start-6 col-span-3">
							<span tw="flex text-xl"><p tw="font-bold whitespace-pre-wrap">: </p> {detail.capacity}</span>
						</div>
						
						<div tw="row-start-3 col-start-4 col-span-2">
							<h4 tw="font-bold text-xl">Detail Pemesanan </h4>
						</div>

						<div tw="row-start-3 col-start-6 col-span-3 ">
							<p tw=" text-xl font-bold whitespace-pre-wrap">: </p>
						</div>

						{detail.items?.length === 0 ?
						(<p tw="col-start-6 col-span-3 text-xl justify-self-center text-gray-500">Tidak Ada Pesanan Item</p>):
						(detail.items.map((item_detail: any, index: string) => {
							return (
							<React.Fragment key={index}>
								<p tw="col-start-6 col-span-2 text-xl">{item_detail.name}</p>
								<p tw="col-start-8 text-xl">X{item_detail.qty}</p>
								<p tw="col-start-9 text-xl">Rp{item_detail.price}</p>
							</React.Fragment>
							)
						})
						)
						}

						{ detail.items?.length === 0 ? 
						(<></>):
						(
						<>
						<div tw="col-start-6 col-span-4">
							<hr css={[css`border: 1px solid black;width:100%;text-align:left;margin-left:0`]}></hr>
						</div>

						<div tw="col-start-6 col-span-2">
							<p tw=" text-xl font-bold">Total :</p>
						</div>
						
						<div tw="col-start-9">
							<p tw=" text-xl font-bold">Rp{detail.total_price_item}</p>
						</div>
						</>
						)
						}
					</div>
						
				</div>)}

					{/* <div tw='grid grid-rows-3 gap-y-px space-y-1'>	
						<div tw="grid grid-cols-6 justify-center">
							<div tw="col-start-3">
								<h4 tw="font-bold text-xl">Waktu Pemesanan </h4>
							</div>
							<div tw="col-start-4 col-span-2">
								<span tw="flex text-xl"><p tw="font-bold whitespace-pre-wrap">: </p> {detail.start_time}-{detail.end_time} | {moment(detail.date, "DD-MM-YYYY").format("Do MMMM YYYY")}</span>
							</div>
						</div>
						
						<div tw="grid grid-cols-6 justify-center">
							<div tw="col-start-3">
								<h4 tw="font-bold text-xl">Jumlah Pesanan </h4>
							</div>
							<div tw="col-start-4 col-span-2">
								<span tw="flex text-xl"><p tw="font-bold whitespace-pre-wrap">: </p> {detail.capacity}</span>
							</div>
						</div>
						
						<div tw="grid grid-cols-6 grid-rows-2 justify-center">
							<div tw="col-start-3 row-start-1">
								<h4 tw="font-bold text-xl">Detail Pemesanan </h4>
							</div>
							<div tw="col-start-4 col-span-2 row-start-1">
								<p tw=" text-xl font-bold whitespace-pre-wrap">: </p>
							</div>
							<div tw="col-start-4 col-span-2 row-start-2">
								<div tw="grid grid-cols-3">
									{detail.items.map((item_detail: any) => (
										<div key={item_detail.name} tw="grid gap-y-0 grid-cols-3">
												<p>{item_detail.name}</p>
										</div>
									))
									}
								</div>
							</div>
						</div>
					</div>

				</div> */}
			</div>
      </Layout>
   )
}

export default withAuth(DetailTransactionHistory);
