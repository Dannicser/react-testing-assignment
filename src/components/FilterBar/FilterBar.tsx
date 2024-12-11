import { Box, Button, Stack } from "@mui/material";

export enum FilterType {
  all = "ALL",
  active = "ACTIVE",
  completed = "COMPLETED",
}

interface IFilterBar {
  changeFilter: (type: FilterType) => void;
  completed: number;
  deleleCompletedTask: () => void;
}

export const FilterBar: React.FC<IFilterBar> = ({ changeFilter, deleleCompletedTask, completed }) => {
  return (
    <Stack mt={2} flexDirection={"row"} justifyContent={"space-between"}>
      <Box>
        <Button color="warning" variant="contained">
          Items left: {<span data-testid={"task-left-items"}>{completed}</span>}
        </Button>
      </Box>
      <Box>
        <Button data-testid={"task-all-button"} onClick={() => changeFilter(FilterType.all)} color="primary" variant="contained">
          All
        </Button>
      </Box>
      <Box>
        <Button data-testid={"task-active-button"} onClick={() => changeFilter(FilterType.active)} color="success" variant="contained">
          Active
        </Button>
      </Box>
      <Box>
        <Button data-testid={"task-completed-button"} onClick={() => changeFilter(FilterType.completed)} color="secondary" variant="contained">
          Completed
        </Button>
      </Box>{" "}
      <Box>
        <Button data-testid={"task-clear-all-button"} onClick={() => deleleCompletedTask()} color="error" variant="contained">
          Clear Completed
        </Button>
      </Box>
    </Stack>
  );
};
