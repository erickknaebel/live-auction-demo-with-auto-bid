import Joi from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';
import HttpStatus from 'http-status-codes';

class AuctionValidator {
  public newAuctionItem = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    const schema = Joi.object({
      currentBid: Joi.number().min(0).required(),
      reservationPrice: Joi.number().min(1).required(),
      item: Joi.object({
        id: Joi.string().required(),
        description: Joi.string().min(1).max(255).required()
      }),
      currentWinner: [Joi.string().optional, Joi.allow(null)]
    });
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        data: req.body,
        message: error.details[0].message
      });
      next(error);
    }
    next();
  };
}

export default AuctionValidator;
