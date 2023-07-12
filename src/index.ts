import express, { json, Request, Response } from "express";
import dotenv from "dotenv";

import fruitsRouter from "./routers/fruits-router";

dotenv.config();

export const app = express();
app.use(json());

app.get("/health", async (req: Request, res: Response) => res.status(200).send({message: "ok!"}));
app.use(fruitsRouter);


const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});