import 'reflect-metadata';
import * as bodyParser from 'body-parser';
import { interfaces, InversifyExpressServer, TYPE } from 'inversify-express-utils';
import { container } from '../src/config/ioc.container'; 
import cors from 'cors';
import cookieParser from 'cookie-parser';

import uploadRouter from "./file/upload.routes";

// create server
let server = new InversifyExpressServer(container);
server.setConfig((app) => {
  app.use(cors({
    origin: 'http://localhost:5001',
    credentials: true
  }))
  app.use(cookieParser());
  app.use("/upload", uploadRouter);

  // add body parser
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
});
 
let app = server.build();
app.listen(8099);