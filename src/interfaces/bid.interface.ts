import { Document } from 'mongoose';

export interface IBid extends Document {
  auctionId: string;
  initialBid: number;
  maxAutoBidAmount: number | null;
  bidderId: string;
}

export interface IAutoBid {
  id: string;
  bid: number;
  currentWinner: string;
}
