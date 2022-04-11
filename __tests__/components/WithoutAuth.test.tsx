import { cleanup, render } from '@testing-library/react';
import { NextPageContext } from 'next';
import withoutAuth from '../../components/Utils/HOC/WithoutAuth';
import HomePage from '../../__mocks__/utils/homePage';

beforeAll(() => {
  console.error = jest.fn();
});

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('WithoutAuth', () => {
  test('populates initial props', async () => {
    render(withoutAuth(HomePage));

    const props = await withoutAuth(HomePage).getInitialProps({
      ctx: {},
    });

    expect(props).toEqual({});
  });
});
