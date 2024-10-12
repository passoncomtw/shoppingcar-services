import isEmpty from "lodash/isEmpty";
import database from "~/database/models";
import { Op } from 'sequelize';

const createOrderResult = async (userId, shoppingcarItemIds) => {
  const tx = await database.sequelize.transaction();
  try {
    const shoppingcarResult = await database.Shoppingcar.findOne({
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
      where: { id: { [Op.in]: shoppingcarItemIds }, shoppingcarId: shoppingcarResult.id },
    });

    if (isEmpty(shoppingcarResult)) {
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
      productCount: shoppingcarResult.productCount - shoppingcarItemIds.length,
      totalAmount: shoppingcarResult.totalAmount - totalAmount,
    }, {
      where: {id: shoppingcarResult.id},
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

const updateOrderPayStatusResult = async (orderId) => {
  const orderResult = await database.Order.findOne({
    where: {id: orderId},
  });
  if (isEmpty(orderResult)) {
    throw new Error("訂單不存在");
  }

  orderResult.isPaid = !orderResult.isPaid;
  await orderResult.save();
};

module.exports.createOrderResult = createOrderResult;
module.exports.updateOrderPayStatusResult = updateOrderPayStatusResult;
