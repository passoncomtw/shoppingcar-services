import { connect } from 'react-redux';
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
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingScreen);