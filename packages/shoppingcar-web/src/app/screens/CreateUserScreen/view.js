import { Formik, Field } from "formik";
import {
  Box,
  Text,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Textarea,
  Select,
} from "@chakra-ui/react";

const PublicScreen = (props) => {
  return (
  <Flex bg="gray.100" align="center" justify="center" h="100vh">
    <Box bg="white" p={6} rounded="md" w="40%">
      <Box display='flex' align="center">
        <Text fontSize='xl'>新增會員</Text>
      </Box>
      <Formik
        initialValues={{
          name: "",
          subtitle: "",
          description: "",
          merchantId: null,
          stockAmount: 0,
          price: 0,
        }}
        onSubmit={(values) => {
          // props.handleSubmit(values);
        }}
      >
        {({ handleSubmit, errors, touched }) => (
          <form onSubmit={handleSubmit}>
            <VStack spacing={4} align="flex-start">
              <FormControl>
                <FormLabel htmlFor="name">名稱</FormLabel>
                <Field
                  as={Input}
                  id="name"
                  name="name"
                  variant="filled"
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="account">商家</FormLabel>
                <Select placeholder='Select option' value="option2">
                  <option value='option1'>Option 1</option>
                  <option value='option2'>Option 2</option>
                  <option value='option3'>Option 3</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="stockAmount">庫存量</FormLabel>
                <Field
                  as={Input}
                  id="stockAmount"
                  name="stockAmount"
                  variant="filled"
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="price">價格</FormLabel>
                <Field
                  as={Input}
                  id="price"
                  name="price"
                  variant="filled"
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="subtitle">次抬頭</FormLabel>
                <Textarea
                  as={Input}
                  id="subtitle"
                  name="subtitle"
                  placeholder='請輸入次抬頭'
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="description">價格</FormLabel>
                <Textarea
                  as={Input}
                  id="description"
                  name="description"
                  placeholder='請輸入次描述'
                />
              </FormControl>
              <Button type="submit" colorScheme="purple" width="full">
                新增會員
              </Button>
            </VStack>
          </form>
        )}
      </Formik>
    </Box>
  </Flex>
  );
}

export default PublicScreen;
