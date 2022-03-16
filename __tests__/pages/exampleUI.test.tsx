import { cleanup, render, screen } from '@testing-library/react';
import Example from '../../pages/example';
import ExampleWrapper from '../../__mocks__/pages/example';

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('user interface component', () => {
  test('button link exist', async () => {
    render(
      <ExampleWrapper>
        <Example />
      </ExampleWrapper>
    );

    // expect(screen.queryByText('Back to Home')).toBeInTheDocument();
    expect(screen.queryByText('Click to Post')).toBeInTheDocument();
  });
});
