import pick from "lodash/pick";
import database from "~/database/models";

const getUserByUserId = async (userId) => {
  return await database.User.findOne({
    attributes: ["id", "name", "phone", "createdAt"],
    where: {
      id: userId,
    },
  });
};

const updateUserByUserId = async (userId, query) => {
  const user = await getUserByUserId(userId);

  if(query.name) {
    user.name = query.name;
  }

  if(query.email) {
    user.email = query.email;
  }

  await user.save();
  return user;
};

const getUserWithPasswordBy = async (phone) => {
  const userResult = await database.User.findOne({
    where: {
      phone,
    },
  });

  return userResult;
};

const parseUserResponse = (userResult) => {
  const userResponse = pick(userResult, [
    "id",
    "phone",
    "name",
  ]);
  return userResponse;
};

const createUserService = async (userData) => {
  const existUser = await database.User.findOne({ where: {phone: userData.phone} });
  if (existUser) throw new Error("使用者已存在");

  const userResult = await database.User.create(
    {
      name: userData.name,
      phone: userData.phone,
      password: userData.password,
    });
  

  return {
    id: userResult.id,
    createdAt: userResult.createdAt,
    ...userData,
  };
};

const removeUsersService = async (query) => {
  return await database.User.destroy(query);
}

module.exports.createUserService = createUserService;
module.exports.getUserByUserId = getUserByUserId;
module.exports.parseUserResponse = parseUserResponse;
module.exports.updateUserByUserId = updateUserByUserId;
module.exports.getUserWithPasswordBy = getUserWithPasswordBy;
module.exports.removeUsersService = removeUsersService;
