import { Box, Button, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Pagination from "../../components/Pagination";

const OrdersScreen = (props) => {
  const [page, setPage] = useState(1);
  useEffect(() => {
    props.handleGetOrders({
      pageSize: 10,
    });
  }, []);
  return (
    <Box bg="white">
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>暱稱</Th>
              <Th>總額</Th>
              <Th>產品數量</Th>
              <Th>操作</Th>
            </Tr>
          </Thead>
          <Tbody>
            {props.orderItems.map((item, index) => (
              <Tr key={`${item.name}-${index}`}>
                <Td>{item.user.name}</Td>
                <Td>
                  <Text>{item.totalAmount}</Text>
                </Td>
                <Td>{item.productCount}</Td>
                <Td>
                  {/* <Button>清空購物車</Button> */}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Pagination
        page={page}
        totalAmount={props.totalAmount}
        pageSize={10}
        handlePrePage={() =>
          props.handleGetOrders({
            pageSize: 10,
            startCursor: props.pageInfo.startCursor,
            onSuccess: () => setPage(page - 1),
          })
        }
        handleNextPage={() =>
          props.handleGetOrders({
            pageSize: 10,
            endCursor: props.pageInfo.endCursor,
            onSuccess: () => setPage(page + 1),
          })
        }
      />
    </Box>
  );
};

export default OrdersScreen;
