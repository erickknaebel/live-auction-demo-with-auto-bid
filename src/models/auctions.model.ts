import { IAuction } from '../interfaces/auction.interface';
import { Schema, model, Types } from 'mongoose';

const userSchema = new Schema(
  {
    currentBid: {
      type: Number,
      required: true,
      maxlength: 9999
    },
    currentWinner: {
      type: String,
      nullable: true
    },
    reservationPrice: {
      type: Number,
      required: true,
      minlength: 1,
      maxlength: 9999
    },
    item: {
      id: {
        type: Types.ObjectId,
        required: true
      },
      description: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 255
      }
    }
  },
  {
    timestamps: true
  }
);

export default model<IAuction>('Auction', userSchema);
