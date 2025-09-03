import { Request, Response, NextFunction } from 'express';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '10 s'),
});

const rateLimiter = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const identifier = req.ip || 'anonymous';
    const { success } = await ratelimit.limit(identifier);

    if (!success) {
      res.status(429).json({ message: 'Too many requests' });
      return;
    }

    next();
  } catch (error) {
    console.error('Rate limiter error:', error);
    next();
  }
};

export default rateLimiter;
