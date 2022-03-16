import { render, screen } from '@testing-library/react';
import Home from '../../pages/index';

test('renders wave title', () => {
  render(<Home />);

  expect(screen.getByText('Wave Admin')).toBeInTheDocument();
});
