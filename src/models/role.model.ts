import { IRole } from '../interfaces/role.interface';
import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50
    },
    roles: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50
    }
  },
  {
    timestamps: true
  }
);

export default model<IRole>('Role', userSchema);
