import React from "react";
import { Avatar, Button, Card, List, Text } from "react-native-paper";
import Background from "../../components/Background";

const LeftContent = (props) => <Avatar.Image {...props} source={require("../../../assets/EmptyOrder.png")} />;

const test = "a";
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

const OrderItem = () => (
  <Card style={{ flex: 1, height: "100%" }}>
    <Card.Title title="怪物糖果" left={LeftContent} />
    <Card.Content style={{ alignItems: "center" }}>
      <List.Item title="更多產品" />
      <List.Item left={() => <Text>1產品</Text>} right={() => <Text>$46.00</Text>} />
      <Button mode="contained" onPress={() => console.log("Pressed")}>
        訂單詳情
      </Button>
    </Card.Content>
  </Card>
);
export default function OrdersScreen({ navigation }) {
  if (test === "b") return <EmptyOrder />;

  return (
    <Background>
      <OrderItem />
    </Background>
  );
}
