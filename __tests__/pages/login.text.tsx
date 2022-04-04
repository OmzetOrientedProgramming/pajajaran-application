import {cleanup, fireEvent, render, screen} from '@testing-library/react';
import Auth from "../../pages/auth";
import {act} from "react-dom/test-utils";
import {QueryClient, QueryClientProvider} from "react-query";
import LoginForm from "../../components/Auth/LoginForm";

jest.mock('firebase/auth', () => {
  return {
    RecaptchaVerifier: jest.fn(() => ({
      verify: jest.fn(
        () =>
          new Promise((resolve, _) => {
            resolve(
              '03AGdBq26BCUD_6p0OPBZ-q62arVJRuvev8HGKRNOnK_aMBSqGStypYSx1hzu45mqFEhnpETyWUUXqkS1b8BQ7E0K-hhJ42MlQSTOR0bUNjwcFYWEfc0YlqQzndgGeHxVBL9T6TbHO_bZGTmipSS7RVTFE4vNUbBj24hXzUPacLAXw-3Yj5YDl8D23jLGkx8gnJPQOzPMQ_B29pI_Sxkpgw2uXdWOpExXwLEb7pO-CJKXO4aGQ6I3sHFrL6upsP3QCZwgOZpSf6yt3Kmqpxz3IkiEKeZbH6eyEE5379kPr3MfKNw_XPKk-IMHY96TZ857zH4vIx1V6RsN1nd3FC6mjjbyiM8QSgdP2w7-ISAgQ2-XBsW5l5csiJvjgIFCVEZqXpbUjwW5EIA4Gc_ITf7H3YHD5Qd98f_SxET_CH9iYLqI6XR2UVO8QCN1ppJFTj-1eoYmVtEdBK9GE2vQ1IvYGoAaOSmDDp5BGNg'
            );
          })
      ),
      clear: jest.fn(),
    })),
    getAuth: jest.fn(),
  };
});

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('login page', () => {
  beforeEach(async () => {
    await act(async () => {
      render(
        <QueryClientProvider client={new QueryClient()}>
          <Auth />
        </QueryClientProvider>
      );
    });
  });

  test('has title', () => {
    expect(screen.getByText('Sign in ke Dasbor Bisnis')).toBeInTheDocument();
  });

  test('has description', async () => {
    expect(screen.getByText('Masuk sebagai admin bisnis kamu dan kelola bisnis kamu')).toBeInTheDocument();
  });
});
