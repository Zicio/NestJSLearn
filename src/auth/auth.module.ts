import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY || 'secret',
      signOptions: {
        expiresIn: '60s',
      },
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
