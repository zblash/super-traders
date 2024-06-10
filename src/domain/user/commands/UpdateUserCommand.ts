import { IsNumber } from "class-validator";
import { CreateUserCommand } from "./CreateUserCommand";

export class UpdateUserCommand extends CreateUserCommand {
    @IsNumber()
    id: number;
}