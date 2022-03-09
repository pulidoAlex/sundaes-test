import { rest } from "msw";

export const handlers = [
  rest.get("http://localhost:3030/scoops", (req, resp, ctx) => {
    return resp(
      ctx.json([
        {
          name: "chocolate",
          imagePath: "/images/chocolate.png",
        },
        {
          name: "vanilla",
          imagePath: "/images/vanilla.png",
        },
      ])
    );
  }),
  rest.get("http://localhost:3030/toppings", (req, resp, ctx) => {
    return resp(
      ctx.json([
        { name: "Cherries", imagePath: "/images/cherries.png" },
        { name: "M&M", imagePath: "/images/m-and-ms.png" },
        { name: "Hot fudge", imagePath: "/images/hot-fudge.png" },
      ])
    );
  }),
];
