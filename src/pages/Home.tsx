import React, { useState, useEffect } from "react";
import { AppTemplate } from "../templates/AppTemplate";
import { SearchBar } from "../molecules/SearchBar";
import { FilterDropdown } from "../molecules/FilterDropdown";
import { ViewToggle } from "../molecules/ViewToggle";
import { TaskList } from "../organisms/TaskList";
import { Text } from "../atoms/Text";
import { Task } from "../types/Task";
import { TaskSummary } from "../organisms/TaskSummary"; 
import TaskService from "../service/api/task";
import { useAppSelector } from "../hooks/redux";
import toast from "react-hot-toast";
import useSocket from "../hooks/useSocket";

export const Home: React.FC = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAppSelector((state) => state.auth);

  const socket = useSocket();

  useEffect(() => {
    const fetchTasks = async () => {
      if (!user?.id) {
        toast.error("Please log in to view tasks");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const userTasks = await TaskService.getUserTasks(
          user.id,
          statusFilter,
          priorityFilter,
          searchTerm
        );
        setTasks(userTasks);
        toast.success("Tasks loaded successfully");
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to load tasks"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [user?.id, statusFilter, priorityFilter, searchTerm]);

  useEffect(() => {
    if (!socket || !user?.id) return;

    socket.on("taskCreated", (newTask: Task) => {
      console.log("task created ", newTask);
      if (newTask.userId === user.id) {
        setTasks((prevTasks) => [...prevTasks, newTask]);
        toast.success("New task added in real-time");
      }
    });

    socket.on("taskUpdated", (updatedTask: Task) => {
      console.log("task updated ", updatedTask);
      if (updatedTask.userId === user.id) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === updatedTask.id ? updatedTask : task
          )
        );
        toast.success("Task updated in real-time");
      }
    });

    socket.on("taskDeleted", (taskId: string) => {
      setTasks((prevTasks) => {
        const updatedTasks = prevTasks.filter((task) => task.id !== taskId);
        if (updatedTasks.length < prevTasks.length) {
          toast.success("Task deleted in real-time");
        }
        return updatedTasks;
      });
    });

    return () => {
      socket.off("taskCreated");
      socket.off("taskUpdated");
      socket.off("taskDeleted");
    };
  }, [socket, user?.id]);

  const taskSummary = {
    all: tasks.length,
    pending: tasks.filter((task) => task.status === "pending").length,
    inProgress: tasks.filter((task) => task.status === "in_progress").length,
    completed: tasks.filter((task) => task.status === "completed").length,
  };

  const handleAddTask = () => {
    console.log("Add new task clicked");
  };

  return (
    <AppTemplate>
      <div className="max-w-7xl mx-auto p-4">
        <div className="mb-6">
          <Text className="text-2xl font-bold text-gray-900">My Tasks</Text>
          <Text className="text-gray-600 mt-1">
            Manage and track your tasks
          </Text>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <SearchBar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex items-center gap-3">
            <FilterDropdown
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={[
                { value: "all", label: "All Tasks" },
                { value: "pending", label: "Pending" },
                { value: "in_progress", label: "In Progress" },
                { value: "completed", label: "Completed" },
              ]}
            />
            <FilterDropdown
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              options={[
                { value: "all", label: "All Priorities" },
                { value: "high", label: "High" },
                { value: "medium", label: "Medium" },
                { value: "low", label: "Low" },
              ]}
              id="priority-filter"
              placeholder="Filter by Priority"
            />
            <ViewToggle viewMode={viewMode} onViewChange={setViewMode} />
          </div>
        </div>

        <TaskSummary
          all={taskSummary.all}
          pending={taskSummary.pending}
          inProgress={taskSummary.inProgress}
          completed={taskSummary.completed}
        />

        {loading && (
          <div className="text-center py-10">
            <Text>Loading tasks...</Text>
          </div>
        )}

        {!loading && tasks.length === 0 && (
          <div className="text-center py-10">
            <Text>No tasks found</Text>
          </div>
        )}

        {!loading && tasks.length > 0 && (
          <TaskList
            tasks={tasks}
            viewMode={viewMode}
            onAddTask={handleAddTask}
          />
        )}
      </div>
    </AppTemplate>
  );
};

export default Home;