import { useCallback, useEffect, useMemo, useState } from "react";

import { TaskInput } from "../components/TaskInput/TaskInput";
import { TaskList } from "../components/TaskList/TaskList";
import { ITaskItem, TaskStatus } from "../components/TaskItem/TaskItem";
import { FilterBar, FilterType } from "../components/FilterBar/FilterBar";

import { Box, Divider } from "@mui/material";

import { addQuaryParams, getQuaryParam } from "../libs/url";

import "./App.css";

function App() {
  const [taskValue, setTaskValue] = useState<string>("");
  const [tasks, setTasks] = useState<ITaskItem[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<ITaskItem[]>([]);
  const [filterType, setFilterType] = useState<FilterType | TaskStatus>(FilterType.all);

  useEffect(() => {
    setInitialTasks();
  }, []);

  useEffect(() => {
    const initialParam = getQuaryParam("filter");

    if (initialParam) {
      setFilterType(initialParam as FilterType);
    }
  }, []);

  useEffect(() => {
    filterTasks();
    addQuaryParams({
      filter: filterType,
    });
  }, [filterType]);

  useEffect(() => {
    saveTasksToLS();
    filterTasks();
  }, [tasks]);

  const inputHandler = useCallback((value?: string) => {
    if (value) {
      setTaskValue(value);
    }
  }, []);

  function addTask() {
    setTasks((prevState) => {
      return [{ id: Math.random(), status: TaskStatus.active, text: taskValue }, ...prevState];
    });
    setTaskValue("");
  }

  const deleteTask = useCallback((id: number) => {
    setTasks((prevState) => {
      return prevState.filter((task) => task.id !== id);
    });
  }, []);

  const changeTaskStatus = useCallback((id: number) => {
    setTasks((prevState) => {
      return prevState.map((task) => {
        if (task.id === id) {
          return { ...task, status: task.status === TaskStatus.compeleted ? TaskStatus.active : TaskStatus.compeleted };
        }

        return task;
      });
    });
  }, []);

  const changeFilter = useCallback((type: FilterType) => setFilterType(type), []);

  function filterTasks() {
    if (filterType === FilterType.all) {
      setFilteredTasks(tasks);
    } else {
      setFilteredTasks(tasks.filter((task) => task.status === filterType));
    }
  }

  function deleleCompletedTask() {
    setTasks((prevState) => prevState.filter((task) => task.status === TaskStatus.active));
  }

  const completedTask = useMemo(() => tasks.filter((task) => task.status !== TaskStatus.compeleted).length, [tasks]);

  function saveTasksToLS() {
    window.localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function setInitialTasks() {
    const data = window.localStorage.getItem("tasks");

    if (data) {
      setTasks(JSON.parse(data));
    }
  }

  console.log("render");

  return (
    <div className="App">
      <TaskInput value={taskValue} addTask={addTask} inputHandler={inputHandler} />
      <div className="list">
        <Box mt={2}>
          <Divider />
        </Box>
        <TaskList changeTaskStatus={changeTaskStatus} deleteTask={deleteTask} tasks={filteredTasks} />
      </div>
      <div className={"filterbar"}>
        <Divider />
        <FilterBar completed={completedTask} deleleCompletedTask={deleleCompletedTask} changeFilter={changeFilter} />
      </div>
    </div>
  );
}

export default App;
