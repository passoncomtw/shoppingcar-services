import { connect } from 'react-redux';
import MerchantsScreen from './view';

const mapStateToProps = ({ auth }) => ({ auth });

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(MerchantsScreen);
