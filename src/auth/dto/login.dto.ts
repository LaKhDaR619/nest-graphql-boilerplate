import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, MinLength } from 'class-validator';

@InputType()
export class LoginDto {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(3)
  password: string;
}
