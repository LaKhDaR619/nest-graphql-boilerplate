import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { AuthResponse } from './dto/auth-res.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => User)
  async register(@Args('registerDto') registerDto: RegisterDto): Promise<User> {
    return this.authService.register(registerDto);
  }

  @Mutation(() => AuthResponse)
  async login(
    @Args('loginDto') loginDto: LoginDto,
  ): Promise<{ access_token: string }> {
    return this.authService.login(loginDto);
  }
}
