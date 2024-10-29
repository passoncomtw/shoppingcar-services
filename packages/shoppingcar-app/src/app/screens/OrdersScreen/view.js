import React, { useEffect } from "react";
import { Avatar, Button, Card, List, Text } from "react-native-paper";
import Background from "../../components/Background";

const LeftContent = (props) => <Avatar.Image {...props} source={require("../../../assets/EmptyOrder.png")} />;

const EmptyOrder = () => (
  <Background>
    <Card style={{ flex: 1, height: "100%" }}>
      <Card.Cover
        style={{ marginTop: 100, marginLeft: 100, marginRight: 100 }}
        source={require("../../../assets/EmptyOrder.png")}
      />
      <Card.Content style={{ alignItems: "center" }}>
        <Text variant="titleLarge" style={{ fontWeight: "700" }}>
          你的訂單是空的
        </Text>
        <Text variant="bodyMedium">看來你還沒有做出選擇。我們去購物吧！</Text>
      </Card.Content>
    </Card>
  </Background>
);

const OrderItem = (props) =>
  props.order.items.map((item) => (
    <Card key={`order-item-${item.id}`} style={{ flex: 1, height: "100%" }}>
      <Card.Title title="怪物糖果" left={LeftContent} />
      <Card.Content style={{ alignItems: "center" }}>
        <List.Item left={() => <Text>- 產品</Text>} right={() => <Text>${item.totalAmount}</Text>} />
        <Button mode="contained" onPress={() => props.navigation.push("OrderDetail", { orderId: item.id })}>
          訂單詳情
        </Button>
      </Card.Content>
    </Card>
  ));
export default function OrdersScreen({ order, navigation, handleGetOrders }) {
  useEffect(() => {
    handleGetOrders();
  }, []);

  if (order.items.length === 0) return <EmptyOrder />;

  return (
    <Background>
      <OrderItem navigation={navigation} order={order} />
    </Background>
  );
}
