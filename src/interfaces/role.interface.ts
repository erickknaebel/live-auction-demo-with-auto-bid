import { Document } from 'mongoose';

export interface IRole extends Document {
  userId: string | number;
  roles: string;
}
