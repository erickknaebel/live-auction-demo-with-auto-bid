import express, { IRouter } from 'express';
import { userAuth } from '../middlewares/auth.middleware';
import userController from '../controllers/user.controller';
import userValidator from '../validators/user.validator';

class UserRoutes {
  private router = express.Router();
  private UserController = new userController();
  private UserValidator = new userValidator();

  constructor() {
    this.routes();
  }

  private routes = () => {
    this.router.get('/', userAuth, this.UserController.getAllUsers);

    this.router.post(
      '/login',
      this.UserValidator.existingUser,
      this.UserController.loginUser
    );

    this.router.post(
      '/register',
      this.UserValidator.newUser,
      this.UserController.registerUser
    );

    this.router.get('/:_id', userAuth, this.UserController.getUser);

    this.router.put('/:_id', userAuth, this.UserController.updateUser);

    this.router.delete('/:_id', userAuth, this.UserController.deleteUser);

    this.router.get('/:_id/roles', userAuth, this.UserController.getUserRoles);
  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default UserRoutes;
