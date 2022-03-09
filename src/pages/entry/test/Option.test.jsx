import { render, screen } from "../../../testUtils/testing-library-utils";
import Option from "../Options";

test("should display the image for each oftion sent by the server", async () => {
  render(<Option optionType="scoops" />);

  // find images always with finAll when  is async
  const scoopImg = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImg).toHaveLength(2);

  // confirm al text
  // ignore tsc

  const altText = scoopImg.map((text) => text.alt);
  expect(altText).toEqual(["chocolate scoop", "vanilla scoop"]);
});

test("displays image for each option from server", async () => {
  render(<Option optionType="toppings" />);

  // find images
  const img = await screen.findAllByRole("img", { name: /topping$/i });
  expect(img).toHaveLength(3);

  // checking the alt name for the fetched images

  const altNames = img.map((img) => img.alt);
  expect(altNames).toEqual([
    "Cherries topping",
    "M&M topping",
    "Hot fudge topping",
  ]);
});
