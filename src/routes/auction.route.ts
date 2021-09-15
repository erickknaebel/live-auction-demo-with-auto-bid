import auctionController from '../controllers/auction.controller';
import auctionValidator from '../validators/auction.validator';
import express, { IRouter } from 'express';
import { userAuth } from '../middlewares/auth.middleware';

class AuctionRoutes {
  private router = express.Router();
  private AuctionController = new auctionController();
  private AuctionValidator = new auctionValidator();

  constructor() {
    this.routes();
  }

  private routes = () => {
    this.router.get('/', userAuth, this.AuctionController.getAllAuctions);

    this.router.get('/:_id', userAuth, this.AuctionController.getAuction);

    this.router.post(
      '/',
      userAuth,
      this.AuctionValidator.newAuctionItem,
      this.AuctionController.createAuction
    );
  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default AuctionRoutes;
