/* eslint-disable  @typescript-eslint/no-explicit-any */
import auctionService from '../services/auction.service';
import { Auction } from '../constants/auction.message';
import HttpStatus from 'http-status-codes';
import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import userService from '../services/user.service';

class AuctionController {
  public UserService = new userService();
  public AuctionService = new auctionService();

  /**
   * Controller to create new new auction
   * @param {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public createAuction = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      req.body.item.id = mongoose.Types.ObjectId();
      const data = await this.AuctionService.createAuction(req.body);
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: data,
        message: Auction.AUCTION_CREATED
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Controller to get all auctions
   * @param {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public getAllAuctions = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.AuctionService.getAllAuctions();
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: Auction.AUCTIONS_FETCHED
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Controller to get a single auction
   * @param {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public getAuction = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.AuctionService.getAuction(req.params._id);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: Auction.AUCTIONS_FETCHED
      });
    } catch (error) {
      next(error);
    }
  };
}

export default AuctionController;
