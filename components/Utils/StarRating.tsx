import React from 'react';
import {
  StarFullGolden,
  StarEmptyGolden,
  StarHalfGolden,
  StarFullBlack,
  StarHalfBlack,
  StarEmptyBlack,
} from './StarSVG';
import 'twin.macro';

interface StarRatingProps {
  rating: number;
  type: 'golden' | 'black';
  size: string;
}

const StarRating: React.FC<StarRatingProps> = (props) => {
  const modulo1 = props.rating % 1;
  const modulo05 = props.rating % 0.5;

  const countFullStar = props.rating - modulo1;
  const countHalfStar = (props.rating - countFullStar - modulo05) * 2;
  const countEmptyStar = 5 - countFullStar - countHalfStar;

  return (
    <div tw="flex flex-row">
      {props.type === 'golden' &&
        countFullStar > 0 &&
        [...Array(countFullStar)].map((e, i) => (
          <StarFullGolden size={props.size} key={i} />
        ))}
      {props.type === 'golden' &&
        countHalfStar > 0 &&
        [...Array(countHalfStar)].map((e, i) => (
          <StarHalfGolden size={props.size} key={i} />
        ))}
      {props.type === 'golden' &&
        countEmptyStar > 0 &&
        [...Array(countEmptyStar)].map((e, i) => (
          <StarEmptyGolden size={props.size} key={i} />
        ))}
      {props.type === 'black' &&
        countFullStar > 0 &&
        [...Array(countFullStar)].map((e, i) => (
          <StarFullBlack size={props.size} key={i} />
        ))}
      {props.type === 'black' &&
        countHalfStar > 0 &&
        [...Array(countHalfStar)].map((e, i) => (
          <StarHalfBlack size={props.size} key={i} />
        ))}
      {props.type === 'black' &&
        countEmptyStar > 0 &&
        [...Array(countEmptyStar)].map((e, i) => (
          <StarEmptyBlack size={props.size} key={i} />
        ))}
    </div>
  );
};

export default StarRating;
