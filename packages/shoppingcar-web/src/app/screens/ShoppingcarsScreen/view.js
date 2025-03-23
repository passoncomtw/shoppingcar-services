import { Box, Text, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import TableSection from "../../components/TableSection";

const ShoppingcarsScreen = (props) => {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [filterValue, setFilterValue] = useState("");
  
  useEffect(() => {
    props.handleGetShoppingcars({
      pageSize: 10,
    });
  }, []);

  // 計算總頁數
  const totalPages = Math.ceil(props.totalAmount / 10);

  // 欄位定義
  const columns = [
    { 
      key: "user", 
      title: "暱稱",
      render: (item) => item.user.name
    },
    { key: "productCount", title: "商品數量" },
    { 
      key: "totalAmount", 
      title: "商品總額",
      render: (item) => (
        <Text>{item.totalAmount}</Text>
      )
    },
    {
      key: "actions",
      title: "操作",
      render: (item) => (
        <Button 
          size="sm" 
          colorScheme="red" 
          onClick={() => handleClearCart(item.id)}
        >
          清空購物車
        </Button>
      )
    }
  ];

  // 清空購物車處理函數
  const handleClearCart = (id) => {
    console.log(`清空購物車: ${id}`);
    // 實際的清空購物車邏輯可在此實現
  };

  // 將資料轉換為 TableSection 需要的格式
  const tableData = props.shoppingcarItems.map(item => ({
    ...item,
    viewUrl: `/shoppingcars/${item.id}`
  }));

  // 篩選選項
  const filterOptions = [
    { label: "全部購物車", value: "" },
    { label: "商品數量 > 5", value: "items_gt_5" },
    { label: "總額 > 1000", value: "amount_gt_1000" }
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
      props.handleGetShoppingcars({
        pageSize: 10,
        startCursor: props.pageInfo.startCursor,
        onSuccess: () => setPage(newPage),
      });
    } else if (newPage > page) {
      props.handleGetShoppingcars({
        pageSize: 10,
        endCursor: props.pageInfo.endCursor,
        onSuccess: () => setPage(newPage),
      });
    }
  };

  return (
    <Box bg="gray.50" minH="100vh" p={6}>
      <TableSection
        title="購物車管理"
        searchPlaceholder="搜尋用戶名稱..."
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

export default ShoppingcarsScreen;
