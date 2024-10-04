import {useEffect} from 'react';
import Background from '../../components/Background';
import Logo from '../../components/Logo';
import Header from '../../components/Header';

const MerchantsScreen = (props) => {
  useEffect(() => {
    props.handleGetMerchants();
  }, []);
  return (
    <Background>
      <Logo />
      <Header>Merchants Screen</Header>
    </Background>
  );
}

export default MerchantsScreen;
