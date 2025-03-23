import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import isEmpty from "lodash/isEmpty";
import isNull from "lodash/isNull";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductByIdResult } from "../../apis/api";
import { updateProductSchema } from "../../constants/yupSchemas/product";
import formCheck from "../../helpers/formCheck";

const INITIAL_FORMDATA = {
  name: "",
  price: 0,
  stockAmount: 0,
  description: "",
  subtitle: "",
  errors: {},
};

const UpdateProductScreen = (props) => {
  const [formData, setFormData] = useState({ ...INITIAL_FORMDATA });
  const [errors, setErrors] = useState({});
  const { productId } = useParams();

  useEffect(() => {
    getProductByIdResult({ productId }, { Authorization: props.authToken }).then((response) => {
      const { item } = response.result;
      if (item) {
        setFormData({
          ...INITIAL_FORMDATA,
          name: item.name,
          price: item.price,
          stockAmount: item.stockAmount,
          description: item.description,
          subtitle: item.subtitle,
        });
      } else {
        setFormData(null);
      }
    });
  }, []);

  if (isNull(formData)) {
    return (
      <Flex bg="gray.100" align="center" justify="center" h="100vh">
        <Box bg="white" p={6} rounded="md" w="40%">
          <Box display="flex" align="center">
            <Text fontSize="xl">商品不存在</Text>
          </Box>
        </Box>
      </Flex>
    );
  }
  return (
    <Flex bg="gray.100" align="center" justify="center" h="100vh">
      <Box bg="white" p={6} rounded="md" w="40%">
        <Box display="flex" align="center">
          <Text fontSize="xl">編輯商品</Text>
        </Box>
        <Formik
          initialValues={formData}
          onSubmit={async () => {
            try {
              const validatedPayload = await formCheck.handleYupSchema(updateProductSchema, formData);
              setErrors({});
              props.handleUpdateProduct({
                productId,
                ...validatedPayload,
                onSuccess: () => alert("編輯商品成功"),
              });
            } catch (error) {
              const errors = formCheck.handleYupErrors(error);
              setErrors(errors);
            }
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
                  編輯商品
                </Button>
              </VStack>
            </form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
};

export default UpdateProductScreen;
