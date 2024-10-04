import { View, Text } from "react-native";
import { Avatar, Card, IconButton, MD3Colors } from 'react-native-paper';
import WaterfallFlow from 'react-native-waterfall-flow';
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome5";

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const Item = ({ item }) => (
  <Card style={{margin: 10}} onPress={() => alert("店家產品列表")}>
    <Avatar.Image size={88} style={{ alignSelf: "center" }} source={require('../../../assets/girlLogo.jpg')} />
    <Card.Content>
      <Text variant="titleLarge" style={{ alignSelf: "center" }}>Product Name</Text>
      <Text variant="bodyMedium" style={{ alignSelf: "center" }}>$22.00</Text>
    </Card.Content>
    <Card.Actions>
      <IconButton
        icon={() => <FontAwesomeIcon name="plus" size={20} />}
        onPress={() => console.log('Pressed')}
      />
    </Card.Actions>
  </Card>
);


const MerchantDetailScreen = ({route}) => {
  const { merchantId } = route.params;
  
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
        data={DATA}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default MerchantDetailScreen;
