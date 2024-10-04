import { View, Text } from "react-native";
import { Avatar, Card, IconButton, MD3Colors } from 'react-native-paper';
import WaterfallFlow from 'react-native-waterfall-flow';
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome5";
import { useEffect } from "react";

const Item = ({ item }) => (
  <Card style={{margin: 10}} onPress={() => alert("店家產品列表")}>
    <Avatar.Image size={88} style={{ alignSelf: "center" }} source={require('../../../assets/girlLogo.jpg')} />
    <Card.Content>
      <Text variant="titleLarge" style={{ alignSelf: "center" }}>{item.name}</Text>
      <Text variant="bodyMedium" style={{ alignSelf: "center" }}>${item.price.toFixed(2)}</Text>
    </Card.Content>
    <Card.Actions>
      <IconButton
        icon={() => <FontAwesomeIcon name="plus" size={20} />}
        onPress={() => console.log('Pressed')}
      />
    </Card.Actions>
  </Card>
);


const MerchantDetailScreen = ({product, route, handleGetMerchantProductsAction}) => {
  const { merchantId } = route.params;
  useEffect(() => {
    handleGetMerchantProductsAction({merchantId, pageSize: 10});
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Card>
        <Avatar.Image style={{ alignSelf: "center" }} size={88} source={require('../../../assets/girlLogo.jpg')} />
        <Card.Content>
          <Text variant="titleLarge" style={{ alignSelf: "center" }}>糖果愛好者 {merchantId}</Text>
          <Text variant="bodyMedium" style={{ alignSelf: "center" }}>各種特別的糖果</Text>
        </Card.Content>
      </Card>
      <WaterfallFlow
        style={{ flex: 1 }}
        numColumns={2}
        data={product.items}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default MerchantDetailScreen;
