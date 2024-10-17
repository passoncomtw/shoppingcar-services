import { connect } from "react-redux";
import UpdateUserScreen from "./view";

const mapStateToProps = ({ auth }) => ({
  authToken: `Bearer ${auth.token}`,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUserScreen);
