import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOne(id: string): Promise<any> {
    return this.userModel.findById(id);
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async create(user: User): Promise<UserDocument> {
    const checkUnique = await this.userModel.exists({ email: user.email });
    if (checkUnique) {
      throw new ConflictException('User already exist');
    }
    const newUser = await new this.userModel(user);
    await newUser.save();
    return newUser;
  }
}
