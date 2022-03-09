import { render, screen } from "../../../testUtils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderEntry from "../OrderEntry";

test("update scoop subtotal when scoops change", async () => {
  render(<Options optionType="scoops" />);

  // make sure total starts out $0.00
  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  // update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "vanilla",
  });

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00");

  // update chocolate scoops to 2 and check subtotal
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "chocolate",
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});

test("update toppings subtotal when toppings change", async () => {
  render(<Options optionType="toppings" />);

  // asserting default opping subtotal
  const toppingsSubtotal = screen.getByText("Toppings total: $", {
    exact: false,
  });
  expect(toppingsSubtotal).toHaveTextContent("0.00");

  const mmCheckbox = await screen.findByRole("checkbox", { name: "M&M" });
  userEvent.click(mmCheckbox);
  expect(mmCheckbox).toBeChecked();
  expect(toppingsSubtotal).toHaveTextContent("1.50");

  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  userEvent.click(cherriesCheckbox);
  expect(cherriesCheckbox).toBeChecked();
  expect(toppingsSubtotal).toHaveTextContent("3.00");

  userEvent.click(cherriesCheckbox);
  expect(cherriesCheckbox).not.toBeChecked();
  expect(toppingsSubtotal).toHaveTextContent("1.50");
});

describe("grand total", () => {
  test("grand total updates if scoop is added first", async () => {
    render(<OrderEntry />);

    const scoop = await screen.findByRole("spinbutton", { name: "chocolate" });
    const grandTotal = screen.getByText("Grand total: $", { exact: false });

    expect(grandTotal).toHaveTextContent("0.00");

    userEvent.clear(scoop);
    userEvent.type(scoop, "1");
    expect(grandTotal).toHaveTextContent("2.00");

    const topping = await screen.findByRole("checkbox", { name: "Cherries" });
    userEvent.click(topping);
    expect(topping).toBeChecked();
    expect(grandTotal).toHaveTextContent("3.50");
  });

  test("grand total updates if topping is added first", async () => {
    render(<OrderEntry />);

    const topping = await screen.findByRole("checkbox", { name: "Cherries" });
    const grandTotal = screen.getByText("Grand total: $", { exact: false });
    userEvent.click(topping);
    expect(topping).toBeChecked();
    expect(grandTotal).toHaveTextContent("1.50");

    const scoop = await screen.findByRole("spinbutton", { name: "vanilla" });
    userEvent.clear(scoop);
    userEvent.type(scoop, "3");
    expect(grandTotal).toHaveTextContent("7.50");
  });

  test("grand total updates if item is removed", async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByText("Grand total: $", { exact: false });

    const topping = await screen.findByRole("checkbox", { name: "Cherries" });
    userEvent.click(topping);
    expect(topping).toBeChecked();
    expect(grandTotal).toHaveTextContent("1.50");

    const scoop = await screen.findByRole("spinbutton", { name: "vanilla" });
    userEvent.clear(scoop);
    userEvent.type(scoop, "2");

    userEvent.clear(scoop);
    userEvent.type(scoop, "1");

    expect(grandTotal).toHaveTextContent("3.50");

    userEvent.click(topping);
    expect(grandTotal).toHaveTextContent("2.00");
  });
});
