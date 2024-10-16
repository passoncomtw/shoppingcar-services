import { connect } from "react-redux";
import { getMerchantItemsAction } from "../../actions/merchantActions";
import CreateUserScreen from "./view";

const mapStateToProps = ({ merchant }) => ({
  merchantItems: merchant.merchantItems,
});

const mapDispatchToProps = (dispatch) => ({
  handleGetMerchantItems: () => {
    dispatch(getMerchantItemsAction());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateUserScreen);
