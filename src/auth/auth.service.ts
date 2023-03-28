import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from '../users/schemas/user.schema';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // async validateUser(id: number): Promise<any> {
  //   const user = await this.userModel.findOne(id);
  //   if (user) {
  //     return user;
  //   }
  //   return null;
  // }

  createToken(payload: UserDocument) {
    const { id, email, firstName } = payload;
    return this.jwtService.sign({
      id,
      email,
      firstName,
    });
  }
}
