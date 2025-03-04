import React from 'react';
import { Button } from '../atoms/Button';

interface ModalFooterProps {
  onCancel: () => void;
  onSave: () => void;
  isSaveDisabled: boolean;
  saveText?: string;
}

export const ModalFooter: React.FC<ModalFooterProps> = ({
  onCancel,
  onSave,
  isSaveDisabled,
  saveText = 'Create Task',
}) => (
  <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
    <Button
      onClick={onCancel}
      className="bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
      disabled={isSaveDisabled}
    >
      Cancel
    </Button>
    <Button
      onClick={onSave}
      disabled={isSaveDisabled}
      className="bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400"
    >
      {saveText}
    </Button>
  </div>
);