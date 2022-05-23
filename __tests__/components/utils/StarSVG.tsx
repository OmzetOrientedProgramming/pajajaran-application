import { render } from '@testing-library/react';
import {
  StarFullGolden,
  StarHalfGolden,
  StarEmptyGolden,
  StarFullBlack,
  StarHalfBlack,
  StarEmptyBlack,
} from '../../../components/Utils/StarSVG';

describe('Test For Golden Star ', () => {
  test('renders StarFullGolden', () => {
    render(<StarFullGolden size={'16'} />);
  });
  test('renders StarHalfGolden', () => {
    render(<StarHalfGolden size={'16'} />);
  });
  test('renders StarEmptyGolden', () => {
    render(<StarEmptyGolden size={'16'} />);
  });
  test('renders StarFullBlack', () => {
    render(<StarFullBlack size={'16'} />);
  });
  test('renders StarHalfBlack', () => {
    render(<StarHalfBlack size={'16'} />);
  });
  test('renders StarEmptyBlack', () => {
    render(<StarEmptyBlack size={'16'} />);
  });
});
