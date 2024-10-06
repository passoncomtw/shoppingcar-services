import { connect } from 'react-redux';
import { getMerchantItemsAction } from '../../actions/merchantActions';
import { createUserAction } from '../../actions/userActions';
import CreateUserScreen from './view';

const mapStateToProps = ({merchant}) => ({
  merchantItems: merchant.merchantItems,
});

const mapDispatchToProps = (dispatch) => ({
  handleGetMerchantItems: () => {
    dispatch(getMerchantItemsAction());
  },
  handleCreateUser: (payload) => {
    dispatch(createUserAction(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateUserScreen);
