import { Box, Button, Flex, Select, FormControl, FormErrorMessage, FormLabel, Input, Textarea, Text, VStack } from "@chakra-ui/react";
import { Field, Formik } from "formik";
import isEmpty from "lodash/isEmpty";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProductSchema } from "../../constants/yupSchemas/product";
import formCheck from "../../helpers/formCheck";

const INITIAL_FORMDATA = {
  name: "",
  price: 0,
  stockAmount: 0,
  merchantId: null,
  description: "",
  subtitle: "",
  errors: {},
};

const CreateProductScreen = (props) => {
  const [formData, setFormData] = useState({ ...INITIAL_FORMDATA });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    props.handleGetMerchantItems();
  }, []);

  return (
    <Flex bg="gray.100" align="center" justify="center" h="100vh">
      <Box bg="white" p={6} rounded="md" w="40%">
        <Box display="flex" align="center">
          <Text fontSize="xl">新增商品</Text>
        </Box>
        <Formik
          initialValues={formData}
          onSubmit={async () => {
            try {
              const validatedPayload = await formCheck.handleYupSchema(createProductSchema, formData);
              setErrors({});
              props.handleCreateProduct({
                ...validatedPayload,
                onSuccess: () => navigate("/products"),
              });
            } catch (error) {
              const errors = formCheck.handleYupErrors(error);
              setErrors(errors);
            }
            // props.handleCreateUser(values);
          }}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <VStack spacing={4} align="flex-start">
                <FormControl isInvalid={!isEmpty(errors.name)}>
                  <FormLabel htmlFor="name">名稱</FormLabel>
                  <Field
                    as={Input}
                    id="name"
                    name="name"
                    variant="filled"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  <FormErrorMessage>{errors.name}</FormErrorMessage>
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
                <FormControl isInvalid={!isEmpty(errors.price)}>
                  <FormLabel htmlFor="price">價格</FormLabel>
                  <Field
                    as={Input}
                    id="price"
                    name="price"
                    variant="filled"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  />
                  <FormErrorMessage>{errors.price}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!isEmpty(errors.stockAmount)}>
                  <FormLabel htmlFor="stockAmount">庫存</FormLabel>
                  <Field
                    as={Input}
                    id="stockAmount"
                    name="stockAmount"
                    variant="filled"
                    type="stockAmount"
                    value={formData.stockAmount}
                    onChange={(e) => setFormData({ ...formData, stockAmount: e.target.value })}
                  />
                  <FormErrorMessage>{errors.stockAmount}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!isEmpty(errors.subtitle)}>
                  <FormLabel htmlFor="subtitle">次抬頭</FormLabel>
                  <Field
                    as={Textarea}
                    id="subtitle"
                    name="subtitle"
                    variant="filled"
                    type="password"
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  />
                  <FormErrorMessage>{errors.subtitle}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!isEmpty(errors.description)}>
                  <FormLabel htmlFor="description">內容</FormLabel>
                  <Field
                    as={Textarea}
                    id="description"
                    name="description"
                    variant="filled"
                    type="password"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                  <FormErrorMessage>{errors.subtitle}</FormErrorMessage>
                </FormControl>
                <Button type="submit" colorScheme="purple" width="full">
                  新增商品
                </Button>
              </VStack>
            </form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
};

export default CreateProductScreen;
