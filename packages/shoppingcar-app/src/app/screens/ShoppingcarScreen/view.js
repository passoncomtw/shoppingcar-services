import isEmpty from "lodash/isEmpty";
import React, { useEffect } from "react";
import { View } from "react-native";
import { Avatar, Button, Card, Divider, IconButton, List, Text } from "react-native-paper";
import Background from "../../components/Background";

const test = "a";

const LeftContent = (props) => <Avatar.Image {...props} source={require("../../../assets/EmptyOrder.png")} />;

const ShoppingcarItem = (props) => (
  <Card style={{ flex: 1, height: "100%" }}>
    <Text variant="titleLarge" style={{ fontWeight: "700" }}>
      {props.item.name}
    </Text>
    <Card.Title title={props.item.name} left={LeftContent} right={() => <Text>${props.item.price}</Text>} />
    <Card.Content>
      <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
        <IconButton icon="plus" mode="outlined" onPress={() => console.log("Pressed")} />
        <Text>1</Text>
        <IconButton icon="plus" mode="outlined" onPress={() => console.log("Pressed")} />
      </View>
      <List.Item left={() => <Text>共計</Text>} right={() => <Text>$46.00</Text>} />
    </Card.Content>
  </Card>
);

const EmptyShoppingcar = () => (
  <Background>
    <Card style={{ flex: 1, height: "100%" }}>
      <Card.Cover
        style={{ marginTop: 100, marginLeft: 100, marginRight: 100 }}
        source={require("../../../assets/EmptyCart.png")}
      />
      <Card.Content style={{ alignItems: "center" }}>
        <Text variant="titleLarge">你的購物車是空的</Text>
        <Text variant="bodyMedium">去購物吧！</Text>
      </Card.Content>
    </Card>
  </Background>
);

const ShoppingcarItems = (props) => (
  <Background>
    {props.shoppingcar.shoppingcarItems.map((item) => {
      return <ShoppingcarItem key={`shoppingcar-item-${item.id}`} item={item} />;
    })}
    <List.Item left={() => <Text>付款總額</Text>} right={() => <Text>${props.shoppingcar.totalAmount}</Text>} />
    <Button mode="contained" onPress={() => console.log("Pressed")}>
      結帳
    </Button>
  </Background>
);

const OrderResult = ({ shoppingcar }) => (
  <Background>
    <Card style={{ flex: 1, height: "100%" }}>
      <Card.Title title="訂單代碼" />
      <Card.Content>
        <List.Item left={() => <Text>收件人</Text>} right={() => <Text>-</Text>} />
        <List.Item left={() => <Text>手機號碼</Text>} right={() => <Text>0987654321</Text>} />
        <List.Item left={() => <Text>地址</Text>} right={() => <Text>-</Text>} />
      </Card.Content>
      <Divider />
      <List.Item left={() => <Text>訂單總計</Text>} right={() => <Text>${shoppingcar.item.totalAmount}</Text>} />
      <Button mode="contained" onPress={() => console.log("Pressed")}>
        回到首頁
      </Button>
    </Card>
  </Background>
);
const ShoppingcarScreen = (props) => {
  useEffect(() => {
    props.handleGetShoppingcar();
  }, []);

  if (isEmpty(props.shoppingcar.shoppingcarItems)) return <EmptyShoppingcar />;
  if (test === "c") return <OrderResult shoppingcar={props.shoppingcar} />;
  return <ShoppingcarItems shoppingcar={props.shoppingcar} />;
};

export default ShoppingcarScreen;
