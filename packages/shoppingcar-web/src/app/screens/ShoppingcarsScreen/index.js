import { connect } from "react-redux";
import { getShoppingcarsAction } from "../../actions/shoppingcarActions";
import ShoppingcarsScreen from "./view";

const mapStateToProps = ({ shoppingcar }) => ({
  shoppingcarItems: shoppingcar.items,
  pageInfo: shoppingcar.pageInfo,
  totalAmount: shoppingcar.totalAmount,
});

const mapDispatchToProps = (dispatch) => ({
  handleGetShoppingcars: (payload) => {
    dispatch(getShoppingcarsAction(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingcarsScreen);
