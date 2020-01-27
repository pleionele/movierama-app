import * as React from 'react';

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
    <div data-testid="review">
      <div>{author} said:</div>
      <p>{content}</p>
    </div>
  );
};

const ReviewList = (props: any) => {
  const { reviews } = props;
  return reviews.map((item: ReviewItem, index: number) => {
    // TODO Change this logic
    if (index < 2) {
      return <Review {...item} key={item.author} />;
    }
  });
};

export default ReviewList;
