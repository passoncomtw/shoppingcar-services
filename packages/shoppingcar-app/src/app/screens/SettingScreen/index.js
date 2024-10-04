import { connect } from 'react-redux';
import { signoutAction } from '../../actions/authActions';
import { getUserDetailAction } from '../../actions/userActions';
import SettingScreen from './view';

const mapStateToProps = ({auth}) => {
  return {
    authUser: auth.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  handleGetUserDetail: () => {
    dispatch(getUserDetailAction());
  },
  handleSignout: () => {
    dispatch(signoutAction());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingScreen);