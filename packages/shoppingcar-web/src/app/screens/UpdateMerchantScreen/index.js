import { connect } from 'react-redux';
import CreateMerchantScreen from './view';
import { getMerchant } from '../../actions/merchantActions';

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
    handleGetMerchant: payload => {
        dispatch(createMerchantAction(payload));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateMerchantScreen);
