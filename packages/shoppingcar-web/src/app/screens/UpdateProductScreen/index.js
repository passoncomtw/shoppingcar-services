import { connect } from "react-redux";
import UpdateProductScreen from "./view";
import { updateProductAction } from "../../actions/productActions";

const mapStateToProps = ({ auth }) => ({
  authToken: `Bearer ${auth.token}`,
});

const mapDispatchToProps = (dispatch) => ({
    handleUpdateProduct: payload => {
        dispatch(updateProductAction(payload));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProductScreen);
