import { connect } from "react-redux";
import { updateUserAction } from "../../actions/userActions";
import UpdateUserScreen from "./view";

const mapStateToProps = ({ auth }) => ({
  authToken: `Bearer ${auth.token}`,
});

const mapDispatchToProps = (dispatch) => ({
  handleUpdateUser: (payload) => {
    dispatch(updateUserAction(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUserScreen);
