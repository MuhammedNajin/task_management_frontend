import React from 'react';
import { X } from 'lucide-react';
import { Icon } from '../atoms/Icon';

interface ModalHeaderProps {
  title: string;
  onClose: () => void;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({ title, onClose }) => (
  <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
    <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
    <Icon onClick={onClose}>
      <X size={20} />
    </Icon>
  </div>
);