import { connect } from 'react-redux';
import { getMerchantProductsAction } from '../../actions/merchantActions';
import MerchantDetailScreen from './view';

const mapStateToProps = ({product}) => {
  return { product };
};

const mapDispatchToProps = dispatch => ({
  handleGetMerchantProductsAction: payload => {
    dispatch(getMerchantProductsAction(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MerchantDetailScreen);