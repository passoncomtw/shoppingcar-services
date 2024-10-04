import {
  Box,
  Flex,
  Icon,
  useColorModeValue,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Stack,
  Center,
} from '@chakra-ui/react';
import {
  FiUser,
  FiDatabase,
  FiArchive,
  FiMessageSquare,
  FiSettings,
  FiLayers,
} from 'react-icons/fi';
import {
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import { useSelector } from "react-redux";

const LinkItems = [
  { name: '商家系統', icon: FiArchive, path: "/merchants" },
  { name: '會員系統', icon: FiUser, path: "/users" },
  { name: '商品系統', icon: FiLayers, path: "/products" },
  { name: '購物車系統', icon: FiDatabase, path: "/merchants" },
  { name: '訂單系統', icon: FiMessageSquare, path: "/merchants" },
  { name: '系統設定', icon: FiSettings, path: "/merchants" },
];

const SidebarContent = ({ onClose, ...rest }) => {
  const isAuth = useSelector(({auth}) => auth.isAuth);
  const location = useLocation();
  if (!isAuth) return <Navigate to="/login" state={{ from: location }} replace />;

  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} path={link.path}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  )
};

const Navbar = () => {
  return (
    <>
      <Box bg={useColorModeValue('gray.200', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box></Box>
  
          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'sm'}
                    src={'https://avatars.dicebear.com/api/male/username.svg'}
                  />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar
                      size={'2xl'}
                      src={'https://avatars.dicebear.com/api/male/username.svg'}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>Username</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem>Your Servers</MenuItem>
                  <MenuItem>Account Settings</MenuItem>
                  <MenuItem>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  )
};

const NavItem = ({ icon, children, path, ...rest }) => {
  return (
    <Box
      as="a"
      href={path}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  )
};

const PrivateLayout = (props) => {
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <Navbar />
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <div style={{paddingLeft: 260}}>
      <Outlet />
      </div>
    </Box>
  );
};

export default PrivateLayout;
