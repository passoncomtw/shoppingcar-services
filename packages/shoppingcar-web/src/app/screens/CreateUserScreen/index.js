import { connect } from "react-redux";
import { createUserAction } from "../../actions/userActions";
import CreateUserScreen from "./view";

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = (dispatch) => ({
  handleCreateUser: (payload) => {
    dispatch(createUserAction(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateUserScreen);
