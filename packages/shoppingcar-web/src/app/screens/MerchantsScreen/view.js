import { Box, Button, Flex, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Pagination from "../../components/Pagination";

const MerchantsScreen = (props) => {
  const [page, setPage] = useState(1);
  useEffect(() => {
    props.handleGetMerchants({
      PageSize: 10,
    });
  }, []);

  const { merchant } = props;

  return (
    <Box bg="white">
      <Flex paddingRight={10} paddingTop={10} justify="right">
        <Button as="a" href="/merchants/create" style={{ textDecoration: "none" }}>
          新增商家
        </Button>
      </Flex>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>帳號</Th>
              <Th>暱稱</Th>
              <Th>信箱</Th>
              <Th>手機號碼</Th>
              <Th>操作</Th>
            </Tr>
          </Thead>
          <Tbody>
            {merchant.items.map((item, index) => (
              <Tr key={`${item.name}-${index}`}>
                <Td>{item.name}</Td>
                <Td>{item.name}</Td>
                <Td>{item.email}</Td>
                <Td>{item.phone}</Td>
                <Td>
                  <Button as="a" href={`/merchants/update/${item.id}`}>
                    編輯
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
          props.handleGetMerchants({
            pageSize: 10,
            startCursor: props.pageInfo.startCursor,
            onSuccess: () => setPage(page - 1),
          })
        }
        handleNextPage={() =>
          props.handleGetMerchants({
            pageSize: 10,
            endCursor: props.pageInfo.endCursor,
            onSuccess: () => setPage(page + 1),
          })
        }
      />
    </Box>
  );
};

export default MerchantsScreen;
