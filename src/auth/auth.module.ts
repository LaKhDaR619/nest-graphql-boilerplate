import { Module, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import JWTConfig from '../config/jwtConfig';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './passport/jwt.strategy';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.registerAsync(JWTConfig),
  ],
  providers: [AuthService, JwtStrategy, AuthResolver],
})
export class AuthModule {}
