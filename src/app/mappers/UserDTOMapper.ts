import { User } from "../../domain/user/model/User";
import { ReadableUserDTO } from "../dtos/ReadableUserDTO";

export const UserDTOMapper = (function () {
    function toReadableUserDTO(user: User): ReadableUserDTO {
        return {
            id: user.id,
            name: user.name,
            email: user.email
        }
    }

    function toReadableUserDTOList(users: User[]): ReadableUserDTO[] {
        return users.map(toReadableUserDTO)
    }

    return {
        toReadableUserDTO,
        toReadableUserDTOList
    }
})()