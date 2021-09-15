import Joi from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';
import HttpStatus from 'http-status-codes';

class BidValidator {
  public placeBid = (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
      auctionId: Joi.string().required(),
      initialBid: Joi.number().min(1).max(9999).required(),
      maxAutoBidAmount: Joi.allow(null).when('initialBid', {
        is: Joi.number(),
        then: Joi.number().greater(Joi.ref('initialBid'))
      }),
      bidderId: Joi.string().min(1).required()
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

export default BidValidator;
