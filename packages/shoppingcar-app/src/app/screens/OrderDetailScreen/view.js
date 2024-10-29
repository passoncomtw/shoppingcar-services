import React, { useEffect } from "react";
import { ScrollView, View } from "react-native";
import { Avatar, Button, Card, IconButton, List, Text } from "react-native-paper";
import Background from "../../components/Background";

const LeftContent = (props) => <Avatar.Image {...props} source={require("../../../assets/EmptyOrder.png")} />;

const OrderItem = (props) => (
  <Card style={{ flex: 1, height: "100%" }}>
    {props.orderDetail.orderItems.map((item) => {
      return (
        <Card.Content>
          <Card.Title title={item.merchant.name} left={LeftContent} />
          <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <IconButton icon="plus" mode="outlined" onPress={() => console.log("Pressed")} />
            <Text>1</Text>
            <IconButton icon="plus" mode="outlined" onPress={() => console.log("Pressed")} />
          </View>
          <List.Item left={() => <Text>名稱</Text>} right={() => <Text>${item.product.name}</Text>} />
          <List.Item left={() => <Text>價格</Text>} right={() => <Text>${item.product.price}</Text>} />
        </Card.Content>
      );
    })}

    <View style={{ alignItems: "center" }}>
      <Text>- (未結帳)</Text>
    </View>
    <List.Item left={() => <Text>付款總額</Text>} right={() => <Text>${props.orderDetail.totalAmount}</Text>} />
    <Button disabled mode="contained" onPress={() => console.log("Pressed")}>
      結帳
    </Button>
  </Card>
);

export default function OrderDetailScreen({ orderDetail, route, handleGetOrderDetail }) {
  const { orderId } = route.params;

  useEffect(() => {
    handleGetOrderDetail({ orderId });
  }, []);
  return (
    <Background>
      <ScrollView>
        <OrderItem orderDetail={orderDetail} />
      </ScrollView>
    </Background>
  );
}
