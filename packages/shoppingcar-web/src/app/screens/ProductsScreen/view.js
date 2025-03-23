import { Box, Text, Badge } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import TableSection from "../../components/TableSection";

const ProductsScreen = (props) => {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [filterValue, setFilterValue] = useState("");
  
  useEffect(() => {
    props.handleGetProducts({
      pageSize: 10,
    });
  }, []);

  // 計算總頁數
  const totalPages = Math.ceil(props.totalAmount / 10);

  // 欄位定義
  const columns = [
    { key: "name", title: "名稱" },
    { 
      key: "merchant", 
      title: "商家",
      render: (item) => item.merchant.name
    },
    { 
      key: "status", 
      title: "狀態",
      render: (item) => (
        <Text color="#0DC884">-</Text>
      )
    },
    {
      key: "price",
      title: "價格",
      render: (item) => `$${item.price.toFixed(2)}`
    },
    { key: "stockAmount", title: "現有庫存" },
    { 
      key: "unshipped", 
      title: "未發貨",
      render: () => "-"
    },
  ];

  // 將資料轉換為 TableSection 需要的格式
  const tableData = props.productItems.map(item => ({
    ...item,
    editUrl: `/products/update/${item.id}`
  }));

  // 篩選選項
  const filterOptions = [
    { label: "全部商品", value: "" },
    { label: "庫存不足", value: "low_stock" },
    { label: "已下架", value: "inactive" }
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
      props.handleGetProducts({
        pageSize: 10,
        startCursor: props.pageInfo.startCursor,
        onSuccess: () => setPage(newPage),
      });
    } else if (newPage > page) {
      props.handleGetProducts({
        pageSize: 10,
        endCursor: props.pageInfo.endCursor,
        onSuccess: () => setPage(newPage),
      });
    }
  };

  // 處理新增
  const handleAdd = () => {
    window.location.href = "/products/create";
  };

  return (
    <Box bg="gray.50" minH="100vh" p={6}>
      <TableSection
        title="商品管理"
        searchPlaceholder="搜尋商品名稱、商家..."
        filterOptions={filterOptions}
        columns={columns}
        data={tableData}
        onSearch={handleSearch}
        onFilter={handleFilter}
        onAdd={handleAdd}
        addButtonText="新增商品"
        currentPage={page}
        totalPages={totalPages}
        totalItems={props.totalAmount}
        pageSize={10}
        onPageChange={handlePageChange}
      />
    </Box>
  );
};

export default ProductsScreen;
