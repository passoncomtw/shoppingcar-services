import { Formik, Field } from "formik";
import {
  Box,
  Text,
  Icon,
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  VStack,
  Checkbox,
  Link,
  Container,
  HStack,
  Circle,
  InputGroup,
  InputLeftElement
} from "@chakra-ui/react";
import { LockIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { FaShoppingCart } from 'react-icons/fa';

const LoginScreen = (props) => {
  return (
    <Flex bg="gray.100" align="center" justify="center" h="100vh">
      <Container maxW="6xl" p={4}>
        <Box rounded="lg" border="1px" borderColor="gray.300" shadow="lg" overflow="hidden">          
          <Box bg="white" minH="600px" display="flex" alignItems="center" justifyContent="center">
            <Box w="full" maxW="md" p={8}>
              <Box textAlign="center" mb={10}>
                <Flex justify="center" mb={4} color="blue.600">
                  <Icon as={FaShoppingCart} w={16} h={16} />
                </Flex>
                <Text fontSize="2xl" fontWeight="bold" color="gray.800">購物車管理後台</Text>
                <Text color="gray.600" mt={2}>請登入以繼續操作</Text>
              </Box>

              <Box bg="white" rounded="lg" shadow="md" p={6}>
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
                          <FormLabel htmlFor="account" fontSize="sm" fontWeight="medium" color="gray.700">帳號</FormLabel>
                          <Field
                            as={Input}
                            id="account"
                            name="account"
                            type="text"
                            placeholder="請輸入您的帳號"
                            shadow="sm"
                            focusBorderColor="blue.500"
                          />
                        </FormControl>
                        
                        <FormControl isInvalid={!!errors.password && touched.password}>
                          <FormLabel htmlFor="password" fontSize="sm" fontWeight="medium" color="gray.700">密碼</FormLabel>
                          <Field
                            as={Input}
                            id="password"
                            name="password"
                            type="password"
                            placeholder="請輸入您的密碼"
                            shadow="sm"
                            focusBorderColor="blue.500"
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
                        
                        <Flex w="full" justify="space-between" mb={4}>
                          <Checkbox id="remember" colorScheme="blue" size="sm">
                            <Text fontSize="sm" color="gray.700">記住我</Text>
                          </Checkbox>
                          <Link fontSize="sm" color="blue.600" href="#">
                            忘記密碼?
                          </Link>
                        </Flex>
                        
                        <Button 
                          type="submit" 
                          w="full" 
                          bg="blue.600" 
                          _hover={{ bg: "blue.700" }} 
                          color="white"
                          fontWeight="medium"
                          rounded="md"
                          shadow="sm"
                        >
                          登入
                        </Button>
                      </VStack>
                    </form>
                  )}
                </Formik>
              </Box>
              
              <Text textAlign="center" color="gray.500" fontSize="xs" mt={4}>
                &copy; 2023 購物車應用管理系統. 版權所有.
              </Text>
            </Box>
          </Box>
        </Box>
      </Container>
    </Flex>
  );
};

export default LoginScreen;
