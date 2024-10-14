import isEmpty from "lodash/isEmpty";
import database from "~/database/models";
import {getUserByUserIdResult} from "./userServices";
import { getProductInformationIdResult } from "./productServices";

const getShoppingcarsResult = async (query) => {
  const { pageSize = 10, endCursor = null } = query;
  const result = await database.Shoppingcar.paginate({
    limit: pageSize,
    after: endCursor,
    include: [
      {
        as: "user",
        model: database.User,
        attributes: ["id", "name"],
      },
    ],
    attributes: ["id", "productCount", "totalAmount"],
    group: ["Shoppingcar.id", "user.id"],
  });
  const items = result.edges.map((item) => item.node);
  return {
    items,
    totalCount: result.totalCount,
    pageInfo: result.pageInfo,
  };
};

const getShoppingcarResult = (userId) => {
  return database.Shoppingcar.findOne({
    where: { userId },
    include: [
      {
        as: "shoppingcarItems",
        model: database.ShoppingcarItem,
      },
    ],
  });
};

const getShoppingcarDetailResult = (userId) => {
  return database.Shoppingcar.findOne({
    where: { userId },
    attributes: ["id", "productCount", "totalAmount"],
    include: [
      {
        as: "user",
        model: database.User,
        attributes: ["id", "name", "phone"],
      },
      {
        as: "shoppingcarItems",
        model: database.ShoppingcarItem,
        attributes: ["id", "amount"],
        include: [
          {
            as: "product",
            model: database.Product,
            attributes: ["id", "name", "price", "stockAmount", "description", "subtitle"],
          },
          {
            as: "merchant",
            model: database.Merchant,
            attributes: ["id", "name", "phone", "email"],
          },
        ],
      },
    ],
  });
};

const initialShoppingcar = async (userId, tx) => {
  const userResult = await getUserByUserIdResult(userId);
  if (isEmpty(userResult)) {
    throw new Error("會員不存在");
  }
  const shoppingcarResult = await getShoppingcarResult(userId);
  console.log("🚀 ~ initialShoppingcar ~ shoppingcarResult:", shoppingcarResult)
  if (isEmpty(shoppingcarResult)) {
    await database.Shoppingcar.create(
      {
        userId,
        productCount: 0,
        totalAmount: 0,
      },
      { transaction: tx }
    );
    return await getShoppingcarResult(userId);
  }
  return shoppingcarResult;
};

const appendProductToShoppingcarResult = async (options) => {
  const { userId, merchantId, productId, amount } = options;

  const tx = await database.sequelize.transaction();

  const [shoppingcarResult, productInformationResult] = await Promise.all([
    initialShoppingcar(userId, tx),
    getProductInformationIdResult({ id: productId, merchantId }),
  ]);
  const { merchant } = productInformationResult;

  const nextProductCount = shoppingcarResult.productCount + 1;
  const nextTotalAmount = shoppingcarResult.totalAmount + productInformationResult.price * amount;

  await Promise.all([
    database.Shoppingcar.update(
      {
        productCount: nextProductCount,
        totalAmount: nextTotalAmount,
      },
      {
        where: {
          id: shoppingcarResult.id,
        },
      },
      { transaction: tx }
    ),
    database.ShoppingcarItem.create(
      {
        productId,
        merchantId: merchant.id,
        shoppingcarId: shoppingcarResult.id,
        amount,
      },
      { transaction: tx }
    ),
  ]);

  await tx.commit();
  await shoppingcarResult.reload();
  return shoppingcarResult;
};

const clearShoppingcarItemsResult = async (userId) => {
  const tx = await database.sequelize.transaction();
  const shoppingcarResult = await initialShoppingcar(userId, tx);
  console.log("🚀 ~ clearShoppingcarItemsResult ~ shoppingcarResult:", shoppingcarResult)
  await Promise.all([
    database.Shoppingcar.update(
      {
        productCount: 0,
        totalAmount: 0,
      },
      {
        where: { userId },
        transaction: tx,
      }
    ),
    database.ShoppingcarItem.destroy({
      where: { shoppingcarId: shoppingcarResult.id },
      transaction: tx,
    }),
  ]);
  await tx.commit();
};

module.exports.getShoppingcarsResult = getShoppingcarsResult;
module.exports.getShoppingcarDetailResult = getShoppingcarDetailResult;
module.exports.appendProductToShoppingcarResult = appendProductToShoppingcarResult;
module.exports.clearShoppingcarItemsResult = clearShoppingcarItemsResult;
