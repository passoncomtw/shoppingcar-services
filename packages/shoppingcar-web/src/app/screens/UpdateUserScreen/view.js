import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, Text, VStack } from "@chakra-ui/react";
import { Field, Formik } from "formik";
import isEmpty from "lodash/isEmpty";
import isNull from "lodash/isNull";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserByUserIdResult } from "../../apis/api";
import { updateUserSchema } from "../../constants/yupSchemas/user";
import formCheck from "../../helpers/formCheck";

const INITIAL_FORMDATA = {
  name: "",
  phone: "",
  errors: {},
};

const UpdateUserScreen = (props) => {
  const [formData, setFormData] = useState({ ...INITIAL_FORMDATA });
  const [errors, setErrors] = useState({});
  const { userId } = useParams();

  useEffect(() => {
    getUserByUserIdResult({ userId }, { Authorization: props.authToken }).then((response) => {
      const { item } = response.result;
      if (item) {
        setFormData({ ...INITIAL_FORMDATA, ...item });
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
            <Text fontSize="xl">會員不存在</Text>
          </Box>
        </Box>
      </Flex>
    );
  }
  return (
    <Flex bg="gray.100" align="center" justify="center" h="100vh">
      <Box bg="white" p={6} rounded="md" w="40%">
        <Box display="flex" align="center">
          <Text fontSize="xl">編輯會員</Text>
        </Box>
        <Formik
          initialValues={formData}
          onSubmit={async () => {
            try {
              const validatedPayload = await formCheck.handleYupSchema(updateUserSchema, formData);
              setErrors({});
              props.handleUpdateUser({
                userId,
                ...validatedPayload,
                onSuccess: () => alert("編輯會員成功"),
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
                <Button type="submit" colorScheme="purple" width="full">
                  編輯會員
                </Button>
              </VStack>
            </form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
};

export default UpdateUserScreen;
