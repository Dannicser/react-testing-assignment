import { ITaskItem, TaskItem } from "../TaskItem/TaskItem";

import { Box, Divider, Stack } from "@mui/material";

interface ITaskList {
  tasks: ITaskItem[];
  deleteTask: (id: number) => void;
  changeTaskStatus: (id: number) => void;
}

export const TaskList: React.FC<ITaskList> = ({ tasks, deleteTask, changeTaskStatus }) => {
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
