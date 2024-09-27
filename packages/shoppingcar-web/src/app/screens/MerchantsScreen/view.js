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
import { PaginationTable } from "table-pagination-chakra-ui"

const MerchantsScreen = (props) => {
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
            <Tr>
              <Td>Wendy888</Td>
              <Td>溫蒂</Td>
              <Td>wendy888@gmail.com</Td>
              <Td>0987654321</Td>
              <Td><Text color='#0DC884'>啟用</Text></Td>
            </Tr>
            <Tr>
              <Td>Wendy888</Td>
              <Td>溫蒂</Td>
              <Td>wendy888@gmail.com</Td>
              <Td>0987654321</Td>
              <Td><Text color='#0DC884'>啟用</Text></Td>
            </Tr>
            <Tr>
              <Td>Wendy888</Td>
              <Td>溫蒂</Td>
              <Td>wendy888@gmail.com</Td>
              <Td>0987654321</Td>
              <Td><Text color='#0DC884'>啟用</Text></Td>
            </Tr>
            <Tr>
              <Td>Wendy888</Td>
              <Td>溫蒂</Td>
              <Td>wendy888@gmail.com</Td>
              <Td>0987654321</Td>
              <Td><Text color='#0DC884'>啟用</Text></Td>
            </Tr>
            <Tr>
              <Td>Wendy888</Td>
              <Td>溫蒂</Td>
              <Td>wendy888@gmail.com</Td>
              <Td>0987654321</Td>
              <Td><Text color='#0DC884'>啟用</Text></Td>
            </Tr>
            <Tr>
              <Td>Wendy888</Td>
              <Td>溫蒂</Td>
              <Td>wendy888@gmail.com</Td>
              <Td>0987654321</Td>
              <Td><Text color='#0DC884'>啟用</Text></Td>
            </Tr>
            <Tr>
              <Td>Wendy888</Td>
              <Td>溫蒂</Td>
              <Td>wendy888@gmail.com</Td>
              <Td>0987654321</Td>
              <Td><Text color='#FF4A46'>停用</Text></Td>
            </Tr>
            <Tr>
              <Td>Wendy888</Td>
              <Td>溫蒂</Td>
              <Td>wendy888@gmail.com</Td>
              <Td>0987654321</Td>
              <Td><Text color='#FF8E00'>凍結</Text></Td>
            </Tr>
            <Tr>
              <Td>Wendy888</Td>
              <Td>溫蒂</Td>
              <Td>wendy888@gmail.com</Td>
              <Td>0987654321</Td>
              <Td><Text color='#0DC884'>啟用</Text></Td>
            </Tr>
            <Tr>
              <Td>Wendy888</Td>
              <Td>溫蒂</Td>
              <Td>wendy888@gmail.com</Td>
              <Td>0987654321</Td>
              <Td><Text color='#0DC884'>啟用</Text></Td>
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
        pageSizeOptions={[10, 25, 50]}
      />
    </Box>
  );
}

export default MerchantsScreen;
