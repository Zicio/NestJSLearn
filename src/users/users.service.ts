import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOne(id: string): Promise<any> {
    // eslint-disable-next-line no-underscore-dangle
    return this.userModel.findOne((user: UserDocument) => user._id === id);
  }

  async create(user: User) {
    const checkUnique = await this.userModel.exists(
      (userInDB: UserDocument) => userInDB.email === user.email,
    );
    if (checkUnique) {
      throw new ConflictException('User already exist');
    }
    const newUser = await new this.userModel(user);
    return newUser.save();
  }
}
