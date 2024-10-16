import { Box, Button, Flex, FormControl, FormLabel, Input, Select, Text, Textarea, VStack } from "@chakra-ui/react";
import { Field, Formik } from "formik";
import { useEffect, useState } from "react";

const INITIAL_FORMDATA = {
  name: "",
  subtitle: "",
  description: "",
  merchantId: null,
  stockAmount: 0,
  price: 0,
};

const PublicScreen = (props) => {
  const [formData, setFormData] = useState({ ...INITIAL_FORMDATA });
  useEffect(() => {
    props.handleGetMerchantItems();
  }, []);
  return (
    <Flex bg="gray.100" align="center" justify="center" h="100vh">
      <Box bg="white" p={6} rounded="md" w="40%">
        <Box display="flex" align="center">
          <Text fontSize="xl">新增會員</Text>
        </Box>
        <Formik
          initialValues={formData}
          onSubmit={(values) => {
            // props.handleSubmit(values);
          }}
        >
          {({ handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <VStack spacing={4} align="flex-start">
                <FormControl>
                  <FormLabel htmlFor="name">名稱</FormLabel>
                  <Field as={Input} id="name" name="name" variant="filled" />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="account">商家</FormLabel>
                  <Select
                    placeholder="Select option"
                    value={formData.merchantId}
                    onChange={(e) => setFormData({ ...formData, merchantId: e.target.value })}
                  >
                    {props.merchantItems.map((merchantItem) => (
                      <option value={merchantItem.id}>{merchantItem.name}</option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="stockAmount">庫存量</FormLabel>
                  <Field as={Input} id="stockAmount" name="stockAmount" variant="filled" />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="price">價格</FormLabel>
                  <Field as={Input} id="price" name="price" variant="filled" />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="subtitle">次抬頭</FormLabel>
                  <Textarea as={Input} id="subtitle" name="subtitle" placeholder="請輸入次抬頭" />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="description">價格</FormLabel>
                  <Textarea as={Input} id="description" name="description" placeholder="請輸入次描述" />
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
};

export default PublicScreen;
