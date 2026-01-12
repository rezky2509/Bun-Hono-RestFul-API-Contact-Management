import { rateLimiter } from "hono-rate-limiter"

const limiter = rateLimiter({
  windowMs: 60 * 1000,
  limit: 10,
  standardHeaders: 'draft-6',
  keyGenerator: (c)=>c.req.header('x-forwarded-for') || c.req.header('remote-addr') || 'anonymous',
  handler: (c)=>{
    return c.text('Too many request. Try again later',429)
  }
})

export default limiter