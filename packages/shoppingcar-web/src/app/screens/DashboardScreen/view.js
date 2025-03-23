import React from "react";
import {
  Box,
  Text,
  Flex,
  Grid,
  Container,
  Icon,
  Button,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Link,
  Badge,
  Center
} from "@chakra-ui/react";
import {
  FaShoppingCart,
  FaChartLine,
  FaChartPie,
  FaChevronRight,
  FaUser,
  FaSync,
  FaUserPlus,
  FaMoneyBillWave,
  FaBoxOpen
} from "react-icons/fa";

const DashboardScreen = (props) => {
  const { lastUpdated, statistics, recentOrders, refreshData } = props;

  // 獲取統計數據
  const { todayOrders, todayRevenue, newUsers, productSales,
          ordersGrowth, revenueGrowth, usersGrowth, salesGrowth } = statistics;

  return (
    <Box bg="gray.100" minH="100vh">
      <Container maxW="12xl" py={4}>
        <Box rounded="lg" border="1px" borderColor="gray.300" shadow="lg" overflow="hidden">
          <Box bg="white">
            <Box p={8}>
              <Flex mb={8} justify="space-between" align="center">
                <Text fontSize="2xl" fontWeight="bold">儀表板</Text>
                <Flex align="center">
                  <Text fontSize="sm" color="gray.500">最後更新時間: {lastUpdated}</Text>
                  <Button 
                    ml={2} 
                    bg="blue.100" 
                    color="blue.600" 
                    p={1} 
                    rounded="md" 
                    _hover={{ bg: "blue.200" }}
                    onClick={refreshData}
                  >
                    <Icon as={FaSync} fontSize="sm" />
                  </Button>
                </Flex>
              </Flex>

              {/* 統計卡片區域 */}
              <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(4, 1fr)" }} gap={4} mb={8}>
                <Box bg="white" p={4} rounded="lg" shadow="md" border="1px" borderColor="gray.200">
                  <Flex justify="space-between" align="center">
                    <Text color="gray.500">今日訂單</Text>
                    <Flex bg="blue.100" color="blue.500" p={2} rounded="full" align="center" justify="center">
                      <Icon as={FaShoppingCart} />
                    </Flex>
                  </Flex>
                  <Text fontSize="2xl" fontWeight="bold" mt={2}>{todayOrders}</Text>
                  <Text fontSize="sm" color="green.500" mt={1}>↑ {ordersGrowth}% 較昨日</Text>
                </Box>

                <Box bg="white" p={4} rounded="lg" shadow="md" border="1px" borderColor="gray.200">
                  <Flex justify="space-between" align="center">
                    <Text color="gray.500">今日收入</Text>
                    <Flex bg="green.100" color="green.500" p={2} rounded="full" align="center" justify="center">
                      <Icon as={FaMoneyBillWave} />
                    </Flex>
                  </Flex>
                  <Text fontSize="2xl" fontWeight="bold" mt={2}>${todayRevenue}</Text>
                  <Text fontSize="sm" color="green.500" mt={1}>↑ {revenueGrowth}% 較昨日</Text>
                </Box>

                <Box bg="white" p={4} rounded="lg" shadow="md" border="1px" borderColor="gray.200">
                  <Flex justify="space-between" align="center">
                    <Text color="gray.500">新用戶</Text>
                    <Flex bg="purple.100" color="purple.500" p={2} rounded="full" align="center" justify="center">
                      <Icon as={FaUserPlus} />
                    </Flex>
                  </Flex>
                  <Text fontSize="2xl" fontWeight="bold" mt={2}>{newUsers}</Text>
                  <Text fontSize="sm" color="red.500" mt={1}>↓ {Math.abs(usersGrowth)}% 較昨日</Text>
                </Box>

                <Box bg="white" p={4} rounded="lg" shadow="md" border="1px" borderColor="gray.200">
                  <Flex justify="space-between" align="center">
                    <Text color="gray.500">商品銷量</Text>
                    <Flex bg="orange.100" color="orange.500" p={2} rounded="full" align="center" justify="center">
                      <Icon as={FaBoxOpen} />
                    </Flex>
                  </Flex>
                  <Text fontSize="2xl" fontWeight="bold" mt={2}>{productSales}</Text>
                  <Text fontSize="sm" color="green.500" mt={1}>↑ {salesGrowth}% 較昨日</Text>
                </Box>
              </Grid>

              {/* 圖表區域 */}
              <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }} gap={6} mb={8}>
                <Box bg="white" p={4} rounded="lg" shadow="md" border="1px" borderColor="gray.200">
                  <Flex justify="space-between" align="center" mb={4}>
                    <Text fontWeight="medium">近7日銷售額趨勢</Text>
                    <Box fontSize="sm" color="gray.500">
                      <Select size="sm" defaultValue="7days">
                        <option value="7days">過去7天</option>
                        <option value="30days">過去30天</option>
                        <option value="90days">過去90天</option>
                      </Select>
                    </Box>
                  </Flex>
                  {/* 圖表佔位 */}
                  <Center h="64" bg="gray.100" rounded="md">
                    <Box textAlign="center">
                      <Icon as={FaChartLine} fontSize="3xl" color="gray.400" />
                      <Text color="gray.500" mt={2}>銷售趨勢圖</Text>
                    </Box>
                  </Center>
                </Box>

                <Box bg="white" p={4} rounded="lg" shadow="md" border="1px" borderColor="gray.200">
                  <Flex justify="space-between" align="center" mb={4}>
                    <Text fontWeight="medium">熱賣商品分布</Text>
                    <Box fontSize="sm" color="gray.500">
                      <Select size="sm" defaultValue="thisMonth">
                        <option value="thisMonth">本月</option>
                        <option value="lastMonth">上月</option>
                        <option value="thisQuarter">本季度</option>
                      </Select>
                    </Box>
                  </Flex>
                  {/* 圖表佔位 */}
                  <Center h="64" bg="gray.100" rounded="md">
                    <Box textAlign="center">
                      <Icon as={FaChartPie} fontSize="3xl" color="gray.400" />
                      <Text color="gray.500" mt={2}>商品分布圖</Text>
                    </Box>
                  </Center>
                </Box>
              </Grid>

              {/* 數據表格 */}
              <Box bg="white" rounded="lg" shadow="md" border="1px" borderColor="gray.200" p={4} mb={8}>
                <Flex justify="space-between" align="center" mb={4}>
                  <Text fontWeight="medium">最近訂單</Text>
                  <Link color="blue.600" _hover={{ color: "blue.800" }} fontSize="sm" display="flex" alignItems="center">
                    查看所有 <Icon as={FaChevronRight} ml={1} fontSize="sm" />
                  </Link>
                </Flex>
                <Box overflowX="auto">
                  <Table variant="simple">
                    <Thead bg="gray.50">
                      <Tr>
                        <Th fontSize="xs" textTransform="uppercase" color="gray.500">訂單編號</Th>
                        <Th fontSize="xs" textTransform="uppercase" color="gray.500">用戶</Th>
                        <Th fontSize="xs" textTransform="uppercase" color="gray.500">金額</Th>
                        <Th fontSize="xs" textTransform="uppercase" color="gray.500">狀態</Th>
                        <Th fontSize="xs" textTransform="uppercase" color="gray.500">時間</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {recentOrders.map((order) => (
                        <Tr key={order.id}>
                          <Td fontSize="sm" color="gray.500">{order.id}</Td>
                          <Td>
                            <Flex align="center">
                              <Flex 
                                h="8" 
                                w="8" 
                                rounded="full" 
                                bg="gray.200" 
                                align="center" 
                                justify="center" 
                                mr={2}
                              >
                                <Icon as={FaUser} fontSize="sm" />
                              </Flex>
                              <Text fontSize="sm" fontWeight="medium" color="gray.900">{order.user}</Text>
                            </Flex>
                          </Td>
                          <Td fontSize="sm" color="gray.500">${order.amount}</Td>
                          <Td>
                            <Badge 
                              px={2} 
                              py={1} 
                              fontSize="xs" 
                              fontWeight="semibold" 
                              rounded="full" 
                              colorScheme={order.statusColor}
                            >
                              {order.status}
                            </Badge>
                          </Td>
                          <Td fontSize="sm" color="gray.500">{order.time}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default DashboardScreen; 