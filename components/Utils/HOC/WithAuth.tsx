import React from 'react';
import { NextPage, NextPageContext } from 'next';
import Router from 'next/router';
import nookies from 'nookies';
import jwtDecode, { JwtPayload } from 'jwt-decode';

const loginURL = '/auth';
const withAuth: (WrappedComponent: NextPage) => NextPage = (
  WrappedComponent: NextPage
) => {
  const hocComponent: NextPage = ({ ...props }) => (
    <WrappedComponent {...props} />
  );

  hocComponent.getInitialProps = async (ctx: NextPageContext) => {
    const { res } = ctx;
    const accessToken = nookies.get(ctx)?.token;

    // console.log(jwtDecode<JwtPayload>(accessToken));

    const flag =
      !accessToken ||
      (accessToken &&
        Date.now() >=
          (jwtDecode<JwtPayload>(accessToken).exp! * 1000 ?? Date.now() + 1));

    const returnProps = {
      accessToken,
    };

    if (flag) {
      if (res) {
        res.writeHead(302, {
          location: loginURL,
        });
        res.end();
      } else {
        Router.push(loginURL);
      }
    }

    if (WrappedComponent.getInitialProps) {
      const wrappedProps = await WrappedComponent.getInitialProps(ctx);
      return { ...wrappedProps, ...returnProps };
    }

    return returnProps;
  };

  return hocComponent;
};

export default withAuth;
