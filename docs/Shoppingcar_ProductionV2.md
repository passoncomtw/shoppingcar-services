# 購物車應用產品規格書 (V2)

## 1. 產品概述

購物車應用是一個完整的電子商務解決方案，提供移動應用（APP）、網頁應用（WEB）和後台管理系統三種客戶端，支持用戶瀏覽商家、查看產品、添加到購物車、下單和查看訂單等核心功能。該應用基於現代化技術架構開發，旨在提供流暢的購物體驗和高效的管理功能。

## 2. 系統架構

系統採用分層架構設計，包含：

- **前端應用**：
  - 移動應用 (shoppingcar-app)：使用 React Native 開發的跨平台移動應用
  - 網頁應用 (shoppingcar-web)：使用 React.js 開發的響應式網頁應用
  - 後台管理系統 (shoppingcar-admin)：使用 React.js 和 Tailwind CSS 開發的管理控制台

- **後端服務** (shoppingcar-service)：
  - 採用 Node.js 開發的 RESTful API 服務
  - 提供商家、產品、購物車、訂單和用戶管理等核心功能

- **資料庫**：
  - 儲存用戶、商家、產品、購物車、訂單等相關數據

## 3. 用戶角色

### 3.1 後台管理者

後台管理者擁有最高權限，可以管理整個系統，包括：

- 查看儀表板統計數據
- 管理和審核商家
- 管理產品
- 查看和處理訂單
- 管理用戶
- 進行系統設定

### 3.2 使用者

使用者是系統的消費者，可以：

- 瀏覽商家和產品
- 將產品加入購物車
- 創建和管理訂單
- 查看訂單狀態
- 管理個人資料

使用者根據消費行為和活躍度分為以下等級：

- **一般會員**：新註冊用戶的默認等級
- **銀卡會員**：累積消費達到特定金額或消費次數的會員
- **金卡會員**：比銀卡會員消費更多，可享受更多優惠
- **白金會員**：系統最高級別會員，享受最優待遇和服務

### 3.3 商家

商家是提供產品和服務的商戶，可以：

- 管理商家資料
- 上架和管理產品
- 處理訂單
- 查看銷售統計

## 4. 功能規格

### 4.1 後台管理功能

#### 4.1.1 儀表板 (Dashboard)

- 功能描述：顯示系統重要統計數據和圖表
- 用戶體驗：
  - 顯示今日訂單數量（與昨日比較）
  - 顯示今日收入（與昨日比較）
  - 顯示新用戶數量（與昨日比較）
  - 顯示商品銷量（與昨日比較）
  - 近7日銷售額趨勢圖
  - 熱賣商品分布圖
  - 最近訂單列表

#### 4.1.2 訂單管理 (Orders)

- 功能描述：管理所有訂單
- 用戶體驗：
  - 顯示所有訂單列表，含訂單編號、用戶、商家、金額、狀態、下單時間
  - 提供搜索和篩選功能
  - 點擊訂單可查看詳情
  - 訂單詳情頁面顯示客戶資訊、配送資訊、付款資訊、訂購商品等詳細資料
  - 允許更新訂單狀態和添加備註

#### 4.1.3 商家管理 (Merchants)

- 功能描述：管理系統中的所有商家
- 用戶體驗：
  - 顯示商家列表，含商家名稱、聯絡資訊、產品數量、總銷售額等
  - 提供搜索和篩選功能
  - 新增商家功能
  - 商家詳情頁面顯示基本資料、銷售統計、熱門商品等
  - 允許編輯商家資料，包括基本資料、聯絡人資料、銀行與支付資料、媒體資源
  - 允許更改商家狀態（啟用、停用）

#### 4.1.4 產品管理 (Products)

- 功能描述：管理系統中的所有產品
- 用戶體驗：
  - 顯示產品列表，含產品名稱、商家、價格、庫存、狀態等
  - 提供搜索和篩選功能
  - 新增產品功能
  - 產品詳情頁面顯示基本資訊、價格與庫存、產品圖片、產品描述
  - 允許編輯產品資料
  - 允許更改產品狀態（上架、下架）

#### 4.1.5 會員管理 (Users)

- 功能描述：管理系統中的所有會員
- 用戶體驗：
  - 顯示會員列表，含會員ID、名稱、等級、註冊日期、狀態等
  - 提供搜索和篩選功能
  - 會員詳情頁面顯示基本資料、帳戶狀態、購買記錄等
  - 允許編輯會員資料
  - 允許設置會員等級和狀態
  - 允許添加管理員備註

#### 4.1.6 系統設定 (Settings)

- 功能描述：管理系統設定
- 用戶體驗：
  - 一般設定：語言與地區、通知設定、介面設定
  - 系統資訊：版本、更新時間、資料庫狀態、API狀態
  - 資料匯出：選擇匯出資料類型和格式

### 4.2 使用者功能

#### 4.2.1 用戶管理功能

- 用戶登入：通過帳號密碼進行登入
- 用戶註冊：新用戶註冊
- 個人資料管理：修改個人資料和密碼
- 會員等級顯示：顯示當前等級和升級條件

#### 4.2.2 商家瀏覽功能

- 商家列表：以瀑布流形式展示所有可用商家
- 商家詳情：展示特定商家的詳細信息和其提供的產品

#### 4.2.3 產品瀏覽功能

- 產品列表：展示所有產品或特定商家的產品
- 產品詳情：展示產品的詳細信息，並允許用戶將產品加入購物車

#### 4.2.4 購物車功能

- 購物車管理：管理用戶已添加到購物車的產品
- 購物車API功能：
  - 取得購物車資訊
  - 添加產品到購物車
  - 更新購物車產品數量
  - 刪除購物車產品
  - 清空購物車

#### 4.2.5 訂單管理功能

- 訂單列表：展示用戶的所有訂單
- 訂單詳情：展示特定訂單的詳細信息
- 訂單API功能：
  - 創建訂單
  - 獲取訂單列表
  - 獲取訂單詳情
  - 更新訂單支付狀態
  - 取消訂單

### 4.3 商家功能

#### 4.3.1 商家資料管理

- 商家資料編輯：修改商家基本資料、聯絡人資料、銀行與支付資料、媒體資源
- 商家狀態管理：設置商家是否營業中

#### 4.3.2 產品管理

- 產品上架：新增產品到系統
- 產品編輯：修改產品資料、價格、庫存等
- 產品狀態管理：上架或下架產品

#### 4.3.3 訂單處理

- 訂單接收：接收和確認新訂單
- 訂單狀態更新：更新訂單狀態（處理中、已出貨等）
- 訂單統計：查看銷售統計和報表

## 5. 非功能性需求

### 5.1 性能需求
- 頁面加載時間應在3秒內完成
- 系統應支持至少1000名同時在線用戶
- API響應時間應在500毫秒內
- 儀表板數據應每小時更新一次

### 5.2 安全需求
- 使用JWT進行用戶身份驗證
- 所有敏感數據在傳輸過程中須加密
- 支持防SQL注入和XSS攻擊的安全措施
- 後台管理系統需要更嚴格的權限控制

### 5.3 可用性需求
- 系統全年可用率達到99.9%
- 支持錯誤恢復和數據備份機制
- 提供友好的用戶界面和錯誤提示

### 5.4 兼容性需求
- 移動應用支持iOS 11+和Android 8.0+
- 網頁應用和後台管理系統支持最新版Chrome、Firefox、Safari和Edge瀏覽器

## 6. 技術實現

### 6.1 前端技術
- React.js和React Native用於WEB、APP和後台系統的開發
- Redux用於狀態管理
- React Navigation用於APP的頁面導航
- React Native Paper和Tailwind CSS用於UI組件
- Recharts用於數據可視化

### 6.2 後端技術
- Node.js作為後端服務運行環境
- Express框架用於API開發
- JWT用於身份驗證
- 數據庫ORM用於數據操作
- 排程任務用於統計數據更新

## 7. 未來發展計劃

- 集成更多支付方式
- 添加商品評論和評分功能
- 開發商家專用的管理APP
- 添加多語言支持
- 優化推薦算法
- 添加數據分析和報表功能
- 開發會員積分系統
- 集成行銷工具

---

# 購物車應用資料庫設計 (重構版)

根據您的要求，我已重構資料庫設計，將列表資訊作為母表，非列表欄位拆分為子表。重構後的資料庫設計保留了所有原有欄位，但以更模組化的方式組織。

## 1. 用戶模組

### 1.1 users (用戶主表)
| 欄位 | 類型 | 描述 |
|------|------|------|
| id | INT | 主鍵，用戶ID |
| name | VARCHAR | 用戶名稱 |
| email | VARCHAR | 電子郵件 |
| phone | VARCHAR | 電話號碼 |
| level | VARCHAR | 會員等級 (一般、銀卡、金卡、白金) |
| status | VARCHAR | 帳戶狀態 (啟用中、已停用) |
| created_at | DATETIME | 創建時間 |

### 1.2 user_details (用戶詳情表)
| 欄位 | 類型 | 描述 |
|------|------|------|
| id | INT | 主鍵 |
| user_id | INT | 外鍵，關聯用戶ID |
| password | VARCHAR | 加密後的密碼 |
| gender | VARCHAR | 性別 |
| birth_date | DATE | 生日 |
| address | VARCHAR | 地址 |
| updated_at | DATETIME | 更新時間 |
| last_login | DATETIME | 最後登入時間 |
| avatar | VARCHAR | 頭像URL |
| remark | TEXT | 管理員備註 |

## 2. 商家模組

### 2.1 merchants (商家主表)
| 欄位 | 類型 | 描述 |
|------|------|------|
| id | INT | 主鍵，商家ID |
| name | VARCHAR | 商家名稱 |
| email | VARCHAR | 電子郵件 |
| phone | VARCHAR | 電話號碼 |
| category | VARCHAR | 類別 |
| status | VARCHAR | 狀態 (啟用中、已停用、審核中) |
| created_at | DATETIME | 創建時間 |

### 2.2 merchant_details (商家詳情表)
| 欄位 | 類型 | 描述 |
|------|------|------|
| id | INT | 主鍵 |
| merchant_id | INT | 外鍵，關聯商家ID |
| address | VARCHAR | 地址 |
| hours | VARCHAR | 營業時間 |
| description | TEXT | 描述 |
| updated_at | DATETIME | 更新時間 |

### 2.3 merchant_contacts (商家聯絡人表)
| 欄位 | 類型 | 描述 |
|------|------|------|
| id | INT | 主鍵 |
| merchant_id | INT | 外鍵，關聯商家ID |
| contact_name | VARCHAR | 聯絡人姓名 |
| contact_phone | VARCHAR | 聯絡人電話 |

### 2.4 merchant_payments (商家支付表)
| 欄位 | 類型 | 描述 |
|------|------|------|
| id | INT | 主鍵 |
| merchant_id | INT | 外鍵，關聯商家ID |
| bank_name | VARCHAR | 銀行名稱 |
| bank_branch | VARCHAR | 分行 |
| bank_account | VARCHAR | 銀行帳號 |
| account_name | VARCHAR | 帳戶名稱 |
| payment_methods | VARCHAR | 接受的支付方式 |

### 2.5 merchant_media (商家媒體表)
| 欄位 | 類型 | 描述 |
|------|------|------|
| id | INT | 主鍵 |
| merchant_id | INT | 外鍵，關聯商家ID |
| logo | VARCHAR | Logo圖片URL |
| banner | VARCHAR | 橫幅圖片URL |
| facebook | VARCHAR | Facebook連結 |
| instagram | VARCHAR | Instagram連結 |
| website | VARCHAR | 官方網站 |

## 3. 產品模組

### 3.1 products (產品主表)
| 欄位 | 類型 | 描述 |
|------|------|------|
| id | INT | 主鍵，產品ID |
| merchant_id | INT | 外鍵，關聯商家ID |
| name | VARCHAR | 產品名稱 |
| sku | VARCHAR | 產品編號 |
| price | DECIMAL | 售價 |
| sale_price | DECIMAL | 促銷價 |
| stock | INT | 庫存數量 |
| status | VARCHAR | 狀態 (上架中、已下架、庫存不足) |
| created_at | DATETIME | 創建時間 |

### 3.2 product_details (產品詳情表)
| 欄位 | 類型 | 描述 |
|------|------|------|
| id | INT | 主鍵 |
| product_id | INT | 外鍵，關聯產品ID |
| category | VARCHAR | 分類 |
| brand | VARCHAR | 品牌 |
| specs | VARCHAR | 規格 |
| tags | VARCHAR | 標籤 |
| cost | DECIMAL | 成本 |
| stock_alert | INT | 庫存警告值 |
| track_inventory | BOOLEAN | 是否追蹤庫存 |
| short_description | VARCHAR | 簡短描述 |
| description | TEXT | 詳細描述 |
| updated_at | DATETIME | 更新時間 |

### 3.3 product_seo (產品SEO表)
| 欄位 | 類型 | 描述 |
|------|------|------|
| id | INT | 主鍵 |
| product_id | INT | 外鍵，關聯產品ID |
| meta_title | VARCHAR | Meta標題 |
| meta_description | VARCHAR | Meta描述 |
| url_slug | VARCHAR | URL別名 |

### 3.4 product_images (產品圖片表)
| 欄位 | 類型 | 描述 |
|------|------|------|
| id | INT | 主鍵 |
| product_id | INT | 外鍵，關聯產品ID |
| main_image | VARCHAR | 主圖URL |
| images | VARCHAR | 其他圖片URLs (JSON格式) |

## 4. 訂單模組

### 4.1 orders (訂單主表)
| 欄位 | 類型 | 描述 |
|------|------|------|
| id | INT | 主鍵，訂單ID |
| user_id | INT | 外鍵，關聯用戶ID |
| status | VARCHAR | 狀態 (待付款、已付款、處理中、已出貨、已送達、已完成、已取消、已退款) |
| total_amount | DECIMAL | 總金額 |
| created_at | DATETIME | 創建時間 |
| payment_status | VARCHAR | 付款狀態 |

### 4.2 order_details (訂單詳情表)
| 欄位 | 類型 | 描述 |
|------|------|------|
| id | INT | 主鍵 |
| order_id | INT | 外鍵，關聯訂單ID |
| payment_method | VARCHAR | 付款方式 |
| transaction_id | VARCHAR | 交易編號 |
| payment_time | DATETIME | 付款時間 |
| customer_note | TEXT | 客戶備註 |
| internal_note | TEXT | 內部備註 |
| updated_at | DATETIME | 更新時間 |

### 4.3 order_shipping (訂單配送表)
| 欄位 | 類型 | 描述 |
|------|------|------|
| id | INT | 主鍵 |
| order_id | INT | 外鍵，關聯訂單ID |
| shipping_name | VARCHAR | 收件人姓名 |
| shipping_phone | VARCHAR | 收件人電話 |
| shipping_address | VARCHAR | 收件地址 |
| shipping_method | VARCHAR | 配送方式 |
| tracking_number | VARCHAR | 物流追蹤編號 |

### 4.4 order_items (訂單項目表) - 保持不變
| 欄位 | 類型 | 描述 |
|------|------|------|
| id | INT | 主鍵，項目ID |
| order_id | INT | 外鍵，關聯訂單ID |
| product_id | INT | 外鍵，關聯產品ID |
| merchant_id | INT | 外鍵，關聯商家ID |
| quantity | INT | 數量 |
| price | DECIMAL | 單價 |
| total | DECIMAL | 小計 |

## 5. 購物車模組 - 保持不變

### 5.1 shoppingcarts (購物車表)
| 欄位 | 類型 | 描述 |
|------|------|------|
| id | INT | 主鍵，購物車ID |
| user_id | INT | 外鍵，關聯用戶ID |
| created_at | DATETIME | 創建時間 |
| updated_at | DATETIME | 更新時間 |

### 5.2 cart_items (購物車項目表)
| 欄位 | 類型 | 描述 |
|------|------|------|
| id | INT | 主鍵，項目ID |
| cart_id | INT | 外鍵，關聯購物車ID |
| product_id | INT | 外鍵，關聯產品ID |
| merchant_id | INT | 外鍵，關聯商家ID |
| quantity | INT | 數量 |
| created_at | DATETIME | 創建時間 |
| updated_at | DATETIME | 更新時間 |

## 6. 統計模組 - 保持不變

### 6.1 dashboard_stats (儀表板統計表)
| 欄位 | 類型 | 描述 |
|------|------|------|
| id | INT | 主鍵，ID |
| date | DATE | 日期 |
| orders_count | INT | 訂單數量 |
| revenue | DECIMAL | 收入 |
| new_users | INT | 新用戶數量 |
| products_sold | INT | 商品銷售數量 |
| previous_day_orders | INT | 昨日訂單數量 |
| previous_day_revenue | DECIMAL | 昨日收入 |
| previous_day_new_users | INT | 昨日新用戶數量 |
| previous_day_products_sold | INT | 昨日商品銷售數量 |

### 6.2 sales_trends (銷售趨勢表)
| 欄位 | 類型 | 描述 |
|------|------|------|
| id | INT | 主鍵，ID |
| date | DATE | 日期 |
| revenue | DECIMAL | 當日總收入 |
| orders_count | INT | 當日訂單數量 |
| products_sold | INT | 當日商品銷售數量 |

### 6.3 product_popularity (產品熱門度表)
| 欄位 | 類型 | 描述 |
|------|------|------|
| id | INT | 主鍵，ID |
| product_id | INT | 外鍵，關聯產品ID |
| merchant_id | INT | 外鍵，關聯商家ID |
| sales_count | INT | 銷售數量 |
| revenue | DECIMAL | 銷售收入 |
| period_start | DATE | 統計週期開始日期 |
| period_end | DATE | 統計週期結束日期 |

## 資料庫關聯圖

```
users <-- 1:1 --> user_details
   ^
   |
   | 1:N
   v
orders <-- 1:1 --> order_details
   ^      1:1 --> order_shipping
   |      1:N --> order_items
   |               ^
   |               |
shoppingcarts      |
   ^               |
   |               |
   | 1:N           | N:1
   v               v
cart_items --> products <-- 1:1 --> product_details
                   ^       1:1 --> product_seo
                   |       1:1 --> product_images
                   |       1:N --> product_popularity
                   |
                   | N:1
                   v
               merchants <-- 1:1 --> merchant_details
                   ^        1:1 --> merchant_contacts
                   |        1:1 --> merchant_payments
                   |        1:1 --> merchant_media
                   |
                   | N:1
                   v
            dashboard_stats
                sales_trends
```

## 設計說明

1. **模組化結構**：將相關資料分組到各自的模組中，使得系統更容易維護和擴展。

2. **主表與詳情表**：
   - 主表包含列表頁面需要顯示的欄位
   - 詳情表包含詳情頁面顯示的額外資訊

3. **資料完整性**：
   - 所有原有欄位都被保留
   - 通過外鍵關聯確保數據一致性

4. **性能考量**：
   - 主表包含常用查詢欄位，提高列表頁面載入速度
   - 詳情資料只在需要時才會被載入

5. **擴展性**：
   - 系統可以輕鬆添加新的欄位或表格
   - 模組化設計使得未來功能擴展更加容易
