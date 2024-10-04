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

const UsersScreen = (props) => {

  return (
    <Box marginTop={20} bg='white'>
      <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>手機號碼</Th>
              <Th>暱稱</Th>
              <Th>信箱</Th>
              <Th>狀態</Th>
              <Th>操作</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>0987654321</Td>
              <Td>tomastest001</Td>
              <Td>tomastest001@aaa.com</Td>
              <Td><Text color='#0DC884'>-</Text></Td>
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

export default UsersScreen;
