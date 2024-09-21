import { connect } from 'react-redux';
import { signinAction } from '../../actions/authActions';
import LoginScreen from './view';

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = dispatch => ({
  handleSubmit: (payload) => {
    dispatch(signinAction(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);