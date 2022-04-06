import React from 'react';
import {NextPage, NextPageContext} from 'next';
import Router from 'next/router';
import nookies from 'nookies';
import jwtDecode from 'jwt-decode';

const loginURL = '/auth';
const withAuth: (WrappedComponent: NextPage) => NextPage = (WrappedComponent: NextPage) => {
  const hocComponent: NextPage = ({...props}) => (
    <WrappedComponent {...props} />
  );

  hocComponent.getInitialProps = async (ctx: NextPageContext) => {
    const {res} = ctx;
    const accessToken = nookies.get(ctx)?.token;

    const flag = !(
      accessToken
    );

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
      return {...wrappedProps, ...returnProps};
    }

    return returnProps;
  };

  return hocComponent;
};

export default withAuth;
