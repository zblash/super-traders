import { IsEmail, IsString } from "class-validator";

export class CreateUserCommand {
  @IsString()
  name: string;

  @IsString()
  @IsEmail()
  email: string;
}
