import { connect } from "react-redux";
import { getOrdersAction } from "../../actions/orderActions";
import OrdersScreen from "./view";

const mapStateToProps = ({ order }) => {
  return { order };
};

const mapDispatchToProps = (dispatch) => ({
  handleGetOrders: () => {
    dispatch(getOrdersAction());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(OrdersScreen);
