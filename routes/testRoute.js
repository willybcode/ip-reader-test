import express from 'express';
import requestIp from 'request-ip';
import device from 'device';

const router = express.Router();


const test1 = async (req, res) => {

    return res.json({ test: "test1" });
}
const test2 = async (req, res) => {

    return res.json({
        test: "test2",
        id: req.params.id
    });
}
const limited = async (req, res) => {
    // console.log(req);

    console.log(`WELCOME TO IP READER, your ip is`);
    console.log(`req.ip= ${req.ip}`);
    console.log(`requestIp.getClientIp(req) = ${requestIp.getClientIp(req)}`);
    console.log(`req.clientIp = ${req.clientIp}`);
    console.log(`req.socket.address() = ${JSON.stringify(req.socket.address())}`);
    console.log(`req.connection.remoteAddress = ${req.connection.remoteAddress}`);
    console.log('');
    console.log('User Agent => req.headers[\'user-agent\'] =', req.headers['user-agent']);
    console.log('Device =>', JSON.stringify(device(req.headers['user-agent'])));

    return res.json({ test: "limited" });
}

router.get('/test', test1);
router.get('/test/:id', test2);
router.get('/limited', limited);


export default router;
