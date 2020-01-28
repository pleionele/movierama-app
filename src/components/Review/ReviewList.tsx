import * as React from 'react';
import './Review.scss';
interface ReviewList {
  reviews: [any];
}
interface ReviewItem {
  content: string;
  author: string;
}
const Review = (props: ReviewItem) => {
  const { content, author } = props;
  return (
    <div data-testid="review" className="review">
      <strong>{author} said:</strong>
      <p>{content}</p>
    </div>
  );
};

const ReviewList = (props: any) => {
  const { reviews } = props;

  return reviews.length === 0 ? (
    <div data-testid="noReviews">No available reviews</div>
  ) : (
    reviews.map((item: ReviewItem, index: number) => {
      // TODO Change this logic
      if (index < 2) {
        return <Review {...item} key={item.author} />;
      }
    })
  );
};

export default ReviewList;
