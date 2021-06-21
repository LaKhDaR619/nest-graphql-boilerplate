import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerDTO: RegisterDto): Promise<User> {
    const fetchedUser = await this.userRepository.findOne({
      where: { email: registerDTO.email },
    });

    if (fetchedUser) throw new BadRequestException('email already in use');

    const newUser = new User();
    newUser.email = registerDTO.email;
    await newUser.setPassword(registerDTO.password);

    const createdUser = await this.userRepository.save(newUser);

    return createdUser;
  }

  async login(loginDTO: LoginDto): Promise<{ access_token: string }> {
    const fetchedUser = await this.userRepository.findOne({
      where: {
        email: loginDTO.email,
      },
    });

    if (!fetchedUser || !(await fetchedUser.checkPassword(loginDTO.password)))
      throw new UnauthorizedException();

    const payload = { email: fetchedUser.email, sub: fetchedUser.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async currentUser(id: string) {
    const fetchedUser = await this.userRepository.findOne({
      where: {
        id,
      },
      select: ['id', 'email'],
    });

    if (!fetchedUser) throw new UnauthorizedException();

    return {
      data: {
        user: fetchedUser,
      },
    };
  }
}
