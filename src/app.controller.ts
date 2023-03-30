import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { SignUpDto } from './auth/dto/signUp.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Post('users/signup')
  async login(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }
}
