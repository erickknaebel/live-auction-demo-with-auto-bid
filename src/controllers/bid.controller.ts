/* eslint-disable  @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
import bidService from '../services/bid.service';

class BidController {
  public BidService = new bidService();

  /**
   * Controller to place a bid
   * @param {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public placeBid = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      await this.BidService.placeBid(req.body, res);
    } catch (error) {
      next(error);
    }
  };
}

export default BidController;
