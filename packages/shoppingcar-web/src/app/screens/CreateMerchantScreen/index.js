import { connect } from 'react-redux';
import CreateMerchantScreen from './view';
import { createMerchantAction } from '../../actions/merchantActions';

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
    handleCreateMerchant: payload => {
        dispatch(createMerchantAction(payload));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateMerchantScreen);
