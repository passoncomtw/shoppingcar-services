import { connect } from 'react-redux';
import HomeScreen from './view';

const mapStateToProps = ({ auth }) => ({ auth });

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
