import { connect } from "react-redux";
import DashboardScreen from "./view";

const mapStateToProps = (state) => ({
  lastUpdated: new Date().toLocaleString('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }),
  statistics: {
    todayOrders: 35,
    todayRevenue: 12430,
    newUsers: 18,
    productSales: 143,
    ordersGrowth: 12,
    revenueGrowth: 8,
    usersGrowth: -5,
    salesGrowth: 15
  },
  recentOrders: [
    {
      id: "OR-2023-1124",
      user: "王小明",
      amount: 1200,
      status: "已完成",
      statusColor: "green",
      time: "2023-11-15 14:30"
    },
    {
      id: "OR-2023-1123",
      user: "林美玲",
      amount: 3540,
      status: "處理中",
      statusColor: "yellow",
      time: "2023-11-15 13:45"
    },
    {
      id: "OR-2023-1122",
      user: "陳大雄",
      amount: 860,
      status: "已付款",
      statusColor: "blue",
      time: "2023-11-15 12:20"
    }
  ]
});

const mapDispatchToProps = (dispatch) => ({
  refreshData: () => {
    // 在這裡可實作刷新資料的動作
    console.log("刷新資料");
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen); 