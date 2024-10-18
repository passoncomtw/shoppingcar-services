import { connect } from "react-redux";
import { getMerchantItemsAction } from "../../actions/merchantActions";
import { createProductAction } from "../../actions/productActions";
import CreateProductScreen from "./view";

const mapStateToProps = ({ merchant }) => ({
  merchantItems: merchant.merchantItems,
});

const mapDispatchToProps = (dispatch) => ({
  handleGetMerchantItems: () => {
    dispatch(getMerchantItemsAction());
  },
  handleCreateProduct: (payload) => {
    dispatch(createProductAction(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateProductScreen);
