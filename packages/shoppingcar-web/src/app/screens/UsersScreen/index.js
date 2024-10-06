import { connect } from 'react-redux';
import UsersScreen from './view';

const mapStateToProps = ({ merchant }) => ({ merchant });

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersScreen);
