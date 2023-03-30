import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { SignUpDto } from './dto/signUp.dto';
import { UserDocument } from '../users/schemas/user.schema';
import { SignInDto } from './dto/singIn.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(id: string): Promise<any> {
    const user = await this.usersService.findOne(id);
    if (user) {
      return user;
    }
    return null;
  }

  async createToken(user: UserDocument) {
    const payload = {
      // eslint-disable-next-line no-underscore-dangle
      id: user._id,
      email: user.email,
      firstName: user.firstName,
    };
    const token = this.jwtService.sign(payload);
    return {
      token,
    };
  }

  async signUp(signUpDto: SignUpDto) {
    const { email, password, firstName, lastName } = signUpDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.usersService.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });
    return newUser;
  }

  async signIn(signInDto: SignInDto) {
    const user: UserDocument = await this.usersService.findByEmail(
      signInDto.email,
    );
    const isValidPassword = await bcrypt.compare(
      signInDto.password,
      user.password,
    );
    if (!user || !isValidPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.createToken(user);
  }
}
