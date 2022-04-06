import React from 'react';
import {NextPage, NextPageContext} from 'next';
import nookies from 'nookies';
import ErrorPage from 'next/error';

const withoutAuth: (WrappedComponent: NextPage) => NextPage = (WrappedComponent: NextPage) => {
  const hocComponent: NextPage<any> = ({...props}) => {
    if (props.statusCode) {
      return <ErrorPage statusCode={props.statusCode}/>;
    }
    return <WrappedComponent {...props} />;
  };

  hocComponent.getInitialProps = async (ctx: NextPageContext) => {
    const accessToken = nookies.get(ctx)?.accessToken;

    if (accessToken) {
      return {statusCode: 404};
    }

    if (WrappedComponent.getInitialProps) {
      const wrappedProps = await WrappedComponent.getInitialProps(ctx);
      return {...wrappedProps};
    }

    return {};
  };

  return hocComponent;
};

export default withoutAuth;
