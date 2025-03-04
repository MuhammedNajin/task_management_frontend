export interface Task {
  id?: string;
  title: string;
  slug?: string;
  description: string;
  status: "pending" | "in_progress" | "completed";
  priority: "low" | "medium" | "high";
  category?: string;
  dueDate?: Date;
  userId: string;
  subtasks?: string[];
  createdAt: string;
  updatedAt?: string;
  isDeleted?: boolean;
}

export interface NavItem {
  label: string;
  href: string;
  isActive?: boolean;
}

export interface User {
  name: string;
  email: string;
  initials: string;
}


export interface TaskAnalytics {
    totalTasks: number;
    statusBreakdown: {
        pending: number;
        inProgress: number;
        completed: number;
    };
    priorityBreakdown: {
        low: number;
        medium: number;
        high: number;
    };
    overdueTasks: number;
    completionRate: number;
}
