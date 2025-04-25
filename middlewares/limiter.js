import rateLimit from 'express-rate-limit';


const limitMsg = {
  message:
    'Too many requests made from this IP, please try again in 30mins time',
  status: 429,
  success: false,
};


const attLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 min
  max: 5, // Limit each IP to 5 attempts per window (here, 1 min)
  message: limitMsg,
  standardHeaders: true, //Return rate limit info in the RateLimit - * headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  keyGenerator: (req, res) => {
    return req.clientIp // IP address from requestIp.mw(), as opposed to req.ip
  }
});



export { attLimiter };
