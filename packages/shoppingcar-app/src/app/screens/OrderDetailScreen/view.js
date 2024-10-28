import React from "react";
import { View } from "react-native";
import { Avatar, Button, IconButton, Card, List, Text } from "react-native-paper";
import Background from "../../components/Background";

const LeftContent = (props) => <Avatar.Image {...props} source={require("../../../assets/EmptyOrder.png")} />;

const OrderItem = () => (
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
    <View style={{ alignItems: "center" }}>
      <Text>未結帳</Text>
    </View>
    <List.Item left={() => <Text>付款總額</Text>} right={() => <Text>$46.00</Text>} />
    <Button mode="contained" onPress={() => console.log("Pressed")}>
      結帳
    </Button>
  </Card>
);
export default function OrderDetailScreen({ navigation }) {
  return (
    <Background>
      <Text variant="titleLarge" style={{ fontWeight: "700" }}>
        糖果愛好者
      </Text>
      <OrderItem />
    </Background>
  );
}
