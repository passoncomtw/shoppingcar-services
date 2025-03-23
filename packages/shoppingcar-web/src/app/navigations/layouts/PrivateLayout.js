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
  Text,
  Divider,
  Image,
  useDisclosure,
  IconButton,
  CloseButton,
  Drawer,
  DrawerContent,
  HStack,
  Tooltip,
  VStack,
} from '@chakra-ui/react';
import {
  FiUser,
  FiDatabase,
  FiArchive,
  FiMessageSquare,
  FiSettings,
  FiLayers,
  FiChevronRight,
  FiMenu,
  FiHome,
  FiShoppingCart,
  FiPackage,
  FiGrid,
  FiBell,
  FiSearch,
} from 'react-icons/fi';
import {
  Navigate,
  Outlet,
  useLocation,
  Link as RouterLink,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SignOutAction } from '../../actions/authActions';

const LinkItems = [
  { name: '儀表板', icon: FiHome, path: "/dashboard" },
  { name: '商家系統', icon: FiArchive, path: "/merchants" },
  { name: '會員系統', icon: FiUser, path: "/users" },
  { name: '商品系統', icon: FiPackage, path: "/products" },
  { name: '購物車系統', icon: FiShoppingCart, path: "/shoppingcars" },
  { name: '訂單系統', icon: FiMessageSquare, path: "/orders" },
  { name: '系統設定', icon: FiSettings, path: "/settings" },
];

const SidebarContent = ({ onClose, ...rest }) => {
  const isAuth = useSelector(({auth}) => auth.isAuth);
  const location = useLocation();
  if (!isAuth) return <Navigate to="/login" state={{ from: location }} replace />;

  return (
    <Box
      bg={useColorModeValue('blue.700', 'gray.900')}
      borderRight="0"
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      color="white"
      {...rest}>
      <Flex h="20" alignItems="center" justifyContent="center" mb={4}>
        <Text fontSize="2xl" fontWeight="bold" textAlign="center">
          購物車管理
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      <Divider mb={4} borderColor="blue.600" />
      
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} path={link.path}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  )
};

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector(({auth}) => auth.user);
  const userName = user?.name || "管理員";
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  return (
    <>
      <Flex
        as="header"
        pos="fixed"
        top="0"
        w="full"
        h="16"
        bg={useColorModeValue('blue.700', 'gray.900')}
        color="white"
        boxShadow="md"
        zIndex="1000"
        px={{ base: 4, md: 4 }}
        alignItems="center"
        justifyContent="space-between"
      >
        <HStack spacing={4}>
          <IconButton
            display={{ base: 'flex', md: 'none' }}
            onClick={onOpen}
            variant="outline"
            colorScheme="whiteAlpha"
            aria-label="open menu"
            icon={<FiMenu />}
          />
          
          <Icon
            display={{ base: 'none', md: 'flex' }}
            as={FiGrid}
            fontSize="24px"
            color="blue.200"
          />
          
          <Text
            fontSize="xl"
            fontWeight="bold"
          >
            購物車管理系統
          </Text>
        </HStack>

        <HStack spacing={4}>
          <Tooltip label="搜索">
            <IconButton
              icon={<FiSearch />}
              variant="ghost"
              colorScheme="whiteAlpha"
              fontSize="18px"
              aria-label="搜索"
            />
          </Tooltip>
          
          <Tooltip label="通知">
            <IconButton
              icon={<FiBell />}
              variant="ghost"
              colorScheme="whiteAlpha"
              fontSize="18px"
              aria-label="通知"
            />
          </Tooltip>
          
          <Divider orientation="vertical" h="8" borderColor="blue.600" />
          
          <HStack spacing={3}>
            <Text fontWeight="medium">
              {userName}
            </Text>
            
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'ghost'}
                cursor={'pointer'}
                minW={0}
                _hover={{ bg: 'blue.600' }}
              >
                <Avatar
                  size={'sm'}
                  src={'https://avatars.dicebear.com/api/male/username.svg'}
                  borderWidth="2px"
                  borderColor="blue.400"
                />
              </MenuButton>
              <MenuList alignItems={'center'} bg="white" color="gray.700">
                <Center pt={4}>
                  <Avatar
                    size={'xl'}
                    src={'https://avatars.dicebear.com/api/male/username.svg'}
                    borderWidth="2px"
                    borderColor="blue.400"
                  />
                </Center>
                <Center pt={2} pb={4}>
                  <VStack>
                    <Text fontWeight="bold">{userName}</Text>
                    <Text fontSize="sm" color="gray.500">管理員</Text>
                  </VStack>
                </Center>
                <MenuDivider />
                <MenuItem 
                  as={RouterLink} 
                  to="/settings" 
                  icon={<Icon as={FiSettings} />}
                >
                  系統設定
                </MenuItem>
                <MenuItem 
                  onClick={() => dispatch(SignOutAction())} 
                  icon={<Icon as={FiUser} />}
                >
                  登出
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </HStack>
      </Flex>
      
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
    </>
  )
};

const NavItem = ({ icon, children, path, ...rest }) => {
  const location = useLocation();
  const isActive = location.pathname === path;
  
  return (
    <Box
      as={RouterLink}
      to={path}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="3"
        mx="3"
        my="2"
        borderRadius="md"
        role="group"
        cursor="pointer"
        bg={isActive ? 'blue.600' : 'transparent'}
        fontWeight={isActive ? 'bold' : 'normal'}
        _hover={{
          bg: 'blue.600',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="3"
            fontSize="18"
            as={icon}
          />
        )}
        <Text flex="1">{children}</Text>
        {isActive && <Icon as={FiChevronRight} />}
      </Flex>
    </Box>
  )
};

const PrivateLayout = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')}>
      <Navbar />
      <SidebarContent display={{ base: 'none', md: 'block' }} />
      <Box ml={{ base: 0, md: 60 }} p={4} pt="20">
        <Outlet />
      </Box>
    </Box>
  );
};

export default PrivateLayout;
