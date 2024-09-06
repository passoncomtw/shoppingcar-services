import { connect } from 'react-redux';
import PublicScreen from './view';

const mapStateToProps = ({ auth }) => ({
  auth,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PublicScreen);
