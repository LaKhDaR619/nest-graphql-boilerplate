import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    const fetchedUsers = await this.userRepository.find({
      select: ['id', 'email', 'createdAt'],
    });

    return fetchedUsers;
  }

  async findOne(id: string): Promise<User> {
    const fetchedUser = await this.userRepository.findOne({
      where: {
        id,
      },
      select: ['id', 'email', 'createdAt'],
    });

    if (!fetchedUser) throw new BadRequestException('user not found');

    return fetchedUser;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const fetchedUser = await this.userRepository.findOne(id);

    if (!fetchedUser) throw new BadRequestException('user not found');

    // check if email is used
    const isEmailUsed = await this.userRepository.findOne({
      where: {
        id: Not(id),
        email: updateUserDto.email,
      },
    });

    if (isEmailUsed) throw new BadRequestException('email already used');

    if (updateUserDto.email) fetchedUser.email = updateUserDto.email;
    if (updateUserDto.password) fetchedUser.setPassword(updateUserDto.password);

    return this.userRepository.save(fetchedUser);
  }

  async remove(id: string): Promise<User> {
    const fetchedUser = await this.userRepository.findOne(id);

    if (!fetchedUser) throw new BadRequestException('user not found');

    await this.userRepository.remove(fetchedUser);

    return {
      ...fetchedUser,
      id,
    } as User;
  }
}
