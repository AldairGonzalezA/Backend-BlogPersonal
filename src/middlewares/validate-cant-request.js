import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 500,
    message:{
        success:false,
        msg: 'Too many requests from this IP, please try again after 15 minutes'
    }
})

export default limiter;