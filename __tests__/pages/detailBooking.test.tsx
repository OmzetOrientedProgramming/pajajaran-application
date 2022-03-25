import { cleanup, render, screen } from '@testing-library/react';
import Detail from '../../pages/booking/[id]';
import ExampleWrapper from '../../__mocks__/pages/example';

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('ui components', () => {
  test('sections title exist', async () => {
    render(
      <ExampleWrapper>
        <Detail />
      </ExampleWrapper>
    );

    expect(screen.queryByText('Informasi Booking')).toBeInTheDocument();
    expect(screen.queryByText('Pesanan Tambahan')).toBeInTheDocument();
    expect(screen.queryByText('Ringkasan')).toBeInTheDocument();
  });
});
