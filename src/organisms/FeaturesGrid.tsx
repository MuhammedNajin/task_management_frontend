import React from 'react';
import { FeatureCard } from '../molecules/FeatureCard';
import { Feature } from '../types/Features';

interface FeaturesGridProps {
  className?: string;
}

export const FeaturesGrid: React.FC<FeaturesGridProps> = ({ className = '' }) => {
  const features: Feature[] = [
    { title: 'Easy Organization', description: 'Categorize and sort your tasks effortlessly' },
    { title: 'Smart Reminders', description: 'Never miss a deadline with customizable alerts' },
    { title: 'Progress Tracking', description: 'Visualize your productivity and achievements' },
  ];

  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${className}`}>
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </div>
  );
};