import { ReactComponent as StarImage } from 'assets/images/star.svg';
import { Review } from 'types/review';

import './styles.css';

type Props = {
  review: Review;
};

const ReviewCard = ({ review }: Props) => {
  return (
    <div className="reviews-card-container">
      <div className="name-container">
        <StarImage />
        <p>{review?.user?.name}</p>
      </div>
      <div className="reviews-container">
        <p>{review?.text}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
