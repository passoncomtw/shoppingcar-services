import isEmpty from "lodash/isEmpty";
import database from "~/database/models";
import { getProductInformationIdResult } from "./productServices";

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
  const shoppingcarResult = await getShoppingcarResult(userId);
  if (isEmpty(shoppingcarResult)) {
    await database.Shoppingcar.create(
      {
        userId,
        productCount: 0,
        totalAmount: 0,
      },
      { transaction: tx },
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
  const nextTotalAmount =
  shoppingcarResult.totalAmount + productInformationResult.price * amount;
  
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
      { transaction: tx },
    ),
    database.ShoppingcarItem.create(
      {
        productId,
        merchantId: merchant.id,
        shoppingcarId: shoppingcarResult.id,
        amount,
      },
      { transaction: tx },
    ),
  ]);

  await tx.commit();
  await shoppingcarResult.reload();
  return shoppingcarResult;
};

const clearShoppingcarItems = async (userId) => {
  const tx = await database.sequelize.transaction();
  const shoppingcarResult = await initialShoppingcar(userId, tx);
  await Promise.all([
    database.Shoppingcar.update({
      productCount: 0,
      totalAmount: 0,
    }, {
      where: {userId},
      transaction: tx
    }),
    database.ShoppingcarItem.destroy({
      where: {shoppingcarId: shoppingcarResult.id},
      transaction: tx
    }),
  ]);
  await tx.commit();
};

module.exports.getShoppingcarDetailResult = getShoppingcarDetailResult;
module.exports.appendProductToShoppingcarResult = appendProductToShoppingcarResult;
module.exports.clearShoppingcarItems = clearShoppingcarItems;