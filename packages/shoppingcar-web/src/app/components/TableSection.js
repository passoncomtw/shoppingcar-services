import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Input,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  HStack,
  Badge,
  useColorModeValue,
  Tooltip,
  Select,
  Center,
  VStack,
  Spinner,
  Icon,
} from "@chakra-ui/react";
import { SearchIcon, AddIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import { FiInbox, FiAlertCircle } from "react-icons/fi";

/**
 * 通用表格部分組件
 * 包含標題、搜尋、篩選、表格和分頁功能
 */
const TableSection = ({
  title,             // 表格標題
  searchPlaceholder, // 搜尋框提示文字
  filterOptions,     // 篩選選項
  columns,           // 表格列定義
  data,              // 表格數據
  onSearch,          // 搜尋處理函數
  onFilter,          // 篩選處理函數
  onAdd,             // 新增處理函數
  addButtonText,     // 新增按鈕文字
  currentPage,       // 當前頁碼
  totalPages,        // 總頁數
  totalItems,        // 總記錄數
  pageSize,          // 每頁記錄數
  onPageChange,      // 頁碼變更處理函數
  isLoading,         // 加載狀態
  emptyMessage = "無資料"  // 空數據提示
}) => {
  // 獲取當前顯示的記錄範圍
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);
  
  // 顏色設置
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const headerBg = useColorModeValue("gray.50", "gray.700");
  const hoverBg = useColorModeValue("gray.50", "gray.700");
  
  // 搜尋文字
  const [searchText, setSearchText] = useState("");
  
  // 處理搜尋按鈕點擊
  const handleSearchClick = () => {
    if (onSearch) {
      onSearch(searchText);
    }
  };
  
  // 處理搜尋框輸入變化
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };
  
  // 處理按 Enter 鍵搜尋
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  // 渲染表格內容
  const renderTableContent = () => {
    // 加載中狀態
    if (isLoading) {
      return (
        <Tr>
          <Td colSpan={columns.length + 1} textAlign="center" py={12}>
            <Center>
              <VStack spacing={4}>
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="xl"
                />
                <Text color="gray.500" fontWeight="medium">
                  載入中...
                </Text>
              </VStack>
            </Center>
          </Td>
        </Tr>
      );
    }
    
    // 無數據狀態
    if (data.length === 0) {
      return (
        <Tr>
          <Td colSpan={columns.length + 1} textAlign="center" py={12}>
            <Center>
              <VStack spacing={4}>
                <Icon as={FiInbox} boxSize={12} color="gray.400" />
                <Text color="gray.500" fontWeight="medium" fontSize="lg">
                  {emptyMessage}
                </Text>
                <Text color="gray.400" fontSize="sm">
                  目前沒有任何資料可以顯示
                </Text>
              </VStack>
            </Center>
          </Td>
        </Tr>
      );
    }
    
    // 有數據狀態
    return data.map((item, rowIndex) => (
      <Tr key={rowIndex} _hover={{ bg: hoverBg }}>
        {columns.map((column, colIndex) => (
          <Td 
            key={`${rowIndex}-${colIndex}`} 
            py={4} 
            px={6}
            whiteSpace="nowrap"
            fontSize="sm"
          >
            {column.render ? column.render(item) : item[column.key]}
          </Td>
        ))}
        <Td py={4} px={6} whiteSpace="nowrap">
          <HStack spacing={2}>
            {item.viewUrl && (
              <Tooltip label="查看詳情">
                <IconButton
                  aria-label="查看"
                  icon={<ViewIcon />}
                  size="sm"
                  colorScheme="blue"
                  variant="ghost"
                  as="a"
                  href={item.viewUrl}
                />
              </Tooltip>
            )}
            {item.editUrl && (
              <Tooltip label="編輯">
                <IconButton
                  aria-label="編輯"
                  icon={<EditIcon />}
                  size="sm"
                  colorScheme="blue"
                  as="a"
                  href={item.editUrl}
                />
              </Tooltip>
            )}
          </HStack>
        </Td>
      </Tr>
    ));
  };

  return (
    <Box pb={6}>
      {/* 頁面標題與功能區 */}
      <Flex 
        justify="space-between" 
        align="center" 
        mb={6} 
        wrap={{ base: "wrap", md: "nowrap" }}
        gap={4}
      >
        <Text fontSize="2xl" fontWeight="bold" color="gray.800">
          {title}
        </Text>
        
        {onAdd && (
          <Button
            leftIcon={<AddIcon />}
            colorScheme="blue"
            onClick={onAdd}
            borderRadius="md"
            size="md"
          >
            {addButtonText || "新增"}
          </Button>
        )}
      </Flex>

      {/* 搜尋與篩選區域 */}
      <Box 
        bg="white" 
        p={4} 
        rounded="lg" 
        shadow="sm" 
        mb={6} 
        borderWidth="1px" 
        borderColor={borderColor}
      >
        <Flex 
          direction={{ base: "column", md: "row" }} 
          gap={4} 
          wrap="wrap"
        >
          {filterOptions && (
            <Box flex="1" minW={{ base: "100%", md: "200px" }}>
              <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={1}>
                篩選條件
              </Text>
              <Select 
                onChange={(e) => onFilter && onFilter(e.target.value)}
                borderRadius="md"
                size="md"
                isDisabled={isLoading}
              >
                <option value="">全部</option>
                {filterOptions.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </Box>
          )}

          <Box flex="1" minW={{ base: "100%", md: "200px" }}>
            <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={1}>
              搜索
            </Text>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.400" />
              </InputLeftElement>
              <Input
                placeholder={searchPlaceholder || "搜尋..."}
                value={searchText}
                onChange={handleSearchChange}
                onKeyPress={handleKeyPress}
                borderRadius="md"
                isDisabled={isLoading}
              />
              <InputRightElement width="4.5rem">
                <Button 
                  h="1.75rem" 
                  size="sm" 
                  colorScheme="blue"
                  onClick={handleSearchClick}
                  isDisabled={isLoading}
                  isLoading={isLoading}
                >
                  搜尋
                </Button>
              </InputRightElement>
            </InputGroup>
          </Box>
        </Flex>
      </Box>

      {/* 表格區域 */}
      <Box 
        bg="white" 
        rounded="lg" 
        shadow="sm"
        borderWidth="1px"
        borderColor={borderColor}
        overflowX="auto"
        position="relative"
      >
        <Table variant="simple" w="100%">
          <Thead bg={headerBg}>
            <Tr>
              {columns.map((column, index) => (
                <Th 
                  key={index} 
                  py={3} 
                  px={6}
                  fontSize="xs" 
                  textTransform="uppercase" 
                  color="gray.500"
                >
                  {column.title}
                </Th>
              ))}
              <Th 
                py={3} 
                px={6}
                fontSize="xs" 
                textTransform="uppercase" 
                color="gray.500"
              >
                操作
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {renderTableContent()}
          </Tbody>
        </Table>

        {/* 分頁控制區 - 僅在有數據且不在加載狀態下顯示 */}
        {data.length > 0 && !isLoading && (
          <Flex 
            justify="space-between" 
            align="center" 
            px={6} 
            py={3} 
            borderTopWidth="1px" 
            borderColor={borderColor}
            direction={{ base: "column", md: "row" }}
            gap={{ base: 4, md: 0 }}
          >
            <Text fontSize="sm" color="gray.700">
              顯示第 <Text as="span" fontWeight="medium">{data.length > 0 ? startItem : 0}</Text> 至{" "}
              <Text as="span" fontWeight="medium">{data.length > 0 ? endItem : 0}</Text> 項結果，共{" "}
              <Text as="span" fontWeight="medium">{totalItems}</Text> 項
            </Text>

            <HStack spacing={2}>
              <Button
                size="sm"
                onClick={() => onPageChange(currentPage - 1)}
                isDisabled={currentPage <= 1}
                variant="outline"
              >
                上一頁
              </Button>
              
              {/* 頁碼按鈕 */}
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                // 計算要顯示的頁碼
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <Button
                    key={i}
                    size="sm"
                    onClick={() => onPageChange(pageNum)}
                    variant={currentPage === pageNum ? "solid" : "outline"}
                    colorScheme={currentPage === pageNum ? "blue" : "gray"}
                    display={{ base: i === 0 || i === 4 || pageNum === currentPage ? "inline-flex" : "none", md: "inline-flex" }}
                  >
                    {pageNum}
                  </Button>
                );
              })}
              
              <Button
                size="sm"
                onClick={() => onPageChange(currentPage + 1)}
                isDisabled={currentPage >= totalPages}
                variant="outline"
              >
                下一頁
              </Button>
            </HStack>
          </Flex>
        )}
      </Box>
    </Box>
  );
};

export default TableSection; 