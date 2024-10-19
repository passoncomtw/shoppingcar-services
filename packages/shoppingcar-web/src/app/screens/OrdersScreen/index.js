import { connect } from "react-redux";
import { getOrdersAction } from "../../actions/orderActions";
import OrdersScreen from "./view";

const mapStateToProps = ({ order }) => ({
  orderItems: order.items,
  pageInfo: order.pageInfo,
  totalAmount: order.totalAmount,
});

const mapDispatchToProps = (dispatch) => ({
  handleGetOrders: (payload) => {
    dispatch(getOrdersAction(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(OrdersScreen);
