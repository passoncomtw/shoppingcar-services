import { connect } from "react-redux";
import LoginScreen from "./view";

const mapStateToProps = () => ({aaa: "aaa"});

const mapDispatchToProps = () => ({aaafunc: () => false});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);