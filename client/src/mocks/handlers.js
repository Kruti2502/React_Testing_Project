import { rest } from "msw";

//mocks because tests don't have servers
export const handlers = [
  rest.get("http://localhost:3030/scoops", (req, res, ctx) => {
    return res(
      ctx.json([
        { name: "Chocolate", imagePath: "/assests/chocolate.png" },
        { name: "Vanilla", imagePath: "/assests/vanilla.png" },
      ])
    );
  }),
  rest.get("http://localhost:3030/toppings", (req, res, ctx) => {
    return res(
      ctx.json([
        { name: "Cherries", imagePath: "/assests/cherries.png" },
        { name: "M&Ms", imagePath: "/assests/m-and-ms.png" },
        { name: "Hot fudge", imagePath: "/assests/hot-fudge.png" },
      ])
    );
  }),
  rest.post("http://localhost:3030/order", (req, res, ctx) => {
    return res(ctx.json({ orderNumber: 123455676 }));
  }),
];
