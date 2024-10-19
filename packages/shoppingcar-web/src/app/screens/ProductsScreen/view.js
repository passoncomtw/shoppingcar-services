import { Box, Button, Flex, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Pagination from "../../components/Pagination";

const ProductsScreen = (props) => {
  const [page, setPage] = useState(1);
  useEffect(() => {
    props.handleGetProducts({
      pageSize: 10,
    });
  }, []);
  return (
    <Box bg="white">
      <Flex paddingRight={10} paddingTop={10} justify="right">
        <Button as="a" href="/products/create" style={{ textDecoration: "none" }}>
          新增商品
        </Button>
      </Flex>
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
                  <Button as="a" href={`/products/update/${productItem.id}`}>編輯</Button>
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
          props.handleGetProducts({
            pageSize: 10,
            startCursor: props.pageInfo.startCursor,
            onSuccess: () => setPage(page - 1),
          })
        }
        handleNextPage={() =>
          props.handleGetProducts({
            pageSize: 10,
            endCursor: props.pageInfo.endCursor,
            onSuccess: () => setPage(page + 1),
          })
        }
      />
    </Box>
  );
};

export default ProductsScreen;
