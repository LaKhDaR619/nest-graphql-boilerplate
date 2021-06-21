import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@UseGuards(GqlAuthGuard)
@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => [User])
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Query(() => User)
  async findOne(@Args('id', new ParseUUIDPipe()) id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User)
  async update(
    @Args('id', new ParseUUIDPipe()) id: string,
    @Args('updateUserDto') updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  @Mutation(() => User)
  async remove(@Args('id', new ParseUUIDPipe()) id: string): Promise<User> {
    return this.usersService.remove(id);
  }
}
