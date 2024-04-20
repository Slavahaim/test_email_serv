import express, { Request, Response } from "express";

import dotenv from "dotenv";
import bodyParser from 'body-parser';

dotenv.config();

const app = express();

const PORT = process.env.PORT

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', async (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Hello World'
  });
});

// app.get('/', (req: Request, res: Response) => {
//     res.status(200).send("Hello, World!!!!");
// })

app.listen(PORT, () => { 
    console.log("Server running at PORT: ", PORT); 
  }).on("error", (error) => {
    // gracefully handle error
    throw new Error(error.message);
  })