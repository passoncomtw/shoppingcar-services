import { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../navigations';
import { Formik, Field } from "formik";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  VStack
} from "@chakra-ui/react";
import LineLogin from './components/LineLogin';
import 'reactjs-line-login/dist/index.css';

const LoginScreen = () => {
  const [payload, setPayload] = useState(null);
  const [idToken, setIdToken] = useState(null);
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();

  let from = location.state?.from?.pathname || '/';

  function handleSubmit(event) {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);
    let username = formData.get('username');

    auth.signin(username, () => {
      // Send them back to the page they tried to visit when they were
      // redirected to the login page. Use { replace: true } so we don't create
      // another entry in the history stack for the login page.  This means that
      // when they get to the protected page and click the back button, they
      // won't end up back on the login page, which is also really nice for the
      // user experience.
      navigate(from, { replace: true });
    });
  }

  return (
    <Flex bg="gray.100" align="center" justify="center" h="100vh">
      <Box bg="white" p={6} rounded="md" w={64}>
        <LineLogin
        clientID='2006210817'
        clientSecret='0370031cdd35afb16fba1fa540990cbd'
        state='123445143131'
        redirectURI='http://10.141.31.70:4200/'
        scope='profile openid email' 
        setPayload={setPayload}
        setIdToken={setIdToken}
        />
      <Formik
            initialValues={{
              email: "",
              password: "",
              rememberMe: false
            }}
            onSubmit={(values) => {
              alert(JSON.stringify(values, null, 2));
            }}
          >
            {({ handleSubmit, errors, touched }) => (
              <form onSubmit={handleSubmit}>
                <VStack spacing={4} align="flex-start">
                  <FormControl>
                    <FormLabel htmlFor="phone">Phone Number</FormLabel>
                    <Field
                      as={Input}
                      id="phone"
                      name="phone"
                      type="phone"
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
