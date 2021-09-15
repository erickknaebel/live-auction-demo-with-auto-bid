/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import crypt from 'bcrypt';
import { Error as Errors } from '../constants/error.messages';
import { IRole } from '../interfaces/role.interface';
import { IUser } from '../interfaces/user.interface';
import Role from '../models/role.model';
import User from '../models/user.model';
import userToken from '../middlewares/token.middleware';

class UserService {
  private UserToken = new userToken();

  /**
   * Service method to login the user in
   * @param {Object} body
   * @returns an object containing the user
   */
  public loginUser = async (body: IUser): Promise<IUser> => {
    const data = await User.findOne({ email: body.email });
    if (!data) {
      return null;
    } else {
      if (await crypt.compare(body.password, data.password)) {
        data.token = this.UserToken.generate(body);
        return data;
      } else {
        return null;
      }
    }
  };

  /**
   * Service method to register a new user
   * @param {Object} body
   * @returns an object containing the new user
   */
  public registerUser = async (body: IUser): Promise<IUser> => {
    const user = await User.findOne({ email: body.email });
    if (!user) {
      body.password = await crypt.hash(body.password, 10);
      try {
        const user = await User.create(body);
        await Role.create({ userId: user._id, roles: 'USER' });
        return user;
      } catch (error) {
        throw new Error(Errors.TRANSACTION_FAILED);
      }
    } else {
      return null;
    }
  };

  /**
   * Service method to get all the users
   * @returns a list of all users
   */
  public getAllUsers = async (): Promise<IUser[]> => {
    const data = await User.find();
    return data;
  };

  /**
   * Service method to get the current user
   * @param {String} _id
   * @returns an object containing the current user
   */
  public getUser = async (_id: string): Promise<IUser> => {
    const data = await User.findById(_id);
    return data;
  };

  /**
   * Service method to update information of the current user
   * @param {String} _id
   * @param {Object} body
   * @returns an object of the updated user data
   */
  public updateUser = async (_id: string, body: IUser): Promise<IUser> => {
    const data = await User.findByIdAndUpdate(
      {
        _id
      },
      body,
      {
        new: true
      }
    );
    return data;
  };

  /**
   * Service method to update information of the current user
   * @param {String} _id
   * @returns an empty string
   */
  public deleteUser = async (_id: string): Promise<string> => {
    await User.findByIdAndDelete(_id);
    return '';
  };

  /**
   * Service method to update information of the current user
   * @param {String} _id
   * @returns a object containing all the roles associeated to
   * a given user
   */
  public getUserRoles = async (_id: string): Promise<IRole> => {
    const data = await Role.findOne({ userId: { $eq: _id } });
    return data;
  };
}

export default UserService;
