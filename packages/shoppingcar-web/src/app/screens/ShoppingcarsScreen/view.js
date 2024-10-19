import { Box, Button, Flex, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Pagination from "../../components/Pagination";

const ShoppingcarsScreen = (props) => {
  const [page, setPage] = useState(1);
  useEffect(() => {
    props.handleGetShoppingcars({
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
              <Th>商品數量</Th>
              <Th>商品總額</Th>
              <Th>操作</Th>
            </Tr>
          </Thead>
          <Tbody>
            {props.shoppingcarItems.map((item, index) => (
              <Tr key={`${item.name}-${index}`}>
                <Td>{item.user.name}</Td>
                <Td>{item.productCount}</Td>
                <Td>
                  <Text>{item.totalAmount}</Text>
                </Td>
                <Td>
                  <Button>
                    清空購物車
                  </Button>
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
          props.handleGetShoppingcars({
            pageSize: 10,
            startCursor: props.pageInfo.startCursor,
            onSuccess: () => setPage(page - 1),
          })
        }
        handleNextPage={() =>
          props.handleGetShoppingcars({
            pageSize: 10,
            endCursor: props.pageInfo.endCursor,
            onSuccess: () => setPage(page + 1),
          })
        }
      />
    </Box>
  );
};

export default ShoppingcarsScreen;
