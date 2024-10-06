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
import { useEffect, useState } from "react";

const CreateUserScreen = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    subtitle: "",
    description: "",
    merchantId: null,
    stockAmount: 0,
    price: 0,
  });
  useEffect(() => {
    props.handleGetMerchantItems();
  }, []);

  return (
  <Flex bg="gray.100" align="center" justify="center" h="100vh">
    <Box bg="white" p={6} rounded="md" w="40%">
      <Box display='flex' align="center">
        <Text fontSize='xl'>新增會員</Text>
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
                <Field
                  as={Input}
                  id="name"
                  name="name"
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  value={formData.name}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="account">商家</FormLabel>
                <Select placeholder='Select option' value={formData.merchantId}>
                  {props.merchantItems.map(item => (<option value={item.id}>{item.name}</option>))}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="stockAmount">庫存量</FormLabel>
                <Field
                  as={Input}
                  id="stockAmount"
                  name="stockAmount"
                  onChange={e => setFormData({...formData, stockAmount: e.target.value})}
                  value={formData.stockAmount}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="price">價格</FormLabel>
                <Field
                  as={Input}
                  id="price"
                  name="price"
                  onChange={e => setFormData({...formData, price: e.target.value})}
                  value={formData.price}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="subtitle">次抬頭</FormLabel>
                <Textarea
                  as={Input}
                  id="subtitle"
                  name="subtitle"
                  placeholder='請輸入次抬頭'
                  onChange={e => setFormData({...formData, subtitle: e.target.value})}
                  value={formData.subtitle}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="description">價格</FormLabel>
                <Textarea
                  as={Input}
                  id="description"
                  name="description"
                  placeholder='請輸入次描述'
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  value={formData.description}
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

export default CreateUserScreen;
