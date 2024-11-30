// src/middlewares/requestLogger.middleware.ts
import {NextFunction, Request, Response} from 'express'
import logger from '../utils/logger'

export const requestLoggerMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  logger.info(`${req.method} ${req.path}`)
  next()
}
