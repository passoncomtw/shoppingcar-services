import { connect } from "react-redux";
import CreateMerchantScreen from "./view";
import { updateMerchantsAction } from "../../actions/merchantActions";

const mapStateToProps = ({ auth }) => ({
  authToken: `Bearer ${auth.token}`,
});

const mapDispatchToProps = (dispatch) => ({
    handleUpdateMerchant: payload => {
        dispatch(updateMerchantsAction(payload));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateMerchantScreen);
