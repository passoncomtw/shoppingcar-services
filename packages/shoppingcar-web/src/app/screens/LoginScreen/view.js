import { Formik, Field } from "formik";
import {
  Box,
  Text,
  Avatar,
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  VStack
} from "@chakra-ui/react";

const LoginScreen = (props) => {

  return (
    <Flex bg="gray.100" align="center" justify="center" h="100vh">
      <Box bg="white" p={6} rounded="md" w="40%">
        <Box display='flex' alignItems='baseline'>
          <Avatar name='PassonTW'/>
          <Text fontSize='2xl' marginLeft={2}>購物車管理後台</Text>
        </Box>
        <Formik
          initialValues={{
            account: "",
            password: "",
          }}
          onSubmit={(values) => {
            props.handleSubmit(values);
          }}
        >
          {({ handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <VStack spacing={4} align="flex-start">
                <FormControl>
                  <FormLabel htmlFor="account">Account</FormLabel>
                  <Field
                    as={Input}
                    id="account"
                    name="account"
                    type="account"
                    variant="filled"
                  />
                </FormControl>
                <FormControl isInvalid={!!errors.password && touched.password}>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Field
                    as={Input}
                    id="password"
                    name="password"
                    type="password"
                    variant="filled"
                    validate={(value) => {
                      let error;

                      if (value.length < 6) {
                        error = "Password must contain at least 6 characters";
                      }

                      return error;
                    }}
                  />
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>
                <Button type="submit" colorScheme="purple" width="full">
                  Login
                </Button>
              </VStack>
            </form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
};

export default LoginScreen;
