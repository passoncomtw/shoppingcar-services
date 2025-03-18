import { connect } from "react-redux";
import { getMerchantProductsAction } from "../../actions/merchantActions";
import { addProductIntoShoppingcarAction } from "../../actions/shoppingcarActions";
import MerchantDetailScreen from "./view";

const mapStateToProps = ({ product }) => {
  return { product };
};

const mapDispatchToProps = (dispatch) => ({
  handleGetMerchantProducts: (payload) => {
    dispatch(getMerchantProductsAction(payload));
  },
  handleAddProductIntoShoppingcar: (payload) => {
    dispatch(addProductIntoShoppingcarAction(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MerchantDetailScreen);
