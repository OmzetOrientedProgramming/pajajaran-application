import { cleanup, render } from '@testing-library/react';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import withAuth from '../../components/Utils/HOC/WithAuth';
import { createMockRouter } from '../../__mocks__/utils/createMockRouter';
import HomePage from '../../__mocks__/utils/homePage';

jest.mock('next/router', () => ({
  push: jest.fn(),
}));

beforeAll(() => {
  console.error = jest.fn();
});

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('WithAuth', () => {
  test('populates initial props', async () => {
    const props = await withAuth(HomePage).getInitialProps({
      ctx: {},
    });

    expect(props).toEqual({});
  });
});
