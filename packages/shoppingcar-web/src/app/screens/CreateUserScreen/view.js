import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, Text, VStack } from "@chakra-ui/react";
import { Field, Formik } from "formik";
import isEmpty from "lodash/isEmpty";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserSchema } from "../../constants/yupSchemas/user";
import formCheck from "../../helpers/formCheck";

const INITIAL_FORMDATA = {
  name: "",
  phone: "",
  password: "",
  confirmPassword: "",
  errors: {},
};

const CreateUserScreen = (props) => {
  const [formData, setFormData] = useState({ ...INITIAL_FORMDATA });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  return (
    <Flex bg="gray.100" align="center" justify="center" h="100vh">
      <Box bg="white" p={6} rounded="md" w="40%">
        <Box display="flex" align="center">
          <Text fontSize="xl">新增會員</Text>
        </Box>
        <Formik
          initialValues={formData}
          onSubmit={async () => {
            try {
              const validatedPayload = await formCheck.handleYupSchema(createUserSchema, formData);
              setErrors({});
              props.handleCreateUser({
                ...validatedPayload,
                onSuccess: () => navigate("/users"),
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
                <FormControl isInvalid={!isEmpty(errors.password)}>
                  <FormLabel htmlFor="password">密碼</FormLabel>
                  <Field
                    as={Input}
                    id="password"
                    name="password"
                    variant="filled"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!isEmpty(errors.confirmPassword)}>
                  <FormLabel htmlFor="confirmPassword">確認密碼</FormLabel>
                  <Field
                    as={Input}
                    id="confirmPassword"
                    name="confirmPassword"
                    variant="filled"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  />
                  <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
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

export default CreateUserScreen;
