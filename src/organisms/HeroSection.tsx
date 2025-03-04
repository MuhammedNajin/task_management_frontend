import React from 'react';
import { Heading } from '../atoms/Headings';
import { Text } from '../atoms/Text';

interface HeroSectionProps {
  title: string;
  subtitle: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ title, subtitle }) => (
  <div className="text-center">
    <Heading level={1} className="text-5xl font-bold mb-6 text-blue-500">
      {title}
    </Heading>
    <Text className="text-xl mb-8 max-w-lg mx-auto text-blue-400">
      {subtitle}
    </Text>
  </div>
);