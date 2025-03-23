import { connect } from "react-redux";
import SettingScreen from "./view";

const mapStateToProps = (state) => ({
  // 基本設定資訊可以從 state 中獲取
  user: state.auth.user || {}
});

const mapDispatchToProps = (dispatch) => ({
  // 可以添加保存設定的動作
  handleSaveSettings: (settings) => {
    console.log("保存設定:", settings);
    // 實際實現可以添加一個儲存設定的 action
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingScreen); 