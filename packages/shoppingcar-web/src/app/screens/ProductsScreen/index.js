import { connect } from "react-redux";
import { getProductsAction } from "../../actions/productActions";
import ProductsScreen from "./view";

const mapStateToProps = ({product}) => ({
    productItems: product.items,
    pageInfo: product.pageInfo,
    totalAmount: product.totalAmount,
});

const mapDispatchToProps = (dispatch) => ({
  handleGetProducts: (payload) => {
    dispatch(getProductsAction(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsScreen);
