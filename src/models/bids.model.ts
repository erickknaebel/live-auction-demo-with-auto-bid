import { IBid } from '../interfaces/bid.interface';
import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    auctionId: {
      type: String,
      required: true
    },
    initialBid: {
      type: Number,
      required: true,
      minlength: 1,
      maxlenth: 9999
    },
    maxAutoBidAmount: {
      type: Number,
      required: false,
      minlength: 1,
      maxlength: 9999,
      nullable: true
    },
    bidderId: {
      type: String,
      required: true,
      minlength: 1
    }
  },
  {
    timestamps: true
  }
);

export default model<IBid>('Bids', userSchema);
