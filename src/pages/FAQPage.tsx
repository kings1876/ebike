import React from 'react';
import { FAQSection } from '../components/FAQSection';

export const FAQPage: React.FC = () => {
  return (
    <div>
      <h1 className="sr-only">Frequently Asked Questions</h1>
      <FAQSection />
    </div>
  );
};
