import { isEmpty } from "lodash";
import pick from "lodash/pick";
import database from "~/database/models";

const getUserByUserIdResult = async (userId) => {
  return await database.User.findOne({
    attributes: ["id", "name", "phone", "createdAt"],
    where: {
      id: userId,
    },
  });
};

const getUsersResult = async (query) => {
  const { pageSize = 10, endCursor = null } = query;
  const result = await database.User.paginate({
    limit: pageSize,
    after: endCursor,
    attributes: ["id", "name", "phone"],
    group: ["User.id"],
  });
  const items = result.edges.map((item) => item.node);
  return {
    items,
    totalCount: result.totalCount,
    pageInfo: result.pageInfo,
  };
};

const updateUserByUserIdResult = async (userId, query) => {
  const userResult = await getUserByUserIdResult(userId);
  if (isEmpty(userResult)) {
    throw new Error("使用者不存在");
  }

  if (query.name) {
    userResult.name = query.name;
  }

  if (query.email) {
    userResult.email = query.email;
  }

  if (query.phone) {
    userResult.phone = query.phone;
  }

  await userResult.save();
  await userResult.reload();
  return userResult;
};

const getUserWithPasswordResult = async (phone) => {
  const userResult = await database.User.findOne({
    where: {
      phone,
    },
  });

  return userResult;
};

const parseUserResponse = (userResult) => {
  const userResponse = pick(userResult, ["id", "phone", "name"]);
  return userResponse;
};

const createUserResult = async (userData) => {
  const existUser = await database.User.findOne({ where: { phone: userData.phone } });
  if (existUser) throw new Error("使用者已存在");

  const userResult = await database.User.create({
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

const removeUsersResult = async (query) => {
  return await database.User.destroy(query);
};

module.exports.createUserResult = createUserResult;
module.exports.getUserByUserIdResult = getUserByUserIdResult;
module.exports.getUsersResult = getUsersResult;
module.exports.parseUserResponse = parseUserResponse;
module.exports.updateUserByUserIdResult = updateUserByUserIdResult;
module.exports.getUserWithPasswordResult = getUserWithPasswordResult;
module.exports.removeUsersResult = removeUsersResult;
