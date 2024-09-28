import {
  Box,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { PaginationTable } from "table-pagination-chakra-ui"

const MerchantsScreen = (props) => {
  useEffect(() => {
    props.handleGetMerchants({
      PageSize: 10,
    })
  }, []);

  const {merchant} = props;

  return (
    <Box marginTop={20} bg='white'>
      <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>帳號</Th>
              <Th>暱稱</Th>
              <Th>信箱</Th>
              <Th>手機號碼</Th>
              <Th>狀態</Th>
            </Tr>
          </Thead>
          <Tbody>
            {merchant.items.map(item => (
              <Tr>
              <Td>{item.name}</Td>
              <Td>{item.name}</Td>
              <Td>{item.email}</Td>
              <Td>{item.phone}</Td>
              <Td><Text color='#0DC884'>-</Text></Td>
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
        totalItemsCount={merchant.totalAmount}
        pageSizeOptions={[10]}
      />
    </Box>
  );
}

export default MerchantsScreen;
