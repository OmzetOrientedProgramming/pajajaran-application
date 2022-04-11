import moment from 'moment';
import React from 'react';
import 'twin.macro';
import tw, { css } from 'twin.macro';
import Button from '../Utils/Button';

interface BalanceCardProps {
  balanceAmount: number;
  lastDisbursementDate: Date;
}

const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

function formatDate(date: Date) {
  let splittedDate = moment(date).format('dddd, D MMMM YYYY').split(' ');
  return (
    <div
      css={[
        css`
          display: table-cell;
          vertical-align: middle;
          text-align: right;
          padding-right: 4vw;
        `,
        tw`text-[40px] leading-normal font-bold`,
      ]}
    >
      <p css={tw`text-[30px] leading-normal font-medium`}>
        Terakhir dicairkan:
      </p>
      {splittedDate[0]} <br />
      {splittedDate[1]} {splittedDate[2]} {splittedDate[3]}
    </div>
  );
}

function formatBalance(balance: number) {
  return balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function inspectWithdrawalAbility(date: Date, amount: number) {
  if (amount === 0) return false;
  else {
    return true;
  }
}

function getButtonType(withdrawalAbility: boolean) {
  if (withdrawalAbility) {
    return 'primary';
  } else return 'primaryDisabled';
}

export const BalanceCard: React.FC<BalanceCardProps> = (props) => {
  return (
    <div
      css={[
        css`
          height: 24vw;
          width: 75vw;
          background-image: linear-gradient(#fd7702, #fff);
          display: table;
          margin-top: 2vw;
        `,
        tw`max-w-screen-xl`,
      ]}
    >
      <div
        css={css`
          display: table-cell;
          vertical-align: middle;
          padding-left: 4vw;
        `}
      >
        <p css={[tw`text-[30px] leading-normal font-medium`]}>Saldo</p>
        <div
          css={[
            css`
              display: table;
            `,
            tw`justify-start`,
          ]}
        >
          <div
            css={[
              css`
                display: table-cell;
                vertical-align: top;
              `,
              tw`text-[32px] leading-normal font-bold`,
            ]}
          >
            Rp
          </div>
          <p
            css={[
              css`
                display: table-cell;
                padding-left: 0.5vw;
              `,
              tw`text-[50px] leading-normal font-bold`,
            ]}
          >
            {formatBalance(props.balanceAmount)}
          </p>
        </div>
        <div
          css={[
            css`
              width: 15vw;
              vertical-align: top;
              margin-top: 2vw;
            `,
            tw`justify-start`,
          ]}
        >
          <Button
            buttonType={getButtonType(
              inspectWithdrawalAbility(
                props.lastDisbursementDate,
                props.balanceAmount
              )
            )}
          >
            Cairkan Saldo
          </Button>
        </div>
      </div>
      {formatDate(props.lastDisbursementDate)}
    </div>
  );
};
