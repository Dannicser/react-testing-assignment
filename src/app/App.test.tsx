import "@testing-library/jest-dom";

import { screen, render, fireEvent } from "@testing-library/react";

import App from "./App";

describe("App", () => {
  test("add one task", () => {
    render(<App />);

    const inputValue = "i love coding";
    const input = screen.getByTestId("task-input");
    const button = screen.getByTestId("task-button");
    fireEvent.change(input, {
      target: {
        value: inputValue,
      },
    });

    expect(input).toHaveValue(inputValue);
    fireEvent.submit(button);
    expect(screen.getByTestId("task-item-0-ACTIVE")).toBeInTheDocument();
  });

  test("add one task and delete", () => {
    render(<App />);

    const inputValue = "i love coding";
    const input = screen.getByTestId("task-input");
    const button = screen.getByTestId("task-button");
    fireEvent.change(input, {
      target: {
        value: inputValue,
      },
    });
    expect(input).toHaveValue(inputValue);
    fireEvent.submit(button);
    expect(screen.getByTestId("task-item-0-ACTIVE")).toBeInTheDocument();
    const deleteButton = screen.getByTestId("task-delete-button-0");
    fireEvent.click(deleteButton);
    expect(screen.queryByTestId("task-item-0-ACTIVE")).not.toBeInTheDocument();
  });

  test("add one task and change its status", () => {
    render(<App />);

    const inputValue = "i love coding";
    const input = screen.getByTestId("task-input");
    const button = screen.getByTestId("task-button");
    fireEvent.change(input, {
      target: {
        value: inputValue,
      },
    });

    expect(input).toHaveValue(inputValue);
    fireEvent.submit(button);
    expect(screen.getByTestId("task-item-0-ACTIVE")).toBeInTheDocument();
    const checkbox = screen.getByTestId("task-checkbox-0");
    fireEvent.click(checkbox);
    expect(screen.getByTestId("task-item-0-COMPLETED")).toBeInTheDocument();
  });

  test("check items left", () => {
    render(<App />);

    const inputValues = ["go to the gym", "wash the car", "take out the trash"];
    const input = screen.getByTestId("task-input");
    const addButton = screen.getByTestId("task-button");

    inputValues.map((value) => {
      fireEvent.change(input, {
        target: {
          value,
        },
      });
      fireEvent.submit(addButton);
    });

    const leftItems = screen.getByTestId("task-left-items");
    expect(leftItems).toHaveTextContent(inputValues.length.toString());

    inputValues.map((value, i) => {
      const checkbox = screen.getByTestId(`task-checkbox-${i}`);
      fireEvent.click(checkbox);
    });

    expect(leftItems).toHaveTextContent("0");
  });

  test("clear completed tasks", () => {
    render(<App />);

    const inputValues = ["go to the gym", "wash the car", "take out the trash"];
    const input = screen.getByTestId("task-input");
    const addButton = screen.getByTestId("task-button");

    inputValues.map((value) => {
      fireEvent.change(input, {
        target: {
          value,
        },
      });
      fireEvent.submit(addButton);
    });

    inputValues.map((value, i) => {
      const checkbox = screen.getByTestId(`task-checkbox-${i}`);
      fireEvent.click(checkbox);
    });

    const clearAllBtn = screen.getByTestId("task-clear-all-button");

    fireEvent.click(clearAllBtn);

    inputValues.map((value, i) => {
      expect(screen.queryByTestId(`task-item-${i}-COMPLETED`)).not.toBeInTheDocument();
    });
  });

  test("filter tasks by all", () => {
    render(<App />);

    const inputValues = ["go to the gym", "wash the car", "take out the trash"];
    const input = screen.getByTestId("task-input");
    const addButton = screen.getByTestId("task-button");

    inputValues.map((value) => {
      fireEvent.change(input, {
        target: {
          value,
        },
      });
      fireEvent.submit(addButton);
    });

    inputValues.map((value, i) => {
      const checkbox = screen.getByTestId(`task-checkbox-${i}`);
      fireEvent.click(checkbox);
    });

    const filterActiveBtn = screen.getByTestId("task-active-button");
    fireEvent.click(filterActiveBtn);

    const filterAllBtn = screen.getByTestId("task-all-button");
    fireEvent.click(filterAllBtn);

    inputValues.map((value, i) => {
      expect(screen.queryByTestId(`task-item-${i}-COMPLETED`)).toBeInTheDocument();
    });
  });

  test("filter tasks by completed", () => {
    render(<App />);

    const inputValues = ["go to the gym", "wash the car", "take out the trash"];
    const input = screen.getByTestId("task-input");
    const addButton = screen.getByTestId("task-button");

    inputValues.map((value) => {
      fireEvent.change(input, {
        target: {
          value,
        },
      });
      fireEvent.submit(addButton);
    });

    const filterCompletedBtn = screen.getByTestId("task-completed-button");
    fireEvent.click(filterCompletedBtn);

    inputValues.map((value, i) => {
      expect(screen.queryByTestId(`task-item-${i}-ACTIVE`)).not.toBeInTheDocument();
    });
  });

  test("filter tasks by active", () => {
    render(<App />);

    const inputValues = ["go to the gym", "wash the car", "take out the trash"];
    const input = screen.getByTestId("task-input");
    const addButton = screen.getByTestId("task-button");

    inputValues.map((value) => {
      fireEvent.change(input, {
        target: {
          value,
        },
      });
      fireEvent.submit(addButton);
    });

    const filterCompletedBtn = screen.getByTestId("task-completed-button");
    fireEvent.click(filterCompletedBtn);

    const filterActiveBtn = screen.getByTestId("task-active-button");
    fireEvent.click(filterActiveBtn);

    inputValues.map((value, i) => {
      expect(screen.queryByTestId(`task-item-${i}-ACTIVE`)).toBeInTheDocument();
    });
  });
});
