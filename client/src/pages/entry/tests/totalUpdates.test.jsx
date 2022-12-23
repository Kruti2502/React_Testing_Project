import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderEntry from "../OrderEntry";

test("update scoop subtotal when scoops change", async () => {
  render(<Options optionType="scoops" />);

  const scoopsSubtotal = screen.getByText("Scoops total: ₹", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent("0.0");

  // add vanilla - 50
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await userEvent.clear(vanillaInput);
  await userEvent.type(vanillaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("50.0");

  // 2 chocolate - 150
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  await userEvent.clear(chocolateInput);
  await userEvent.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("150.0");
});

test("update toppings subtotal when toppings change", async () => {
  const user = userEvent.setup();
  render(<Options optionType="toppings" />);

  const toppingsTotal = screen.getByText("Toppings total: ₹", { exact: false });
  expect(toppingsTotal).toHaveTextContent("0.0");

  // add topping - 20
  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  await user.click(cherriesCheckbox);
  expect(toppingsTotal).toHaveTextContent("20.0");

  // add another topping - 40
  const hotFudgeCheckbox = screen.getByRole("checkbox", { name: "Hot fudge" });
  await user.click(hotFudgeCheckbox);
  expect(toppingsTotal).toHaveTextContent("40.0");

  // remove topping - 20
  await user.click(hotFudgeCheckbox);
  expect(toppingsTotal).toHaveTextContent("20.0");
});

describe("grand total", () => {
  test("grand total updates properly if scoop is added first", async () => {
    const user = userEvent.setup();

    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", { name: /Grand total: \₹/ });
    expect(grandTotal).toHaveTextContent("0.0");

    // add 2 scoops - 100
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");
    expect(grandTotal).toHaveTextContent("100.0");

    // add topping - 120
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    await user.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent("120.0");
  });

  test("grand total updates properly if topping is added first", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", { name: /Grand total: \₹/ });

    // add topping - 20
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    await user.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent("20.0");

    // add 2 scoops - 120
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");
    expect(grandTotal).toHaveTextContent("120.0");
  });

  test("grand total updates properly if item is removed", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);

    // add cherries - 20
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    await user.click(cherriesCheckbox);

    // add 2 scoops - 120
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");

    // remove 1 scoop - 70
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");

    const grandTotal = screen.getByRole("heading", { name: /Grand total: \₹/ });
    expect(grandTotal).toHaveTextContent("70.0");

    // remove cherries - 50
    await user.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent("50.0");
  });
});

