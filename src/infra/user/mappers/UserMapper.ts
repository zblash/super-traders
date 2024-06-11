import { User } from "../../../domain/user/model/User";
import { UserInstance } from "../../db/models/user";

export const UserMapper = (function () {
  function toDomainModel(dbModel: UserInstance): User {
    return new User(dbModel.id, dbModel.name, dbModel.email);
  }

  function toDomainModelList(dbModelList: UserInstance[]): User[] {
    return dbModelList.map((dbModel) => toDomainModel(dbModel));
  }

  return {
    toDomainModel,
    toDomainModelList,
  };
})();
