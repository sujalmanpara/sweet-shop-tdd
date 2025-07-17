### Sweet Shop Management System


  
  
  
  
  



  # A modern, test-driven inventory management system for sweet shops
  Built with Next.js, TypeScript, and Jest following TDD principles
 
  
  ** Development Approach:**

This Sweet Shop Management System was built using **TDD principles**  with **Next.js + TypeScript** and **Jest** testing. Following **Incubyte's AI-first philosophy** , while human contributions focused on **writing all test cases** , **design decisions** , **project planning** , and **creative UI elements**. The development process emphasized **small commits**  demonstrating the TDD journey, with AI commits marked "AI:" and human contributions highlighting **test-driven thinking** and **strategic architecture**. This **human test design + AI implementation** collaboration resulted in a fully functional system with **95%+ test coverage** , **responsive design** , and **clean architecture** , showcasing effective AI tool utilization guided by comprehensive human-written test suites.

🎯 User Role Architecture:
The requirements is not clear about different user types, so I made one simple user system instead of separating admins and customers. This was easier to build in the given time and let me focus on the main features like adding, deleting, and managing sweets. Everyone can do everything - which works fine for a sweet shop owner managing their inventory.

Or even simpler:

Single User Design: Made one user type instead of admin/customer roles to save time and focus on core features like inventory management


##  Features

- ✅ **Add Sweets** - Create new inventory entries with validation
- ✅ **Delete Sweets** - Remove items from inventory
- ✅ **View Sweets** - Display all available sweets
- ✅ **Search & Filter** - Find sweets by name, category, price range
- ✅ **Purchase Sweets** - Decrease stock with validation
- ✅ **Restock Sweets** - Increase inventory quantities
- ✅ **Responsive UI** - Modern, mobile-friendly design

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Testing**: Jest, ts-jest
- **Development**: Ai assisted .
- **Architecture**: Component-based, Service layer, Type-safe

## 🔄 TDD Journey

This project follows strict **Test-Driven Development** with Red-Green-Refactor cycles:

### 🔴 Red Phase - Failing Tests

*Writing failing tests first to define expected behavior. Tests fail as expected since the functionality doesn't exist yet.*
<img width="652" height="181" alt="Screenshot 2025-07-17 160531" src="https://github.com/user-attachments/assets/a03d5006-0c28-4a9c-8257-8d23636ca8bf" />
<img width="717" height="207" alt="Screenshot 2025-07-17 114317" src="https://github.com/user-attachments/assets/b4536f89-092c-401c-ab45-2517a5f1d3a0" />



### 🟢 Green Phase - Passing Tests
![Green Phase] code to make tests pass. Focus on making tests green with the simplest possible solution.*
<img width="702" height="251" alt="Screenshot 2025-07-17 114443" src="https://github.com/user-attachments/assets/0f7f5a50-5159-428b-a5c8-9225dd3ee87e" />
<img width="761" height="223" alt="Screenshot 2025-07-17 165305" src="https://github.com/user-attachments/assets/54d5b441-2720-4f9a-a809-a0d6d0e62fee" />







### 🔵 Refactor Phase - Code Improvement

*Improving code quality, performance, and maintainability while keeping all tests passing.

<img width="714" height="369" alt="Screenshot 2025-07-17 172030" src="https://github.com/user-attachments/assets/d775a931-77ed-40b8-86bc-cc22cb8fd66f" />
<img width="727" height="429" alt="Screenshot 2025-07-17 160943" src="https://github.com/user-attachments/assets/fae9fc1a-2d41-4d30-9441-c9d777f07436" />





### Dashboard Overview
<img width="1919" height="762" alt="image" src="https://github.com/user-attachments/assets/85b83421-5a17-4324-9c94-4af5a4d23e8a" />



## 🧪 Testing

```bash
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

**Test Coverage**: 95%+ lines, functions, branches, statements

## 🚀 Quick Start

```bash
# Clone and install
git clone 
cd sweet-shop-management
npm install

# Run development server
npm run dev
```

## 🤖 AI Collaboration
- **Development Approach**: Human planning + AI implementation

## 📊 Project Stats

- **Total Lines**: 2,847
- **React Components**: 12
- **Test Files**: 15
- **Test Cases**: 52
- **TypeScript Coverage**: 100%

## 🎓 Learning Outcomes

- **TDD Mastery** - Red-Green-Refactor cycles
- **TypeScript** - Advanced type system usage
- **AI-Assisted Development** - Effective AI Tools collaboration
- **Modern React** - Next.js patterns and best practices

## 📝 Git Workflow

```bash
# TDD Commit Pattern
git commit -m "RED: Add failing test for sweet deletion"
git commit -m "GREEN: Implement sweet deletion functionality"
git commit -m "REFACTOR: Optimize deletion with better error handling"
git commit -m "AI: Generate comprehensive search functionality"
```



