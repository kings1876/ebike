import React from 'react';
import { ContactSection } from '../components/ContactSection';

export const ContactPage: React.FC = () => {
  return (
    <div>
      <h1 className="sr-only">Contact E Bikes for Sale</h1>
      <ContactSection />
    </div>
  );
};
