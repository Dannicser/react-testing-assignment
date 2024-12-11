import { Button, Container, Stack, TextField } from "@mui/material";

interface ITaskInput {
  inputHandler?: (value?: string) => void;
  addTask?: () => void;
  value?: string;
}

export const TaskInput: React.FC<ITaskInput> = ({ inputHandler, addTask, value }) => {
  function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    inputHandler?.(e.target.value);
  }

  function onClickHandler() {
    if (value && value.length > 0) {
      addTask?.();
    }
  }

  function onSubmitHandler(e: React.FormEvent) {
    e.preventDefault();
    if (value && value.length > 0) {
      addTask?.();
    }
  }

  return (
    <Container component={"form"} onSubmit={onSubmitHandler}>
      <Stack>
        <TextField
          inputProps={{ "data-testid": "task-input" }} // MUI has some problems with React-testing-lib
          onChange={onChangeHandler}
          value={value}
          size="small"
          variant="outlined"
          label="Type your task"
        />
        <Button data-testid={"task-button"} type="submit" onClick={onClickHandler} size="medium" variant="contained">
          ADD TASK
        </Button>
      </Stack>
    </Container>
  );
};
