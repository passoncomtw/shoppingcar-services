import { Box, Button, Flex, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Pagination from "../../components/Pagination";

const UsersScreen = (props) => {
  const [page, setPage] = useState(1);
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
            {props.userItems.map((item, index) => (
              <Tr key={`${item.name}-${index}`}>
                <Td>{item.phone}</Td>
                <Td>{item.name}</Td>
                <Td>
                  <Text color="#0DC884">-</Text>
                </Td>
                <Td>
                  <Button as="a" href={`/users/update/${item.id}`}>
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
          props.handleGetUsers({
            pageSize: 10,
            startCursor: props.pageInfo.startCursor,
            onSuccess: () => setPage(page - 1),
          })
        }
        handleNextPage={() =>
          props.handleGetUsers({
            pageSize: 10,
            endCursor: props.pageInfo.endCursor,
            onSuccess: () => setPage(page + 1),
          })
        }
      />
    </Box>
  );
};

export default UsersScreen;
