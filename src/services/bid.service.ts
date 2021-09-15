/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import Bids from '../models/bids.model';
import { Error as Errors } from '../constants/error.messages';
import { IBid } from '../interfaces/bid.interface';
import { IAuction } from '../interfaces/auction.interface';
import auctionService from './auction.service';
import { Response } from 'express';
import HttpStatus from 'http-status-codes';
import { Bid } from '../constants/bid.messages';

class BidService {
  private AuctionService = new auctionService();
  private auction: IAuction;
  private highestBidder: IBid;
  private data: IBid;
  /**
   * Service method to register a new bid
   * @param {Object} body
   * @returns an object containing the new bid
   */
  public placeBid = async (body: IBid, res: Response): Promise<void> => {
    try {
      try {
        this.auction = await this.AuctionService.getAuction(body.auctionId);
      } catch {
        res.status(HttpStatus.NOT_FOUND).json({
          code: HttpStatus.NOT_FOUND,
          message: Bid.INVALID_AUCTION
        });
        throw 'Invalid Auction Id';
      }
      try {
        this.highestBidder = await this.findHighestBidder(body.auctionId);
      } catch {
        this.highestBidder = undefined;
      } finally {
        try {
          const bid = {
            id: body.auctionId,
            bid: body.initialBid,
            currentWinner: body.bidderId
          };
          if (this.highestBidder === undefined) {
            await this.AuctionService.updateAuction(bid);
            this.data = await this.createBid(body);
          } else {
            if (body.initialBid > this.auction.currentBid) {
              await this.AuctionService.updateAuction(bid);
              this.data = await this.createBid(body);
              await this.getAutoBids(body);
            } else {
              res.status(HttpStatus.NOT_ACCEPTABLE).json({
                code: HttpStatus.NOT_ACCEPTABLE,
                message: Bid.BID_MUST_HIGHER
              });
            }
          }
        } catch {
          throw new Error(Errors.TRANSACTION_FAILED);
        }
      }
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: this.data,
        message: Bid.BID_PLACED
      });
    } catch (error) {
      throw new Error(Errors.TRANSACTION_FAILED);
    }
  };

  public findHighestBidder = async (id: string): Promise<IBid> => {
    const data = await Bids.find({
      auctionId: id
    })
      .sort({ maxAutoBidAmount: -1 })
      .limit(1);

    return data[0];
  };

  /**
   * Method to create a new auction bid
   * @param {Interface} IBid
   * @returns The newly created bid docuemnt
   */
  public createBid = async (bid: IBid): Promise<IBid> => {
    return await Bids.create(bid);
  };

  /**
   * Method to increase the current bid based on the maxium auto
   * bid of any given user.
   * @param {IBid} bid
   */
  public getAutoBids = async (bid: IBid): Promise<void> => {
    const autoBid = {
      id: this.auction._id,
      bid: bid.initialBid + 1,
      currentWinner: this.highestBidder.bidderId
    };

    if (this.highestBidder.maxAutoBidAmount > bid.maxAutoBidAmount) {
      autoBid['bid'] = bid.maxAutoBidAmount + 1;
    }

    if (this.highestBidder.maxAutoBidAmount < bid.maxAutoBidAmount) {
      autoBid['bid'] = this.highestBidder.maxAutoBidAmount + 1;
      autoBid['currentWinner'] = bid.bidderId;
    }

    if (this.highestBidder.maxAutoBidAmount === bid.maxAutoBidAmount) {
      autoBid['bid'] = this.highestBidder.maxAutoBidAmount;
    }

    await this.AuctionService.updateAuction(autoBid);
  };
}

export default BidService;
