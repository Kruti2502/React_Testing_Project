import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";

test("displays image for each scoop option from server", async () => {
  render(<Options optionType="scoops" />);

  // find images
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  // check alt text of images
  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("Displays image for each toppings option from server", async () => {
  // msw will return three toppings from server
  render(<Options optionType="toppings" />);

  // find images, expect 3 based on msw returns
  const images = await screen.findAllByRole("img", { name: /topping$/i }); // Here, "$"" means topping will be in the end
  expect(images).toHaveLength(3);

  const imageTitles = images.map((img) => img.alt);
  expect(imageTitles).toEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot fudge topping",
  ]);
});

test("don't update total if scoops input is invalid", async () => {
  const user = userEvent.setup();
  render(<Options optionType="scoops" />);

  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });

  const scoopsSubtotal = screen.getByText("Scoops total: ₹0.0");

  // clear the input
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "3.5");
  expect(scoopsSubtotal).toHaveTextContent("₹0.0");

  await user.clear(vanillaInput);
  await user.type(vanillaInput, "-2");
  expect(scoopsSubtotal).toHaveTextContent("₹0.0");
});
