import isEmpty from 'lodash/isEmpty';
import database from '~/database/models';
import { getProductInformationIdResult } from './productServices';

const getShoppingcarResult = (userId) => {
  return database.Shoppingcar.findOne({
    where: { userId },
    include: [
      {
        as: 'shoppingcarItems',
        model: database.ShoppingcarItem,
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
  console.log("🚀 ~ appendProductToShoppingcarResult ~ nextTotalAmount:", nextTotalAmount)
  console.log("🚀 ~ appendProductToShoppingcarResult ~ nextProductCount:", nextProductCount)
    console.log("🚀 ~ appendProductToShoppingcarResult ~ shoppingcarResult.id:", shoppingcarResult.id)
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

module.exports.appendProductToShoppingcarResult = appendProductToShoppingcarResult;
