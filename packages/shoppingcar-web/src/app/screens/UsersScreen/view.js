import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import TableSection from "../../components/TableSection";

const UsersScreen = (props) => {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [filterValue, setFilterValue] = useState("");
  
  useEffect(() => {
    props.handleGetUsers({
      pageSize: 10,
    });
  }, []);

  // 計算總頁數
  const totalPages = Math.ceil(props.totalAmount / 10);

  // 欄位定義
  const columns = [
    { key: "phone", title: "手機號碼" },
    { key: "name", title: "暱稱" },
    { 
      key: "status", 
      title: "狀態",
      render: (item) => (
        <Box color="#0DC884">-</Box>
      )
    },
  ];

  // 將資料轉換為 TableSection 需要的格式
  const tableData = props.userItems.map(item => ({
    ...item,
    editUrl: `/users/update/${item.id}`
  }));

  // 篩選選項
  const filterOptions = [
    { label: "正常", value: "active" },
    { label: "已禁用", value: "disabled" }
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
      props.handleGetUsers({
        pageSize: 10,
        startCursor: props.pageInfo.startCursor,
        onSuccess: () => setPage(newPage),
      });
    } else if (newPage > page) {
      props.handleGetUsers({
        pageSize: 10,
        endCursor: props.pageInfo.endCursor,
        onSuccess: () => setPage(newPage),
      });
    }
  };

  // 處理新增
  const handleAdd = () => {
    window.location.href = "/users/create";
  };

  return (
    <Box bg="gray.50" minH="100vh" p={6}>
      <TableSection
        title="會員管理"
        searchPlaceholder="搜尋會員..."
        filterOptions={filterOptions}
        columns={columns}
        data={tableData}
        onSearch={handleSearch}
        onFilter={handleFilter}
        onAdd={handleAdd}
        addButtonText="新增會員"
        currentPage={page}
        totalPages={totalPages}
        totalItems={props.totalAmount}
        pageSize={10}
        onPageChange={handlePageChange}
      />
    </Box>
  );
};

export default UsersScreen;
