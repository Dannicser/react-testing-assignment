import { Box, Button, Checkbox, Stack, Typography } from "@mui/material";

export enum TaskStatus {
  active = "ACTIVE",
  compeleted = "COMPLETED",
}

export interface ITaskItem {
  id: number;
  index?: number;
  text: string;
  status: TaskStatus;
  changeTaskStatus?: (id: number) => void;
  deleteTask?: (id: number) => void;
}

export const TaskItem: React.FC<ITaskItem> = ({ id, text, status, changeTaskStatus, deleteTask, index }) => {
  return (
    <Box key={id} m={2}>
      <Stack alignItems={"center"} justifyContent={"space-between"} flexDirection={"row"}>
        <Checkbox data-testid={`task-checkbox-${index}`} onClick={() => changeTaskStatus?.(id)} checked={status === TaskStatus.compeleted} />
        <Typography>{text}</Typography>
        <Box ml={2}>
          <Button data-testid={`task-delete-button-${index}`} onClick={() => deleteTask?.(id)} color="error" variant="contained">
            delete
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};
