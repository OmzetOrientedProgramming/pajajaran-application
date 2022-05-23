import StarRating from '../../../components/Utils/StarRating';
import { render } from '@testing-library/react';

describe('Test For Star Component ', () => {
  test('renders StarFull', () => {
    render(<StarRating rating={2} type={'golden'} size={'17'} />);
  });
  test('renders StarHalf', () => {
    render(<StarRating rating={2.6} type={'black'} size={'17'} />);
  });
});
