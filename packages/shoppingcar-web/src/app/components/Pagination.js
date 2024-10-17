import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { Box, Center, Flex, IconButton, Text } from "@chakra-ui/react";
import isNaN from "lodash/isNaN";

const EMPTY_FUNCTION = () => false;

const Pagination = (props) => {
  const { page, pageSize, totalAmount, handlePrePage = EMPTY_FUNCTION, handleNextPage = EMPTY_FUNCTION } = props;
  const pageCount = Math.ceil(totalAmount / pageSize);
  const totalPageCount = isNaN(pageCount) ? 1 : pageCount;

  return (
    <Box w="100%" p={4}>
      <Flex justify="center">
        <IconButton disabled={page === 1} onClick={handlePrePage} icon={<ArrowLeftIcon />} />
        <Center marginLeft="20px" marginRight="20px">
          <Text>
            Page {props.page} Of {totalPageCount}
          </Text>
        </Center>
        <IconButton disabled={page === totalPageCount} onClick={handleNextPage} icon={<ArrowRightIcon />} />
      </Flex>
    </Box>
  );
};

export default Pagination;
