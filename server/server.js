import express from 'express'
import session from 'express-session';
import userRoutes  from "./routes/user.routes.js"
import uploadRoute  from "./routes/upload.route.js"
import downloadRoute  from "./routes/download.route.js"
import cookieParser from 'cookie-parser';
import mysql from 'mysql2'
import fs from 'fs'
import connection from './connection.js'
import cors from 'cors';
// import { createTables } from './createTables.js';
// import { insertRecords } from './seeder.js';
const app = express();
const port = 3000

app.use(express.json());
app.use(cookieParser());
app.use(cors());




app.use(session({
  secret: 'haseeb7864',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));


app.use("/api/user", userRoutes);
app.use("/api/upload", uploadRoute);
app.use("/api/download", downloadRoute);


// createTables();
// insertRecords();


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})