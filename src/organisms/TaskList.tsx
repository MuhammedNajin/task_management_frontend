import React from 'react';
import { TaskCard } from './TaskCard';
import { Text } from '../atoms/Text';
import { Button } from '../atoms/Button';
import { Search, Plus } from 'lucide-react';
import { Task } from '../types/Task';

interface TaskListProps {
  tasks: Task[];
  viewMode: 'grid' | 'list';
  onAddTask: () => void;
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, viewMode, onAddTask }) => (
  <>
    {tasks.length > 0 ? (
      <div
        className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-4'
        }
      >
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    ) : (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <div className="mx-auto h-12 w-12 text-gray-400 flex items-center justify-center rounded-full bg-gray-100">
          <Search className="h-6 w-6" />
        </div>
        <Text className="mt-2 text-sm font-medium text-gray-900">No tasks found</Text>
        <Text className="mt-1 text-sm text-gray-500">
          Try adjusting your search or filter to find what you're looking for.
        </Text>
        <div className="mt-6">
          <Button
            onClick={onAddTask}
            className="text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add new task
          </Button>
        </div>
      </div>
    )}
  </>
);