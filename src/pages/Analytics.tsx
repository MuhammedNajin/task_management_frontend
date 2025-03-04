import React, { useState, useEffect } from "react";
import { TaskStats } from "../organisms/TaskStats";
import { TaskAnalytics } from "../organisms/TaskAnalatycs";
import TaskService from "../service/api/task";
import toast from "react-hot-toast";
import { AppTemplate } from "../templates/AppTemplate";
import { useAppSelector } from "../hooks/redux";

interface DashboardData {
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

const Dashboard: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user?.id) {
        toast.error("Please log in to view dashboard data");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await TaskService.getTaskAnalytics(user.id);
        setData(response);
        toast.success("Dashboard data loaded successfully");
      } catch (err) {
        toast.error(
          err instanceof Error ? err.message : "Failed to load dashboard data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user?.id]);

  return (
    <AppTemplate>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Task Analytics Dashboard</h1>
        
        {loading && (
          <div className="text-center">Loading...</div>
        )}
        
        {!loading && !data && (
          <div className="text-center">No data available</div>
        )}
        
        {!loading && data && (
          <div className="space-y-6">
            <TaskStats
              totalTasks={data.totalTasks}
              overdueTasks={data.overdueTasks}
              completionRate={data.completionRate}
            />
            <TaskAnalytics
              statusBreakdown={data.statusBreakdown}
              priorityBreakdown={data.priorityBreakdown}
            />
          </div>
        )}
      </div>
    </AppTemplate>
  );
};

export default Dashboard;