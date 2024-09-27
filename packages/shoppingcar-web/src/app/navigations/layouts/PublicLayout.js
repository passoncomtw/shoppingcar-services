import {
  Box,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  return (
    <>
      <Box bg={useColorModeValue('gray.200', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box></Box>
        </Flex>
      </Box>
    </>
  )
};

const PublicLayout = () => {
  const isAuth = useSelector(({auth}) => auth.isAuth);
  const location = useLocation();

  if (isAuth) return <Navigate to="/merchants" state={{ from: location }} replace />;

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <Navbar />
      <Outlet />
    </Box>
  );
};

export default PublicLayout;
