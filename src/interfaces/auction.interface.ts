import { Types } from 'mongoose';
import { Document } from 'mongoose';

export interface IAuction extends Document {
  currentBid: number;
  currentWinner: string;
  highestBidder: string;
  reservationPrice: number;
  item: {
    id: Types.ObjectId;
    description: string;
  };
}
