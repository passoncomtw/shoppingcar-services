import { Avatar, List } from "react-native-paper";
import Background from "../../components/Background";
import Button from '../../components/Button';

const SettingScreen = () => {
  return (
    <Background containerStyle={{alignSelf: 'center'}}>
      <Avatar.Image size={88} source={require('../../../assets/girlLogo.jpg')} />
      <List.Item
        title="姓名"
        description="Testuser001"
        left={() => <List.Icon icon="account" />}
      />
      <List.Item
        title="電話"
        description="0987654321"
        left={() => <List.Icon icon="phone" />}
      />
      <List.Item
        title="信箱"
        description="aaa@bbb.ccc"
        left={() => <List.Icon icon="email" />}
      />
      <Button mode="contained" onPress={() => alert("登出")}>
        登出
      </Button>
    </Background>
  );
};

export default SettingScreen;
