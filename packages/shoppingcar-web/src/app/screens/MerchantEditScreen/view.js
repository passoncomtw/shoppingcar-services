import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Button,
  VStack,
  HStack,
  Text,
  useToast,
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Divider,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Badge,
  Icon,
  useColorModeValue,
  Switch,
  Grid,
  GridItem,
  FormHelperText,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Image,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import {
  FiChevronRight,
  FiSave,
  FiTrash2,
  FiArrowLeft,
  FiPlus,
  FiUpload,
  FiArchive,
  FiMapPin,
  FiPhone,
  FiMail,
  FiDollarSign,
  FiAlertCircle,
  FiX,
} from "react-icons/fi";

const MerchantEditScreen = ({
  merchant,
  loading,
  error,
  isNew,
  fetchMerchant,
  saveMerchant,
  resetMerchantForm,
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    description: "",
    businessHours: "",
    category: "",
    status: "active",
    commissionRate: 0,
    bankAccount: "",
    contactPerson: "",
    contactPhone: "",
    logoUrl: "",
    coverPhotoUrl: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  // 顏色設置
  const cardBg = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.800", "white");
  const subtitleColor = useColorModeValue("gray.600", "gray.400");

  // 加載商家數據
  useEffect(() => {
    if (id && id !== "new") {
      fetchMerchant(id);
    } else {
      resetMerchantForm();
    }
  }, [id, fetchMerchant, resetMerchantForm]);

  // 當商家數據改變時更新表單
  useEffect(() => {
    if (!isNew && merchant) {
      setFormData({
        name: merchant.name || "",
        address: merchant.address || "",
        phone: merchant.phone || "",
        email: merchant.email || "",
        description: merchant.description || "",
        businessHours: merchant.businessHours || "",
        category: merchant.category || "",
        status: merchant.status || "active",
        commissionRate: merchant.commissionRate || 0,
        bankAccount: merchant.bankAccount || "",
        contactPerson: merchant.contactPerson || "",
        contactPhone: merchant.contactPhone || "",
        logoUrl: merchant.logoUrl || "",
        coverPhotoUrl: merchant.coverPhotoUrl || "",
      });
    }
  }, [merchant, isNew]);

  // 處理表單輸入變化
  const handleChange = (field) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [field]: value,
    });
    
    // 清除錯誤提示
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: null,
      });
    }
  };

  // 驗證表單
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "商家名稱不能為空";
    if (!formData.address) newErrors.address = "地址不能為空";
    if (!formData.phone) newErrors.phone = "電話不能為空";
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "電子郵件格式不正確";
    if (!formData.category) newErrors.category = "請選擇類別";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 處理表單提交
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "表單錯誤",
        description: "請檢查表單中的錯誤並修正",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    setIsSubmitting(true);
    saveMerchant(formData)
      .then(() => {
        toast({
          title: isNew ? "創建成功" : "更新成功",
          description: `商家 ${formData.name} 已成功${isNew ? "創建" : "更新"}`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate("/merchants");
      })
      .catch((error) => {
        toast({
          title: "保存失敗",
          description: error.message || "發生錯誤，請稍後再試",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  // 處理刪除
  const handleDelete = () => {
    // 實現刪除商家的邏輯
    onClose();
    toast({
      title: "商家已刪除",
      description: `商家 ${formData.name} 已成功刪除`,
      status: "info",
      duration: 3000,
      isClosable: true,
    });
    navigate("/merchants");
  };

  return (
    <Container maxW="container.lg" py={6}>
      {/* 麵包屑導航 */}
      <Breadcrumb mb={6} fontSize="sm" separator={<Icon as={FiChevronRight} color="gray.500" />}>
        <BreadcrumbItem>
          <BreadcrumbLink href="/dashboard">首頁</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href="/merchants">商家管理</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="#">{isNew ? "新增商家" : formData.name}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      
      {/* 頁面標題 */}
      <Flex justify="space-between" align="center" mb={8}>
        <Flex align="center">
          <Icon as={FiArchive} fontSize="3xl" color="blue.500" mr={3} />
          <Box>
            <Heading as="h1" size="xl" fontWeight="bold" color={textColor}>
              {isNew ? "新增商家" : `編輯商家: ${formData.name}`}
            </Heading>
            <Text color={subtitleColor} mt={1}>
              {isNew ? "創建新的商家資料" : "更新商家資料和詳細設定"}
            </Text>
          </Box>
        </Flex>
        
        <HStack spacing={4}>
          <Button 
            leftIcon={<FiArrowLeft />} 
            variant="outline"
            onClick={() => navigate("/merchants")}
          >
            返回列表
          </Button>
          {!isNew && (
            <Button 
              leftIcon={<FiTrash2 />} 
              colorScheme="red" 
              variant="outline"
              onClick={onOpen}
            >
              刪除商家
            </Button>
          )}
        </HStack>
      </Flex>
      
      {loading ? (
        <Flex justify="center" align="center" h="300px">
          <Text>載入中...</Text>
        </Flex>
      ) : error ? (
        <Flex justify="center" align="center" h="300px" direction="column">
          <Icon as={FiAlertCircle} fontSize="3xl" color="red.500" mb={3} />
          <Text color="red.500">{error}</Text>
          <Button mt={4} onClick={() => fetchMerchant(id)}>重試</Button>
        </Flex>
      ) : (
        <form onSubmit={handleSubmit}>
          <Tabs colorScheme="blue" mb={6}>
            <TabList>
              <Tab>基本資料</Tab>
              <Tab>銀行與支付</Tab>
              <Tab>媒體資源</Tab>
            </TabList>
            
            <TabPanels>
              {/* 基本資料 */}
              <TabPanel px={0}>
                <Card bg={cardBg} shadow="md" mb={6} borderWidth="1px" borderColor={borderColor}>
                  <CardHeader pb={0}>
                    <Flex justify="space-between" align="center">
                      <Heading size="md" fontWeight="bold">基本資料</Heading>
                      <Badge colorScheme={formData.status === "active" ? "green" : "red"}>
                        {formData.status === "active" ? "營業中" : "已停業"}
                      </Badge>
                    </Flex>
                  </CardHeader>
                  
                  <CardBody>
                    <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
                      <GridItem colSpan={{ base: 1, md: 2 }}>
                        <FormControl isRequired isInvalid={errors.name}>
                          <FormLabel fontWeight="medium">商家名稱</FormLabel>
                          <Input 
                            placeholder="輸入商家名稱" 
                            value={formData.name}
                            onChange={handleChange("name")}
                          />
                          {errors.name && <FormHelperText color="red.500">{errors.name}</FormHelperText>}
                        </FormControl>
                      </GridItem>
                      
                      <GridItem colSpan={{ base: 1, md: 2 }}>
                        <FormControl isRequired isInvalid={errors.address}>
                          <FormLabel fontWeight="medium">地址</FormLabel>
                          <Input 
                            placeholder="輸入完整地址" 
                            value={formData.address}
                            onChange={handleChange("address")}
                          />
                          {errors.address && <FormHelperText color="red.500">{errors.address}</FormHelperText>}
                        </FormControl>
                      </GridItem>
                      
                      <GridItem>
                        <FormControl isRequired isInvalid={errors.phone}>
                          <FormLabel fontWeight="medium">聯絡電話</FormLabel>
                          <Input 
                            placeholder="例如: 02-12345678" 
                            value={formData.phone}
                            onChange={handleChange("phone")}
                          />
                          {errors.phone && <FormHelperText color="red.500">{errors.phone}</FormHelperText>}
                        </FormControl>
                      </GridItem>
                      
                      <GridItem>
                        <FormControl isInvalid={errors.email}>
                          <FormLabel fontWeight="medium">電子郵件</FormLabel>
                          <Input 
                            type="email"
                            placeholder="例如: contact@example.com" 
                            value={formData.email}
                            onChange={handleChange("email")}
                          />
                          {errors.email && <FormHelperText color="red.500">{errors.email}</FormHelperText>}
                        </FormControl>
                      </GridItem>
                      
                      <GridItem>
                        <FormControl isRequired isInvalid={errors.category}>
                          <FormLabel fontWeight="medium">商家類別</FormLabel>
                          <Select 
                            placeholder="選擇商家類別"
                            value={formData.category}
                            onChange={handleChange("category")}
                          >
                            <option value="restaurant">餐廳</option>
                            <option value="cafe">咖啡廳</option>
                            <option value="retail">零售</option>
                            <option value="service">服務業</option>
                            <option value="other">其他</option>
                          </Select>
                          {errors.category && <FormHelperText color="red.500">{errors.category}</FormHelperText>}
                        </FormControl>
                      </GridItem>
                      
                      <GridItem>
                        <FormControl>
                          <FormLabel fontWeight="medium">營業時間</FormLabel>
                          <Input 
                            placeholder="例如: 周一至周五 9:00-18:00" 
                            value={formData.businessHours}
                            onChange={handleChange("businessHours")}
                          />
                        </FormControl>
                      </GridItem>
                      
                      <GridItem colSpan={{ base: 1, md: 2 }}>
                        <FormControl>
                          <FormLabel fontWeight="medium">商家描述</FormLabel>
                          <Textarea 
                            placeholder="簡單描述商家特色與服務" 
                            rows={4}
                            value={formData.description}
                            onChange={handleChange("description")}
                          />
                        </FormControl>
                      </GridItem>
                      
                      <GridItem colSpan={{ base: 1, md: 2 }}>
                        <Flex justify="space-between" align="center" mt={2}>
                          <FormLabel fontWeight="medium" htmlFor="merchant-status" mb={0}>
                            商家狀態 ({formData.status === "active" ? "營業中" : "已停業"})
                          </FormLabel>
                          <Switch 
                            id="merchant-status"
                            isChecked={formData.status === "active"}
                            onChange={(e) => {
                              setFormData({
                                ...formData,
                                status: e.target.checked ? "active" : "inactive"
                              });
                            }}
                            colorScheme="green"
                            size="lg"
                          />
                        </Flex>
                      </GridItem>
                    </Grid>
                  </CardBody>
                </Card>
                
                <Card bg={cardBg} shadow="md" borderWidth="1px" borderColor={borderColor}>
                  <CardHeader pb={0}>
                    <Heading size="md" fontWeight="bold">聯絡人資料</Heading>
                  </CardHeader>
                  
                  <CardBody>
                    <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
                      <GridItem>
                        <FormControl>
                          <FormLabel fontWeight="medium">聯絡人姓名</FormLabel>
                          <Input 
                            placeholder="輸入聯絡人姓名" 
                            value={formData.contactPerson}
                            onChange={handleChange("contactPerson")}
                          />
                        </FormControl>
                      </GridItem>
                      
                      <GridItem>
                        <FormControl>
                          <FormLabel fontWeight="medium">聯絡人電話</FormLabel>
                          <Input 
                            placeholder="例如: 0912-345-678" 
                            value={formData.contactPhone}
                            onChange={handleChange("contactPhone")}
                          />
                        </FormControl>
                      </GridItem>
                    </Grid>
                  </CardBody>
                </Card>
              </TabPanel>
              
              {/* 銀行與支付 */}
              <TabPanel px={0}>
                <Card bg={cardBg} shadow="md" borderWidth="1px" borderColor={borderColor}>
                  <CardHeader pb={0}>
                    <Heading size="md" fontWeight="bold">銀行與支付資料</Heading>
                  </CardHeader>
                  
                  <CardBody>
                    <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
                      <GridItem colSpan={{ base: 1, md: 2 }}>
                        <FormControl>
                          <FormLabel fontWeight="medium">銀行帳戶</FormLabel>
                          <Input 
                            placeholder="輸入完整的銀行帳戶資訊" 
                            value={formData.bankAccount}
                            onChange={handleChange("bankAccount")}
                          />
                        </FormControl>
                      </GridItem>
                      
                      <GridItem>
                        <FormControl>
                          <FormLabel fontWeight="medium">
                            佣金率 (%)
                          </FormLabel>
                          <Input 
                            type="number"
                            placeholder="例如: 5" 
                            value={formData.commissionRate}
                            onChange={handleChange("commissionRate")}
                            min={0}
                            max={100}
                          />
                          <FormHelperText>
                            設定平台收取的佣金百分比
                          </FormHelperText>
                        </FormControl>
                      </GridItem>
                    </Grid>
                  </CardBody>
                </Card>
              </TabPanel>
              
              {/* 媒體資源 */}
              <TabPanel px={0}>
                <Card bg={cardBg} shadow="md" borderWidth="1px" borderColor={borderColor}>
                  <CardHeader pb={0}>
                    <Heading size="md" fontWeight="bold">商家圖片</Heading>
                  </CardHeader>
                  
                  <CardBody>
                    <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
                      <GridItem>
                        <FormControl>
                          <FormLabel fontWeight="medium">商家 Logo</FormLabel>
                          <Flex 
                            justify="center" 
                            align="center" 
                            h="150px" 
                            borderWidth="2px" 
                            borderStyle="dashed" 
                            borderColor="gray.300"
                            borderRadius="md"
                            bg="gray.50"
                            mb={2}
                          >
                            {formData.logoUrl ? (
                              <Image 
                                src={formData.logoUrl} 
                                alt="商家 Logo" 
                                maxH="140px"
                                maxW="140px"
                                objectFit="contain"
                              />
                            ) : (
                              <VStack spacing={2}>
                                <Icon as={FiUpload} fontSize="2xl" color="gray.400" />
                                <Text fontSize="sm" color="gray.500">
                                  點擊上傳 Logo
                                </Text>
                              </VStack>
                            )}
                          </Flex>
                          <Input 
                            placeholder="輸入 Logo 圖片網址" 
                            value={formData.logoUrl}
                            onChange={handleChange("logoUrl")}
                          />
                        </FormControl>
                      </GridItem>
                      
                      <GridItem>
                        <FormControl>
                          <FormLabel fontWeight="medium">封面照片</FormLabel>
                          <Flex 
                            justify="center" 
                            align="center" 
                            h="150px" 
                            borderWidth="2px" 
                            borderStyle="dashed" 
                            borderColor="gray.300"
                            borderRadius="md"
                            bg="gray.50"
                            mb={2}
                          >
                            {formData.coverPhotoUrl ? (
                              <Image 
                                src={formData.coverPhotoUrl} 
                                alt="封面照片" 
                                maxH="140px"
                                maxW="140px"
                                objectFit="contain"
                              />
                            ) : (
                              <VStack spacing={2}>
                                <Icon as={FiUpload} fontSize="2xl" color="gray.400" />
                                <Text fontSize="sm" color="gray.500">
                                  點擊上傳封面照片
                                </Text>
                              </VStack>
                            )}
                          </Flex>
                          <Input 
                            placeholder="輸入封面照片網址" 
                            value={formData.coverPhotoUrl}
                            onChange={handleChange("coverPhotoUrl")}
                          />
                        </FormControl>
                      </GridItem>
                    </Grid>
                  </CardBody>
                </Card>
              </TabPanel>
            </TabPanels>
          </Tabs>
          
          <Flex justify="flex-end" mb={8}>
            <HStack spacing={4}>
              <Button 
                variant="outline" 
                onClick={() => navigate("/merchants")}
              >
                取消
              </Button>
              <Button 
                colorScheme="blue" 
                type="submit"
                leftIcon={<FiSave />}
                isLoading={isSubmitting}
                loadingText="保存中..."
              >
                保存
              </Button>
            </HStack>
          </Flex>
        </form>
      )}
      
      {/* 刪除確認對話框 */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              刪除商家
            </AlertDialogHeader>

            <AlertDialogBody>
              確定要刪除商家「{formData.name}」嗎？此操作無法撤銷。
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                取消
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                刪除
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Container>
  );
};

export default MerchantEditScreen; 