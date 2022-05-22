import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import Home from '../../pages/index';
import IndexWrapper from '../../__mocks__/pages';

const location: any = new URL('https://www.example.com');
location.assign = jest.fn();
location.replace = jest.fn();
location.reload = jest.fn();

Reflect.deleteProperty(global.window, 'location');
window.location = location;

jest.mock('next/link', () => {
  return ({ children }: any) => {
    return children;
  };
});

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

test('renders wave title', () => {
  render(<Home />);

  expect(
    screen.getByText('Selamat Datang ke Dashboard Admin')
  ).toBeInTheDocument();
});

test('sign out button', async () => {
  render(
    <IndexWrapper>
      <Home />
    </IndexWrapper>
  );

  expect(screen.getByText('Sign Out')).toBeInTheDocument();

  fireEvent.click(screen.getByText('Sign Out'));
});
