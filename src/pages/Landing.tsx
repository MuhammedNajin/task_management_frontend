import React from 'react';
import { HeroSection } from '../organisms/HeroSection';
import { CTAGroup } from '../molecules/CTAGroup';
import { FeaturesGrid } from '../organisms/FeaturesGrid';

export const Landing: React.FC = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-gray-100 to-gray-200 text-white p-6">
    <div className="max-w-3xl w-full text-center">
      <HeroSection
        title="Task Manager"
        subtitle="Organize, prioritize, and complete your tasks with our intuitive platform."
      />
      <CTAGroup className="mb-12" />
      <FeaturesGrid className="mt-8" />
    </div>
  </div>
);