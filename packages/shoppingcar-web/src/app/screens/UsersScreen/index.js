import { connect } from "react-redux";
import { getUsersAction } from "../../actions/userActions";
import UsersScreen from "./view";

const mapStateToProps = ({ user }) => ({ userItems: user.items, pageInfo: user.pageInfo, totalAmount: user.totalAmount });

const mapDispatchToProps = (dispatch) => ({
  handleGetUsers: (payload) => {
    dispatch(getUsersAction(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersScreen);
