import React from 'react';
import { Grid, List } from 'lucide-react';
import { Button } from '../atoms/Button';

interface ViewToggleProps {
  viewMode: 'grid' | 'list';
  onViewChange: (mode: 'grid' | 'list') => void;
}

export const ViewToggle: React.FC<ViewToggleProps> = ({ viewMode, onViewChange }) => (
  <div className="flex items-center border border-gray-300 rounded-md">
    <Button
      onClick={() => onViewChange('grid')}
      className={`p-2 ${viewMode === 'grid' ? 'bg-blue-700 hover:bg-blue-800 text-white' : 'text-gray-600 bg-gray-200 hover:bg-gray-300'}`}
    >
      <Grid className="h-5 w-5" />
    </Button>
    <Button
      onClick={() => onViewChange('list')}
      className={`p-2 ${viewMode === 'list' ? 'bg-blue-700 hover:bg-blue-800 text-white' : 'text-gray-600 bg-gray-200 hover:bg-gray-300'}`}
    >
      <List className="h-5 w-5" />
    </Button>
  </div>
);