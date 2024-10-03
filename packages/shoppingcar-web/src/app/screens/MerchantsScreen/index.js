import { connect } from 'react-redux';
import { getMerchantsAction } from '../../actions/merchantActions';
import MerchantsScreen from './view';

const mapStateToProps = ({ merchant }) => ({ merchant });

const mapDispatchToProps = (dispatch) => ({
  handleGetMerchants: payload => {
    dispatch(getMerchantsAction(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MerchantsScreen);
