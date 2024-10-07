import pick from "lodash/pick";
import database from "~/database/models";

const getUserByUserIdService = async (userId) => {
  return await database.User.findOne({
    attributes: ["id", "name", "phone", "createdAt"],
    where: {
      id: userId,
    },
  });
};

const getUsersService = async (query) => {
  const {pageSize = 10, endCursor = null} = query;
  const result = await database.User.paginate({
    limit: pageSize,
    after: endCursor,
    attributes: ["id", "name", "phone"],
    group: ['User.id'],
  });
  const items = result.edges.map(item => item.node);
  return {
    items,
    totalCount: result.totalCount,
    pageInfo: result.pageInfo,
  };
}

const getUserWithPasswordByService = async (phone) => {
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

const updateUserByUserIdService = async (userId, query) => {
  const user = await getUserByUserIdService(userId);

  if(query.name) {
    user.name = query.name;
  }

  if(query.email) {
    user.email = query.email;
  }

  await user.save();
  return user;
};

const removeUsersService = async (query) => {
  return await database.User.destroy(query);
}

module.exports.createUserService = createUserService;
module.exports.getUserByUserIdService = getUserByUserIdService;
module.exports.getUsersService = getUsersService;
module.exports.parseUserResponse = parseUserResponse;
module.exports.updateUserByUserIdService = updateUserByUserIdService;
module.exports.getUserWithPasswordByService = getUserWithPasswordByService;
module.exports.removeUsersService = removeUsersService;
