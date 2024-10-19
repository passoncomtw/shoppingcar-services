import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, Text, VStack } from "@chakra-ui/react";
import { Field, Formik } from "formik";
import isEmpty from "lodash/isEmpty";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMerchantResult } from "../../apis/api";
import { updateMerchantSchema } from "../../constants/yupSchemas/merchant";
import { handleYupErrors, handleYupSchema } from "../../helpers/formCheck";

const INITIAL_FORMDATA = {
  name: "",
  phone: "",
  email: "",
  errors: {},
};

const UpdateMerchantScreen = (props) => {
  const [formData, setFormData] = useState({ ...INITIAL_FORMDATA });
  const [errors, setErrors] = useState({});
  const { merchantId } = useParams();

  useEffect(() => {
    getMerchantResult({ merchantId }, { Authorization: props.authToken }).then((response) => {
      const { item } = response.result;
      if (item) {
        setFormData({ ...INITIAL_FORMDATA, ...item });
      } else {
        setFormData(null);
      }
    });
  }, []);

  return (
    <Flex bg="gray.100" align="center" justify="center" h="100vh">
      <Box bg="white" p={6} rounded="md" w="40%">
        <Box display="flex" align="center">
          <Text fontSize="xl">新增商家</Text>
        </Box>
        <Formik
          initialValues={formData}
          onSubmit={async () => {
            try {
              const validatedPayload = await handleYupSchema(updateMerchantSchema, formData);
              setErrors({});
              props.handleUpdateMerchant({
                merchantId,
                ...validatedPayload,
                onSuccess: () => alert("編輯商店完成"),
              });
            } catch (error) {
              const errors = handleYupErrors(error);
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
                <FormControl isInvalid={!isEmpty(errors.phone)}>
                  <FormLabel htmlFor="phone">手機</FormLabel>
                  <Field
                    as={Input}
                    id="phone"
                    name="phone"
                    variant="filled"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                  <FormErrorMessage>{errors.phone}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!isEmpty(errors.email)}>
                  <FormLabel htmlFor="email">信箱</FormLabel>
                  <Field
                    as={Input}
                    id="email"
                    type="email"
                    name="email"
                    variant="filled"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>
                <Button type="submit" colorScheme="purple" width="full">
                  編輯商家
                </Button>
              </VStack>
            </form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
};

export default UpdateMerchantScreen;
