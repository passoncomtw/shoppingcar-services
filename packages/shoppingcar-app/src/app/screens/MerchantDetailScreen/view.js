import { useEffect } from "react";
import { Text, View } from "react-native";
import { Avatar, Card, IconButton } from "react-native-paper";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome5";
import WaterfallFlow from "react-native-waterfall-flow";

const Item = ({ merchantId, navigation, item, handleAddProductIntoShoppingcar }) => (
  <Card style={{ margin: 10 }} onPress={() => navigation.push("ProductDetail", { merchantId, productId: item.id })}>
    <Avatar.Image size={88} style={{ alignSelf: "center" }} source={require("../../../assets/girlLogo.jpg")} />
    <Card.Content>
      <Text variant="titleLarge" style={{ alignSelf: "center" }}>
        {item.name}
      </Text>
      <Text variant="bodyMedium" style={{ alignSelf: "center" }}>
        ${item.price.toFixed(2)}
      </Text>
    </Card.Content>
    <Card.Actions>
      <IconButton
        icon={() => <FontAwesomeIcon name="plus" size={20} />}
        onPress={() =>
          handleAddProductIntoShoppingcar({
            merchantId,
            productId: item.id,
            amount: 1,
            onSucess: () => alert(`${item.name} 加入購物車`),
          })
        }
      />
    </Card.Actions>
  </Card>
);

const MerchantDetailScreen = ({
  product,
  route,
  navigation,
  handleGetMerchantProducts,
  handleAddProductIntoShoppingcar,
}) => {
  const { merchantId } = route.params;
  useEffect(() => {
    handleGetMerchantProducts({ merchantId, pageSize: 10 });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Card>
        <Avatar.Image style={{ alignSelf: "center" }} size={88} source={require("../../../assets/girlLogo.jpg")} />
        <Card.Content>
          <Text variant="titleLarge" style={{ alignSelf: "center" }}>
            糖果愛好者 {merchantId}
          </Text>
          <Text variant="bodyMedium" style={{ alignSelf: "center" }}>
            各種特別的糖果
          </Text>
        </Card.Content>
      </Card>
      <WaterfallFlow
        style={{ flex: 1 }}
        numColumns={2}
        data={product.items}
        renderItem={({ item }) => (
          <Item
            merchantId={merchantId}
            navigation={navigation}
            item={item}
            handleAddProductIntoShoppingcar={handleAddProductIntoShoppingcar}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default MerchantDetailScreen;
