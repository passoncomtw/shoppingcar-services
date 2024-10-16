import { Box, Button, Flex, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { useEffect } from "react";
import { PaginationTable } from "table-pagination-chakra-ui";

const UsersScreen = (props) => {
  useEffect(() => {
    props.handleGetUsers({
      pageSize: 10,
    });
  }, []);
  return (
    <Box bg="white">
      <Flex paddingRight={10} paddingTop={10} justify="right">
        <Button as="a" href="/users/create" style={{ textDecoration: "none" }}>
          新增會員
        </Button>
      </Flex>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>手機號碼</Th>
              <Th>暱稱</Th>
              <Th>狀態</Th>
              <Th>操作</Th>
            </Tr>
          </Thead>
          <Tbody>
            {props.user.items.map((item, index) => (
              <Tr key={`${item.name}-${index}`}>
                <Td>{item.phone}</Td>
                <Td>{item.name}</Td>
                <Td>
                  <Text color="#0DC884">-</Text>
                </Td>
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

export default UsersScreen;
