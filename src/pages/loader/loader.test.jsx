import { render, screen, waitFor } from "@testing-library/react";
import Loader from "./loader";

test("should display loading and after the promise is done should say loaded", async () => {
  render(<Loader />);

  await waitFor(() => {
    expect(screen.getByText(/Loaded!/)).toBeInTheDocument();
  });
});

test("should display loading", async () => {
  render(<Loader />);

  expect(screen.getByText(/Loading.../)).toBeInTheDocument();
});
