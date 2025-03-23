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
} from "@chakra-ui/react";

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
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
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

  return (
    <Box bg="gray.50" minH="100vh" p={6}>
      <Heading as="h1" size="xl" mb={6}>系統設定</Heading>
      
      <Tabs variant="enclosed" colorScheme="blue">
        <TabList>
          <Tab>一般設定</Tab>
          <Tab>安全設定</Tab>
          <Tab>個人資料</Tab>
        </TabList>
        
        <TabPanels>
          {/* 一般設定 */}
          <TabPanel>
            <Card bg="white" shadow="md">
              <CardHeader>
                <Heading size="md">一般設定</Heading>
              </CardHeader>
              
              <CardBody>
                <VStack spacing={6} align="stretch">
                  <FormControl>
                    <FormLabel>顯示語言</FormLabel>
                    <Select 
                      value={settings.general.language}
                      onChange={(e) => handleChange("general", "language", e.target.value)}
                    >
                      <option value="zh_TW">繁體中文</option>
                      <option value="en">English</option>
                    </Select>
                  </FormControl>
                  
                  <FormControl>
                    <FormLabel>顯示主題</FormLabel>
                    <Select 
                      value={settings.general.theme}
                      onChange={(e) => handleChange("general", "theme", e.target.value)}
                    >
                      <option value="light">淺色</option>
                      <option value="dark">深色</option>
                    </Select>
                  </FormControl>
                  
                  <FormControl display="flex" alignItems="center">
                    <FormLabel htmlFor="notifications" mb="0">
                      啟用通知
                    </FormLabel>
                    <Switch 
                      id="notifications" 
                      isChecked={settings.general.notifications}
                      onChange={(e) => handleChange("general", "notifications", e.target.checked)}
                    />
                  </FormControl>
                </VStack>
              </CardBody>
              
              <CardFooter>
                <Button colorScheme="blue" onClick={() => handleSubmit("general")}>
                  保存設定
                </Button>
              </CardFooter>
            </Card>
          </TabPanel>
          
          {/* 安全設定 */}
          <TabPanel>
            <Card bg="white" shadow="md">
              <CardHeader>
                <Heading size="md">安全設定</Heading>
              </CardHeader>
              
              <CardBody>
                <VStack spacing={6} align="stretch">
                  <FormControl display="flex" alignItems="center">
                    <FormLabel htmlFor="2fa" mb="0">
                      兩步驟驗證
                    </FormLabel>
                    <Switch 
                      id="2fa" 
                      isChecked={settings.security.twoFactorAuth}
                      onChange={(e) => handleChange("security", "twoFactorAuth", e.target.checked)}
                    />
                  </FormControl>
                  
                  <FormControl>
                    <FormLabel>自動登出時間 (分鐘)</FormLabel>
                    <Select 
                      value={settings.security.autoLogout}
                      onChange={(e) => handleChange("security", "autoLogout", parseInt(e.target.value))}
                    >
                      <option value="15">15 分鐘</option>
                      <option value="30">30 分鐘</option>
                      <option value="60">1 小時</option>
                      <option value="120">2 小時</option>
                      <option value="0">永不</option>
                    </Select>
                  </FormControl>
                </VStack>
              </CardBody>
              
              <CardFooter>
                <Button colorScheme="blue" onClick={() => handleSubmit("security")}>
                  保存設定
                </Button>
              </CardFooter>
            </Card>
          </TabPanel>
          
          {/* 個人資料 */}
          <TabPanel>
            <Card bg="white" shadow="md">
              <CardHeader>
                <Heading size="md">個人資料</Heading>
              </CardHeader>
              
              <CardBody>
                <VStack spacing={6} align="stretch">
                  <FormControl>
                    <FormLabel>姓名</FormLabel>
                    <Input 
                      value={settings.profile.name}
                      onChange={(e) => handleChange("profile", "name", e.target.value)}
                    />
                  </FormControl>
                  
                  <FormControl>
                    <FormLabel>電子郵件</FormLabel>
                    <Input 
                      type="email"
                      value={settings.profile.email}
                      onChange={(e) => handleChange("profile", "email", e.target.value)}
                    />
                  </FormControl>
                  
                  <FormControl>
                    <FormLabel>電話號碼</FormLabel>
                    <Input 
                      value={settings.profile.phone}
                      onChange={(e) => handleChange("profile", "phone", e.target.value)}
                    />
                  </FormControl>
                </VStack>
              </CardBody>
              
              <CardFooter>
                <Button colorScheme="blue" onClick={() => handleSubmit("profile")}>
                  保存設定
                </Button>
              </CardFooter>
            </Card>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default SettingScreen; 