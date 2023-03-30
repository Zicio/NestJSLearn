import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignUpDto } from '../auth/dto/signUp.dto';

@Controller()
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<any> {
    return this.usersService.signUp(signUpDto);
  }
}
