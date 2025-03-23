import { connect } from 'react-redux';
import MerchantEditScreen from './view';

// 映射 Redux store 中的狀態到組件的 props
const mapStateToProps = (state) => ({
  merchant: state.merchants.currentMerchant || {},
  loading: state.merchants.loading,
  error: state.merchants.error,
  isNew: !state.merchants.currentMerchant,
});

// 映射 dispatch 方法到組件的 props
const mapDispatchToProps = (dispatch) => ({
  fetchMerchant: (id) => {
    // 在這裡實現獲取商家詳情的 action
    console.log('獲取商家詳情，ID:', id);
  },
  saveMerchant: (merchantData) => {
    // 在這裡實現保存商家資料的 action
    console.log('保存商家資料:', merchantData);
  },
  resetMerchantForm: () => {
    // 在這裡實現重置表單的 action
    console.log('重置商家表單');
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MerchantEditScreen); 