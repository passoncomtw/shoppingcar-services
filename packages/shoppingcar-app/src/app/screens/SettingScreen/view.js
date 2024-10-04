import {useEffect} from "react";
import { Avatar, List } from "react-native-paper";
import Background from "../../components/Background";
import Button from '../../components/Button';

const SettingScreen = (props) => {
  useEffect(() => {
    props.handleGetUserDetail();
  }, []);

  const {authUser} = props;

  return (
    <Background containerStyle={{alignSelf: 'center'}}>
      <Avatar.Image size={88} source={require('../../../assets/girlLogo.jpg')} />
      <List.Item
        title="姓名"
        description={authUser.name}
        left={() => <List.Icon icon="account" />}
      />
      <List.Item
        title="電話"
        description={authUser.phone}
        left={() => <List.Icon icon="phone" />}
      />
      <Button mode="contained" onPress={() => alert("登出")}>
        登出
      </Button>
    </Background>
  );
};

export default SettingScreen;
