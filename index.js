import express from 'express';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import testRoute from './routes/testRoute.js';
import dotenv from 'dotenv';
dotenv.config();
import requestIp from 'request-ip';
import device from 'device';
import { attLimiter } from './middlewares/limiter.js';


// MongoDB connection

const app = express();

app.set('trust proxy', process.env.TRUST_PROXY_COUNT || 1);
// app.set('trust proxy', true);
// app.set('trust proxy', 1 /* number of proxies between user and server */)

// middlewares

const allowWildcardSubdomains = (origin, callback) => {
  return callback(null, true);
  // return callback(new Error('Not allowed by CORS'));
};
app.use(
  cors({
    optionsSuccessStatus: 200,
    // origin: allowWildcardSubdomains,
    // origin: '*', // put the frontend url only here
    origin: allowWildcardSubdomains, // put the frontend url only here
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(requestIp.mw());

// app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(compression());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/test', attLimiter, testRoute);
const serverName = process.env.SERVER_SOURCE || "Server name unknown. Set the SERVER_SOURCE environment variable to set the server name.";
app.get('/', (req, res) => {
  // res.send('WELCOME TO IP READER ',"your ip is",req.ip);
  // console.log(req.socket)
  res.send(`WELCOME TO IP READER,
    <h1>  ${serverName}</h1>
    <hr/> TRUST_PROXY_COUNT = ${process.env.TRUST_PROXY_COUNT}
    <hr/> req.ip= ${req.ip}
    <hr/> req.headers['x-forwarded-for'] = ${req.headers['x-forwarded-for']}
    <hr/> requestIp.getClientIp(req) = ${requestIp.getClientIp(req)}
    <hr/> req.clientIp = ${req.clientIp}
    <hr/> req.socket.address() = ${JSON.stringify(req.socket.address())}
    <hr/> req.socket.remoteAddress = ${req.socket.remoteAddress}
    <hr/> req.connection.remoteAddress = ${req.connection.remoteAddress}
    <hr/><hr/> User Agent => req.headers['user-agent'] = ${req.headers['user-agent']}
    <hr/> Device => ${JSON.stringify(device(req.headers['user-agent']))}
    `);


});

const port = process.env.APP_PORT || 3333;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
