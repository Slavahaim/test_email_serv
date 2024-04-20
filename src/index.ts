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
    message: 'Hello World!'
  });
});


const start = async () => {
  try {
      app.listen(PORT, () => console.log(`Server started on port - ${PORT}`))
  } catch (error){
      console.error(error)
  }
}

start()