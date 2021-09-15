import bidController from '../controllers/bid.controller';
import bidValidator from '../validators/bid.validator';
import express, { IRouter } from 'express';
import { userAuth } from '../middlewares/auth.middleware';

class UserRoutes {
  private router = express.Router();
  private BidController = new bidController();
  private BidValidator = new bidValidator();

  constructor() {
    this.routes();
  }

  private routes = () => {
    this.router.post(
      '/',
      userAuth,
      this.BidValidator.placeBid,
      this.BidController.placeBid
    );
  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default UserRoutes;
