import { ITaskItem, TaskItem } from "../TaskItem/TaskItem";

import { Alert, Box, Divider, Stack } from "@mui/material";

interface ITaskList {
  tasks: ITaskItem[];
  deleteTask: (id: number) => void;
  changeTaskStatus: (id: number) => void;
}

export const TaskList: React.FC<ITaskList> = ({ tasks, deleteTask, changeTaskStatus }) => {
  if (!tasks.length) {
    return (
      <Alert variant="filled" severity="warning">
        There is no task in this section yet. Add one!
      </Alert>
    );
  }

  return (
    <Stack justifyContent={"center"}>
      {tasks.map(({ id, text, status }: ITaskItem, i) => {
        return (
          <Box data-testid={`task-item-${i}-${status}`} key={id}>
            <TaskItem index={i} id={id} text={text} status={status} deleteTask={deleteTask} changeTaskStatus={changeTaskStatus} />
            <Divider />
          </Box>
        );
      })}
    </Stack>
  );
};
