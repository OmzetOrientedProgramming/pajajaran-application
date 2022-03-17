import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import axios from 'axios';

import Example from '../../pages/example';
import { headers } from '../../apis/constants';
import endpoint from '../../apis/endpoint';
import ExampleWrapper from '../../__mocks__/pages/example';
import {
  getExampleParams,
  mockGetExampleResponse,
  mockPostExampleResponse,
  postExampleParams,
} from '../../__mocks__/requests/exampleMocks';

// To mock axios
jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

// To mock <Link>
jest.mock('next/link', () => {
  return ({ children }: any) => {
    return children;
  };
});

// beforeAll(() => {
//   console.error = jest.fn();
// });

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('useGetExample()', () => {
  test('page display data requested', async () => {
    mockAxios.get.mockResolvedValueOnce(mockGetExampleResponse);

    render(
      <ExampleWrapper>
        <Example />
      </ExampleWrapper>
    );

    expect(screen.getByText('Getting data . . .')).toBeInTheDocument();

    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith(
      `${endpoint.example}/${getExampleParams.id}`,
      { headers: headers, params: { page: getExampleParams.page } }
    );

    await waitFor(() => {
      expect(screen.getByText('Babik')).toBeInTheDocument();
    });
  });

  // Negative test not increasing coverage
  test('page failed to display data requested', async () => {
    mockAxios.get.mockReturnValueOnce(Promise.reject(new Error('get error')));
    // mockAxios.get.mockReturnValueOnce(Promise.reject({ message: 'get error' }));

    render(
      <ExampleWrapper>
        <Example />
      </ExampleWrapper>
    );

    // await expect(mockAxios.get).rejects.toThrow('get error');
    await waitFor(() => {
      expect(mockAxios.get).toHaveBeenCalledTimes(1);
      expect(screen.queryByText('Babik')).not.toBeInTheDocument();
    });
  });
});

describe('usePostExample()', () => {
  test('post button request successful', async () => {
    mockAxios.post.mockResolvedValueOnce(mockPostExampleResponse);

    render(
      <ExampleWrapper>
        <Example />
      </ExampleWrapper>
    );

    fireEvent.click(screen.getByText('Click to Post'));

    await waitFor(() => {
      expect(mockAxios.post).toHaveBeenCalledTimes(1);
      expect(mockAxios.post).toHaveBeenCalledWith(
        endpoint.example,
        { name: postExampleParams.name, job: postExampleParams.job },
        { headers }
      );
    });
  });

  // Negative test not working
  test('post button request failed', async () => {
    mockAxios.post.mockRejectedValueOnce(new Error('post error'));

    render(
      <ExampleWrapper>
        <Example />
      </ExampleWrapper>
    );

    fireEvent.click(screen.getByText('Click to Post'));

    await expect(mockAxios.post).rejects.toThrow('post error');
    await waitFor(() => {
      expect(mockAxios.post).toHaveBeenCalledTimes(1);
    });
  });
});
