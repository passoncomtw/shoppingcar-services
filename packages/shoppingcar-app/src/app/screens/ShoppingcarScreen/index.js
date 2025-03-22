import { connect } from "react-redux";
import { getShoppingcarAction } from "../../actions/shoppingcarActions";
import ShoppingcarScreen from "./view";

const mapStateToProps = ({ shoppingcar }) => ({ shoppingcar });

const mapDispatchToProps = (dispatch) => ({
  handleGetShoppingcar: (payload) => {
    dispatch(getShoppingcarAction(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingcarScreen);
