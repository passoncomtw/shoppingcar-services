import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
  Button,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { PaginationTable } from "table-pagination-chakra-ui"

const ProductsScreen = (props) => {

  return (
    <Box marginTop={20} bg='white'>
      <TableContainer>
        <Table variant='simple'>
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
            <Tr>
              <Td>怪物糖果</Td>
              <Td>糖果愛好者</Td>
              <Td><Text color='#0DC884'>上架</Text></Td>
              <Td>$20.00</Td>
              <Td>20</Td>
              <Td>2</Td>
              <Td><Button>編輯</Button></Td>
            </Tr>
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
}

export default ProductsScreen;
