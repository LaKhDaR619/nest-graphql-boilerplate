import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { User as CurrentUser } from '../users/users.decorator';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation()
  async register(@Args('registerDto') registerDto: RegisterDto): Promise<User> {
    return this.authService.register(registerDto);
  }

  @Mutation()
  async login(
    @Args('loginDto') loginDto: LoginDto,
  ): Promise<{ access_token: string }> {
    return this.authService.login(loginDto);
  }

  @Query()
  @UseGuards(GqlAuthGuard)
  async currentUser(
    @CurrentUser() user: { userId: string; username: string },
  ): Promise<User> {
    return this.authService.currentUser(user.userId);
  }
}
