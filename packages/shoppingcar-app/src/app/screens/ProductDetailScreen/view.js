import { Card, Text } from "react-native-paper";
import Background from "../../components/Background";

const ProductDetailScreen = () => {
  return (
    <Background containerStyle={{ alignSelf: "center" }}>
      <Card style={{ flex: 1, height: "100%" }}>
        <Card.Cover style={{ marginLeft: 100, marginRight: 100 }} source={{ uri: "https://picsum.photos/700" }} />
        <Card.Content>
          <Text variant="titleLarge" style={{ fontWeight: "700" }}>
            怪物糖果
          </Text>
          <Text variant="bodyMedium">$22.00</Text>
          <Text variant="bodyMedium">
            這款草莓風味棉花糖像剛下的雪一樣輕盈蓬鬆，是完美的節日款待。創造自己的棉花糖雪人！
          </Text>
          <Text variant="titleLarge" style={{ fontWeight: "500" }}>
            項目描述
          </Text>
          <Text variant="bodyMedium">箱子包含24個護身符蓬鬆的東西雪球白棉糖果包</Text>
          <Text variant="bodyMedium">每個淨重2.1盎司</Text>
          <Text variant="bodyMedium">美國製造</Text>
          <Text variant="bodyMedium">運輸重量 5磅</Text>
          <Text variant="bodyMedium">猶太認證</Text>
        </Card.Content>
      </Card>
    </Background>
  );
};

export default ProductDetailScreen;
