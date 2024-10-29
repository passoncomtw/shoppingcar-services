import React from "react";
import { View } from "react-native";
import { Avatar, Button, Card, Divider, IconButton, List, Text } from "react-native-paper";
import Background from "../../components/Background";

const test = "a";

const LeftContent = (props) => <Avatar.Image {...props} source={require("../../../assets/EmptyOrder.png")} />;

const ShoppingcarItem = () => (
  <Card style={{ flex: 1, height: "100%" }}>
    <Card.Title title="怪物糖果" left={LeftContent} right={() => <Text>$46.00</Text>} />
    <Card.Content>
      <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
        <IconButton icon="plus" mode="outlined" onPress={() => console.log("Pressed")} />
        <Text>1</Text>
        <IconButton icon="plus" mode="outlined" onPress={() => console.log("Pressed")} />
      </View>
      <List.Item left={() => <Text>共計</Text>} right={() => <Text>$46.00</Text>} />
    </Card.Content>
    <List.Item left={() => <Text>付款總額</Text>} right={() => <Text>$46.00</Text>} />
    <Button mode="contained" onPress={() => console.log("Pressed")}>
      結帳
    </Button>
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

const ShoppingcarItems = () => (
  <Background>
    <Text variant="titleLarge" style={{ fontWeight: "700" }}>
      糖果愛好者
    </Text>
    <ShoppingcarItem />
  </Background>
);

const OrderResult = () => (
  <Background>
    <Card style={{ flex: 1, height: "100%" }}>
      <Card.Title title="訂單代碼" />
      <Card.Content>
        <List.Item left={() => <Text>收件人</Text>} right={() => <Text>-</Text>} />
        <List.Item left={() => <Text>手機號碼</Text>} right={() => <Text>0987654321</Text>} />
        <List.Item left={() => <Text>地址</Text>} right={() => <Text>-</Text>} />
      </Card.Content>
      <Divider />
      <List.Item left={() => <Text>訂單總計</Text>} right={() => <Text>$46.00</Text>} />
      <Button mode="contained" onPress={() => console.log("Pressed")}>
        回到首頁
      </Button>
    </Card>
  </Background>
);
const ShoppingcarScreen = () => {
  if (test === "b") return <EmptyShoppingcar />;
  if (test === "c") return <ShoppingcarItems />;
  return <OrderResult />;
};

export default ShoppingcarScreen;
