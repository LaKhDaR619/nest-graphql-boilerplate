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

  @Query()
  async users(): Promise<User[]> {
    return this.usersService.users();
  }

  @Query()
  async user(@Args('id', new ParseUUIDPipe()) id: string): Promise<User> {
    return this.usersService.user(id);
  }

  @Mutation()
  async update(
    @Args('id', new ParseUUIDPipe()) id: string,
    @Args('updateUserDto') updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  @Mutation()
  async remove(@Args('id', new ParseUUIDPipe()) id: string): Promise<User> {
    return this.usersService.remove(id);
  }
}
