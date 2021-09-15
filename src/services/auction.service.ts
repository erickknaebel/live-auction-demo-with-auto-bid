/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import Auction from '../models/auctions.model';
import { Error as Errors } from '../constants/error.messages';
import { IAuction } from '../interfaces/auction.interface';
import { IAutoBid } from '../interfaces/bid.interface';

class AuctionService {
  /**
   * Service method to register a new auction
   * @param {Object} body
   * @returns an object containing the new auction
   */
  public createAuction = async (body: IAuction): Promise<IAuction> => {
    try {
      console.log(body);
      const data = await Auction.create(body);
      return data;
    } catch (error) {
      throw new Error(Errors.TRANSACTION_FAILED);
    }
  };

  /**
   * Service method to get all the auctions
   * @returns a list of all auctions
   */
  public getAllAuctions = async (): Promise<IAuction[]> => {
    const data = await Auction.find();
    return data;
  };

  /**
   * Service method to get a single auction
   * @param {String} _id
   * @returns an object containing an auction
   */
  public getAuction = async (_id: string): Promise<IAuction> => {
    const data = await Auction.findById(_id);
    return data;
  };

  /**
   * Service mehtod to update the current price of an auction
   * @param {Object}
   * @returns an auction object with the updated auction bid
   */
  public updateAuction = async (auctionData: IAutoBid): Promise<IAuction> => {
    const data = await Auction.findOneAndUpdate(
      { _id: auctionData.id },
      {
        $set: {
          currentBid: auctionData.bid,
          currentWinner: auctionData.currentWinner
        }
      }
    );
    return data;
  };
}

export default AuctionService;
