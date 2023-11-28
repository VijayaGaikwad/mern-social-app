/* eslint-disable no-undef */
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import AuthRoute from './Routes/AuthRoute.js';
import UserRoute from './Routes/UserRoute.js';
import PostRoute from './Routes/PostRoute.js';
import UploadRoute from "./Routes/UploadRoute.js";
import path  from "path";

const __dirname = path.resolve();
const PORT = process.env.PORT || 5000;

// Routes

const app = express();
app.use(express.static("public"))
app.use('/images', express.static("images"))


// Middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

dotenv.config();


mongoose
  .connect("mongodb+srv://flexxit:flexxit@flexxit.gw2tzph.mongodb.net/SocialMedia?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Listening at ${PORT}`)
    )
  )
  .catch((error) => console.log(error));


  // usage of routes
  app.use('/auth', AuthRoute)
  app.use('/user', UserRoute)
  app.use('/post', PostRoute)
  app.use('/upload', UploadRoute)


  app.get('*', function (_, res) {
      res.sendFile(path.join(__dirname, "./client/build/index.html")
      , function(err){
        res.status(500).send(err);
      }
      )
    });