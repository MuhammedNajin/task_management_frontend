import React from 'react';
import { Heading } from '../atoms/Headings';
import { Text } from '../atoms/Text';
import { Card } from './Card';
import { CheckCircle } from 'lucide-react';
import { Feature } from '../types/Features';

export const FeatureCard: React.FC<Feature> = ({ title, description }) => (
  <Card className="text-left">
    <div className="flex items-center mb-3">
      <CheckCircle className="mr-2 text-green-400" size={20} />
      <Heading level={3} className="font-bold text-lg text-gray-900">
        {title}
      </Heading>
    </div>
    <Text className="text-gray-500">{description}</Text>
  </Card>
);