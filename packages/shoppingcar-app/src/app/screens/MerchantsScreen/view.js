import { useEffect } from "react";
import { StatusBar, StyleSheet } from "react-native";
import { Avatar, Card, Text } from "react-native-paper";
import WaterfallFlow from "react-native-waterfall-flow";
import Background from "../../components/Background";

const Item = ({ navigation, item }) => (
  <Card
    style={styles.cardContainerStyle}
    onPress={() => navigation.push("MerchantDetail", { merchantId: item.id })}
  >
    <Avatar.Image size={88} style={{ alignSelf: "center" }} source={require("../../../assets/girlLogo.jpg")} />
    <Card.Content>
      <Text variant="titleLarge">{item.name}</Text>
    </Card.Content>
  </Card>
);

const MerchantsScreen = (props) => {
  useEffect(() => {
    props.handleGetMerchants();
  }, []);

  return (
    <Background>
      <WaterfallFlow
        numColumns={2}
        data={props.merchant.items}
        renderItem={({ item }) => <Item item={item} navigation={props.navigation} />}
        keyExtractor={(item) => item.id}
      />
    </Background>
  );
};

const styles = StyleSheet.create({
  cardContainerStyle: { backgroundColor: "#fff", margin: 10 },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default MerchantsScreen;
