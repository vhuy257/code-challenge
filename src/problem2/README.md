# Problem 2 - Currency Swap Form

Một ứng dụng Currency Swap form được xây dựng với React và Vite, cho phép người dùng hoán đổi token với tỷ giá real-time.

## ✨ Tính năng

- 🔄 **Real-time Exchange Rates**: Tích hợp API Switcheo để lấy giá token real-time
- 🎨 **Modern UI/UX**: Thiết kế đẹp mắt với animations và responsive design
- 🔍 **Token Search**: Tìm kiếm và chọn token dễ dàng
- 💱 **Instant Conversion**: Tính toán tỷ giá và số tiền nhận được ngay lập tức
- 🖼️ **Token Icons**: Hiển thị icon token từ Switcheo repository
- ✅ **Input Validation**: Validation và error handling đầy đủ
- 🔄 **Auto Refresh**: Tự động cập nhật giá token mỗi 30 giây
- 📱 **Mobile Responsive**: Tối ưu cho mọi thiết bị

## 🚀 Cài đặt và chạy

1. **Cài đặt dependencies:**
```bash
npm install
```

2. **Chạy development server:**
```bash
npm run dev
```

3. **Build cho production:**
```bash
npm run build
```

4. **Preview production build:**
```bash
npm run preview
```

## 🏗️ Cấu trúc project

```
src/
├── components/
│   ├── CurrencySwapForm.jsx    # Component chính của form swap
│   ├── CurrencySwapForm.css    # Styles cho form
│   └── TokenDisplay.jsx        # Component hiển thị thông tin token
├── hooks/
│   └── useTokenPrices.js       # Custom hook quản lý API và data
├── App.jsx                     # Root component
├── App.css                     # App styles
├── main.jsx                    # Entry point
└── index.css                   # Global styles
```

## 🛠️ Công nghệ sử dụng

- **React 18.2** - UI Framework
- **Vite 5.2** - Build tool nhanh
- **Framer Motion** - Animations
- **React Select** - Dropdown component
- **Axios** - HTTP client
- **React Icons** - Icon library

## 🔧 API Integration

- **Token Prices**: `https://interview.switcheo.com/prices.json`
- **Token Icons**: `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/{TOKEN}.svg`

## 📱 Responsive Design

Ứng dụng được thiết kế responsive và hoạt động tốt trên:
- Desktop (1200px+)
- Tablet (768px - 1199px)  
- Mobile (< 768px)

## 🎨 Design Features

- **Gradient Background**: Background gradient đẹp mắt
- **Glass Morphism**: Hiệu ứng glass cho form
- **Smooth Animations**: Animations mượt mà với Framer Motion
- **Dark Mode Support**: Hỗ trợ dark mode
- **Loading States**: Loading states cho better UX
- **Error Handling**: Error messages và retry functionality

## 🚀 Scripts có sẵn

- `npm run dev` - Chạy development server
- `npm run build` - Build production
- `npm run lint` - Chạy ESLint
- `npm run preview` - Preview production build

## 📝 Usage

1. Chọn token nguồn (From)
2. Nhập số lượng muốn swap
3. Chọn token đích (To)
4. Xem tỷ giá và số lượng nhận được
5. Nhấn "CONFIRM SWAP" để hoàn tất

## 🔄 Auto Features

- Tự động tính toán khi thay đổi input
- Tự động refresh giá token mỗi 30 giây
- Tự động validate input
- Tự động format số tiền

## 🎯 Performance

- Lazy loading components
- Optimized re-renders
- Efficient API calls
- Smooth animations với 60fps
