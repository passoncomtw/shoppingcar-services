import { connect } from "react-redux";
import { getOrderDetailAction } from "../../actions/orderActions";
import OrderDetailScreen from "./view";

const mapStateToProps = ({order}) => ({
    orderDetail: order.detail,
});

const mapDispatchToProps = (dispatch) => ({
  handleGetOrderDetail: (payload) => {
    dispatch(getOrderDetailAction(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailScreen);
