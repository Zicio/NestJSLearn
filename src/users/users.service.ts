import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async findOne(id: number): Promise<UserDocument | undefined> {
    // eslint-disable-next-line no-underscore-dangle
    return this.userModel.findOne((user: UserDocument) => user._id === id);
  }

  async signUp(signUpDto): Promise<{ token: string }> {
    const { email, password, firstName, lastName } = signUpDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user: UserDocument = await this.userModel.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    const token = this.jwtService.sign({
      // eslint-disable-next-line no-underscore-dangle
      id: user._id,
      email,
      firstName,
    });
    return { token };
  }
}
