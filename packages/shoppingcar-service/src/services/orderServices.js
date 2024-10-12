import isEmpty from "lodash/isEmpty";
import database from "~/database/models";
import { Op } from 'sequelize';

const createOrderResult = async (userId, shoppingcarItemIds) => {
  const tx = await database.sequelize.transaction();
  try {
    const shoppingarResult = await database.Shoppingcar.findOne({
      where: { userId },
    });
    const shoppintcarItemsResult = await database.ShoppingcarItem.findAll({
      include: [
        {
          as: "product",
          model: database.Product,
          attributes: ["id", "price", "stockAmount"],
        },
      ],
      where: { id: { [Op.in]: shoppingcarItemIds }, shoppingcarId: shoppingarResult.id },
    });

    if (isEmpty(shoppingarResult)) {
      throw new Error("購物車不存在");
    }
    if (shoppingcarItemIds.length !== shoppingcarItemIds.length) {
      throw new Error("購物車品項有誤");
    }

    const totalAmount = shoppintcarItemsResult.reduce((result, item) => {
      const {product} = item;
      const amount = product.price * item.amount;
      return result + amount;
    }, 0);

    const orderResult = await database.Order.create({
      userId,
      totalAmount,
      productCount: shoppintcarItemsResult.length,
    }, {transaction: tx});

    const allPromises = [];
    for(let index = 0; index < shoppintcarItemsResult.length; index++) {
      const shoppingcarItemResult = shoppintcarItemsResult[index];
      const {product} = shoppingcarItemResult;

      if (shoppingcarItemResult.amount > product.stockAmount) {
        throw new Error("產品庫存不足");
      }

      const updateProductPromise = database.Product.update({
        stockAmount: product.stockAmount - shoppingcarItemResult.amount,
      }, {
        where: {id: product.id},
        transaction: tx,
      });

      const createOrderItemPromise = database.OrderItem.create({
        orderId: orderResult.id,
        productId: product.id,
        merchantId: shoppingcarItemResult.merchant_id,
        amount: shoppingcarItemResult.amount,
      }, {transaction: tx});

      const removeShoppingcarItemPromise = database.ShoppingcarItem.destroy({
        where: {id: shoppingcarItemResult.id},
        transaction: tx,
      });

      allPromises.push(updateProductPromise);
      allPromises.push(createOrderItemPromise);
      allPromises.push(removeShoppingcarItemPromise);
    }

    const updateShoppingcarPromise = database.Shoppingcar.update({
      productCount: shoppingarResult.productCount - shoppingcarItemIds.length,
      totalAmount: totalAmount,
    }, {
      where: {id: shoppingarResult.id},
      transaction: tx,
    });
    allPromises.push(updateShoppingcarPromise);

    await Promise.all(allPromises);
    await tx.commit();
    return orderResult;
  } catch (error) {
    tx.rollback();
    throw error;
  }
};

module.exports.createOrderResult = createOrderResult;
