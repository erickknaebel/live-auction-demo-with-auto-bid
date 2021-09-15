import auctionRoute from './auction.route';
import bidRoute from './bid.route';
import express, { IRouter } from 'express';
import userRoute from './user.route';

const router = express.Router();

/**
 * Function contains Application routes
 * @returns router
 */
const routes = (): IRouter => {
  router.get('/', (req, res) => {
    res.json('Welcome');
  });
  router.use('/account', new userRoute().getRoutes());
  router.use('/auctions', new auctionRoute().getRoutes());
  router.use('/bid', new bidRoute().getRoutes());

  return router;
};

export default routes;
