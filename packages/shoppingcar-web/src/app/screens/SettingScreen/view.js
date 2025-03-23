import React, { useState } from "react";
import {
  Box,
  Text,
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  FormControl,
  FormLabel,
  Input,
  Switch,
  Select,
  Button,
  VStack,
  HStack,
  Divider,
  useToast,
  Heading,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Container,
  Icon,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Badge,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiSettings, FiUser, FiGlobe, FiShield, FiBell, FiChevronRight } from "react-icons/fi";

const SettingScreen = ({ user, handleSaveSettings }) => {
  const toast = useToast();
  
  // 定義設定狀態
  const [settings, setSettings] = useState({
    general: {
      language: "zh_TW",
      theme: "light",
      notifications: true,
    },
    security: {
      twoFactorAuth: false,
      autoLogout: 30, // 分鐘
    },
    profile: {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
    }
  });

  // 處理設定變更
  const handleChange = (section, field, value) => {
    setSettings({
      ...settings,
      [section]: {
        ...settings[section],
        [field]: value
      }
    });
  };

  // 處理表單提交
  const handleSubmit = (section) => {
    handleSaveSettings({ ...settings });
    
    toast({
      title: "設定已保存",
      description: "您的設定已成功更新",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  // 顏色設置
  const cardBg = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.800", "white");
  const subtitleColor = useColorModeValue("gray.600", "gray.400");

  return (
    <Container maxW="container.lg" py={6}>
      {/* 麵包屑導航 */}
      <Breadcrumb mb={6} fontSize="sm" separator={<Icon as={FiChevronRight} color="gray.500" />}>
        <BreadcrumbItem>
          <BreadcrumbLink href="/dashboard">首頁</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="#" fontWeight="semibold">系統設定</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      
      {/* 頁面標題 */}
      <Flex align="center" mb={8}>
        <Icon as={FiSettings} fontSize="3xl" color="blue.500" mr={3} />
        <Box>
          <Heading as="h1" size="xl" fontWeight="bold" color={textColor}>
            系統設定
          </Heading>
          <Text color={subtitleColor} mt={1}>
            管理您的系統偏好設定與個人資料
          </Text>
        </Box>
      </Flex>
      
      <Tabs 
        variant="line" 
        colorScheme="blue"
        isLazy
      >
        <TabList mb={6} borderBottomWidth="1px" borderColor={borderColor}>
          <Tab 
            fontWeight="medium" 
            py={4} 
            _selected={{ 
              color: "blue.500", 
              borderBottomWidth: "3px",
              borderColor: "blue.500"
            }}
          >
            <Icon as={FiGlobe} mr={2} />
            一般設定
          </Tab>
          <Tab 
            fontWeight="medium" 
            py={4} 
            _selected={{ 
              color: "blue.500", 
              borderBottomWidth: "3px",
              borderColor: "blue.500"
            }}
          >
            <Icon as={FiShield} mr={2} />
            安全設定
          </Tab>
          <Tab 
            fontWeight="medium" 
            py={4} 
            _selected={{ 
              color: "blue.500", 
              borderBottomWidth: "3px",
              borderColor: "blue.500"
            }}
          >
            <Icon as={FiUser} mr={2} />
            個人資料
          </Tab>
        </TabList>
        
        <TabPanels>
          {/* 一般設定 */}
          <TabPanel px={0}>
            <Card bg={cardBg} shadow="md" borderWidth="1px" borderColor={borderColor}>
              <CardHeader pb={0}>
                <Flex justify="space-between" align="center">
                  <Heading size="md" fontWeight="bold">一般設定</Heading>
                  <Badge colorScheme="blue" fontSize="sm" px={2} py={1} borderRadius="full">
                    基本配置
                  </Badge>
                </Flex>
              </CardHeader>
              
              <CardBody>
                <VStack spacing={6} align="stretch" divider={<Divider borderColor={borderColor} />}>
                  <FormControl>
                    <Flex justify="space-between" align="center">
                      <Box>
                        <FormLabel fontWeight="medium">顯示語言</FormLabel>
                        <Text fontSize="sm" color={subtitleColor}>
                          選擇系統界面顯示的語言
                        </Text>
                      </Box>
                      <Select 
                        value={settings.general.language}
                        onChange={(e) => handleChange("general", "language", e.target.value)}
                        maxW="200px"
                      >
                        <option value="zh_TW">繁體中文</option>
                        <option value="en">English</option>
                      </Select>
                    </Flex>
                  </FormControl>
                  
                  <FormControl>
                    <Flex justify="space-between" align="center">
                      <Box>
                        <FormLabel fontWeight="medium">顯示主題</FormLabel>
                        <Text fontSize="sm" color={subtitleColor}>
                          選擇系統界面顯示的主題
                        </Text>
                      </Box>
                      <Select 
                        value={settings.general.theme}
                        onChange={(e) => handleChange("general", "theme", e.target.value)}
                        maxW="200px"
                      >
                        <option value="light">淺色</option>
                        <option value="dark">深色</option>
                      </Select>
                    </Flex>
                  </FormControl>
                  
                  <FormControl>
                    <Flex justify="space-between" align="center">
                      <Box>
                        <FormLabel fontWeight="medium" mb={0}>啟用通知</FormLabel>
                        <Text fontSize="sm" color={subtitleColor}>
                          接收系統重要通知與更新提醒
                        </Text>
                      </Box>
                      <Switch 
                        id="notifications" 
                        isChecked={settings.general.notifications}
                        onChange={(e) => handleChange("general", "notifications", e.target.checked)}
                        colorScheme="blue"
                        size="lg"
                      />
                    </Flex>
                  </FormControl>
                </VStack>
              </CardBody>
              
              <CardFooter borderTopWidth="1px" borderColor={borderColor}>
                <Button 
                  colorScheme="blue" 
                  onClick={() => handleSubmit("general")}
                  leftIcon={<FiBell />}
                  size="md"
                >
                  保存設定
                </Button>
              </CardFooter>
            </Card>
          </TabPanel>
          
          {/* 安全設定 */}
          <TabPanel px={0}>
            <Card bg={cardBg} shadow="md" borderWidth="1px" borderColor={borderColor}>
              <CardHeader pb={0}>
                <Flex justify="space-between" align="center">
                  <Heading size="md" fontWeight="bold">安全設定</Heading>
                  <Badge colorScheme="green" fontSize="sm" px={2} py={1} borderRadius="full">
                    帳戶安全
                  </Badge>
                </Flex>
              </CardHeader>
              
              <CardBody>
                <VStack spacing={6} align="stretch" divider={<Divider borderColor={borderColor} />}>
                  <FormControl>
                    <Flex justify="space-between" align="center">
                      <Box>
                        <FormLabel fontWeight="medium" mb={0}>兩步驟驗證</FormLabel>
                        <Text fontSize="sm" color={subtitleColor}>
                          啟用後，登入時需要額外的安全驗證
                        </Text>
                      </Box>
                      <Switch 
                        id="2fa" 
                        isChecked={settings.security.twoFactorAuth}
                        onChange={(e) => handleChange("security", "twoFactorAuth", e.target.checked)}
                        colorScheme="green"
                        size="lg"
                      />
                    </Flex>
                  </FormControl>
                  
                  <FormControl>
                    <Flex justify="space-between" align="center">
                      <Box>
                        <FormLabel fontWeight="medium">自動登出時間</FormLabel>
                        <Text fontSize="sm" color={subtitleColor}>
                          設定閒置後自動登出的時間
                        </Text>
                      </Box>
                      <Select 
                        value={settings.security.autoLogout}
                        onChange={(e) => handleChange("security", "autoLogout", parseInt(e.target.value))}
                        maxW="200px"
                      >
                        <option value="15">15 分鐘</option>
                        <option value="30">30 分鐘</option>
                        <option value="60">1 小時</option>
                        <option value="120">2 小時</option>
                        <option value="0">永不</option>
                      </Select>
                    </Flex>
                  </FormControl>
                </VStack>
              </CardBody>
              
              <CardFooter borderTopWidth="1px" borderColor={borderColor}>
                <Button 
                  colorScheme="green" 
                  onClick={() => handleSubmit("security")}
                  leftIcon={<FiShield />}
                  size="md"
                >
                  保存設定
                </Button>
              </CardFooter>
            </Card>
          </TabPanel>
          
          {/* 個人資料 */}
          <TabPanel px={0}>
            <Card bg={cardBg} shadow="md" borderWidth="1px" borderColor={borderColor}>
              <CardHeader pb={0}>
                <Flex justify="space-between" align="center">
                  <Heading size="md" fontWeight="bold">個人資料</Heading>
                  <Badge colorScheme="purple" fontSize="sm" px={2} py={1} borderRadius="full">
                    個人信息
                  </Badge>
                </Flex>
              </CardHeader>
              
              <CardBody>
                <VStack spacing={6} align="stretch">
                  <FormControl>
                    <FormLabel fontWeight="medium">姓名</FormLabel>
                    <Input 
                      value={settings.profile.name}
                      onChange={(e) => handleChange("profile", "name", e.target.value)}
                      placeholder="請輸入您的姓名"
                      focusBorderColor="purple.500"
                    />
                  </FormControl>
                  
                  <FormControl>
                    <FormLabel fontWeight="medium">電子郵件</FormLabel>
                    <Input 
                      type="email"
                      value={settings.profile.email}
                      onChange={(e) => handleChange("profile", "email", e.target.value)}
                      placeholder="請輸入您的電子郵件"
                      focusBorderColor="purple.500"
                    />
                  </FormControl>
                  
                  <FormControl>
                    <FormLabel fontWeight="medium">電話號碼</FormLabel>
                    <Input 
                      value={settings.profile.phone}
                      onChange={(e) => handleChange("profile", "phone", e.target.value)}
                      placeholder="請輸入您的電話號碼"
                      focusBorderColor="purple.500"
                    />
                  </FormControl>
                </VStack>
              </CardBody>
              
              <CardFooter borderTopWidth="1px" borderColor={borderColor}>
                <Button 
                  colorScheme="purple" 
                  onClick={() => handleSubmit("profile")}
                  leftIcon={<FiUser />}
                  size="md"
                >
                  保存資料
                </Button>
              </CardFooter>
            </Card>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default SettingScreen; 