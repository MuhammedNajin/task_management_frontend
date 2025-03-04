import React from 'react';
import { Heading } from '../atoms/Headings';
import { Text } from '../atoms/Text';

export const ImageSection: React.FC = () => (
  <div className="w-full md:w-3/5  p-6 rounded-lg  flex flex-col justify-center">
    <div className="p-4 rounded-lg border border-gray-100 mb-6">

      <div className="h-64 w-full flex items-center justify-center">
        <img 
          src="/api/placeholder/640/320" 
          alt="CRM Dashboard Preview" 
          className="max-w-full max-h-full object-contain"
        />
      </div>
    </div>
    <div className="text-center mb-4">
      <Heading level={2} className="text-2xl font-bold mb-2">Start tracking your sales today</Heading>
      <Text className="text-gray-600">
        Join thousands of businesses that use our platform to increase revenue, 
        track performance, and grow their customer base - all with zero cost.
      </Text>
    </div>
  </div>
);