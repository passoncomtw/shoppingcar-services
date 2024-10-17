import { Box, Button, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { useEffect } from "react";
import { PaginationTable } from "table-pagination-chakra-ui";

const ProductsScreen = (props) => {
  useEffect(() => {
    props.handleGetProducts({
      pageSize: 10,
    });
  }, []);
  return (
    <Box marginTop={20} bg="white">
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>名稱</Th>
              <Th>商家</Th>
              <Th>狀態</Th>
              <Th>價格</Th>
              <Th>現有庫存</Th>
              <Th>未發貨</Th>
              <Th>操作</Th>
            </Tr>
          </Thead>
          <Tbody>
            {props.productItems.map((productItem) => (
              <Tr>
                <Td>{productItem.name}</Td>
                <Td>{productItem.merchant.name}</Td>
                <Td>
                  <Text color="#0DC884">-</Text>
                </Td>
                <Td>${productItem.price.toFixed(2)}</Td>
                <Td>{productItem.stockAmount}</Td>
                <Td>-</Td>
                <Td>
                  <Button>編輯</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <PaginationTable
        pageSize={10}
        setPageSize={() => false}
        pageIndex={1}
        setPageIndex={() => false}
        totalItemsCount={10}
        pageSizeOptions={[10]}
      />
    </Box>
  );
};

export default ProductsScreen;
