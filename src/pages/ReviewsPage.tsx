import React from 'react';
import { ReviewsSection } from '../components/ReviewsSection';

export const ReviewsPage: React.FC = () => {
  return (
    <div>
      <h1 className="sr-only">Customer Reviews</h1>
      <ReviewsSection />
    </div>
  );
};
