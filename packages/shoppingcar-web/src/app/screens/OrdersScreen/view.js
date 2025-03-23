import { Box, Text, Badge } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import TableSection from "../../components/TableSection";

const OrdersScreen = (props) => {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [filterValue, setFilterValue] = useState("");
  
  useEffect(() => {
    props.handleGetOrders({
      pageSize: 10,
    });
  }, []);

  // 計算總頁數
  const totalPages = Math.ceil(props.totalAmount / 10);

  // 狀態顏色映射
  const statusColorMap = {
    "pending": "yellow",
    "paid": "blue",
    "processing": "purple",
    "completed": "green",
    "cancelled": "red"
  };

  // 欄位定義
  const columns = [
    { 
      key: "id", 
      title: "訂單編號",
      render: (item) => (
        <Text color="blue.600" fontWeight="medium">#{item.id}</Text>
      )
    },
    { 
      key: "userName", 
      title: "用戶",
      render: (item) => item.userName
    },
    { 
      key: "items", 
      title: "產品數量",
      render: (item) => item.items
    },
    { 
      key: "total", 
      title: "總額",
      render: (item) => (
        <Text>${parseFloat(item.total).toFixed(2)}</Text>
      )
    },
    { 
      key: "status", 
      title: "狀態",
      render: (item) => {
        const status = item.status || "processing";
        return (
          <Badge 
            px={2} 
            py={1} 
            borderRadius="full" 
            colorScheme={statusColorMap[status]} 
            fontSize="xs"
          >
            {status === "pending" ? "待付款" : 
             status === "paid" ? "已付款" : 
             status === "processing" ? "處理中" : 
             status === "completed" ? "已完成" : 
             "已取消"}
          </Badge>
        );
      }
    },
    { 
      key: "createdAt", 
      title: "下單時間",
      render: (item) => {
        // 假設有 createdAt 欄位，或使用當前時間作為示例
        const date = item.createdAt || new Date().toISOString();
        return new Date(date).toLocaleString('zh-TW');
      }
    }
  ];

  // 將資料轉換為 TableSection 需要的格式，為每筆訂單添加隨機狀態和創建時間
  const tableData = props.orderItems.map(item => {
    const statuses = ["pending", "paid", "processing", "completed", "cancelled"];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    
    return {
      ...item,
      status: randomStatus,
      createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
      viewUrl: `/orders/${item.id}`
    };
  });

  // 篩選選項
  const filterOptions = [
    { label: "全部訂單", value: "" },
    { label: "待付款", value: "pending" },
    { label: "已付款", value: "paid" },
    { label: "處理中", value: "processing" },
    { label: "已完成", value: "completed" },
    { label: "已取消", value: "cancelled" }
  ];

  // 處理搜尋
  const handleSearch = (text) => {
    setSearchText(text);
    // 實際的搜尋邏輯可在此實現
    console.log("搜尋文字:", text);
  };

  // 處理篩選
  const handleFilter = (value) => {
    setFilterValue(value);
    // 實際的篩選邏輯可在此實現
    console.log("篩選值:", value);
  };

  // 處理分頁
  const handlePageChange = (newPage) => {
    if (newPage < page) {
      props.handleGetOrders({
        pageSize: 10,
        startCursor: props.pageInfo.startCursor,
        onSuccess: () => setPage(newPage),
      });
    } else if (newPage > page) {
      props.handleGetOrders({
        pageSize: 10,
        endCursor: props.pageInfo.endCursor,
        onSuccess: () => setPage(newPage),
      });
    }
  };

  return (
    <Box bg="gray.50" minH="100vh" p={6}>
      <TableSection
        title="訂單管理"
        searchPlaceholder="搜尋訂單編號或用戶名稱..."
        filterOptions={filterOptions}
        columns={columns}
        data={tableData}
        onSearch={handleSearch}
        onFilter={handleFilter}
        currentPage={page}
        totalPages={totalPages}
        totalItems={props.totalAmount}
        pageSize={10}
        onPageChange={handlePageChange}
      />
    </Box>
  );
};

export default OrdersScreen;
