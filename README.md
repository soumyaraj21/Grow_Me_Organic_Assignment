# 🎨 Artwork Gallery - React Data Table Application

<div align="center">

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![PrimeReact](https://img.shields.io/badge/PrimeReact-10.9.7-007bff?style=for-the-badge&logo=react&logoColor=white)

**A React + TypeScript application displaying artwork from the Art Institute of Chicago API with advanced pagination and selection features**

(🔗 Live Demo: https://soumya-artwork-gallery.netlify.app/)


</div>

---

## 📋 Overview

This project is built for the **Grow Me Organic React Internship Assignment**. It implements a data table with server-side pagination and persistent row selection using the [Art Institute of Chicago API](https://api.artic.edu/api/v1/artworks).

### ✅ Assignment Requirements Met

- ✅ Built with **Vite** and **TypeScript** (not JavaScript)
- ✅ Uses **PrimeReact DataTable** component
- ✅ Displays all required fields: `title`, `place_of_origin`, `artist_display`, `inscriptions`, `date_start`, `date_end`
- ✅ Implements **server-side pagination** (fetches data per page, not all at once)
- ✅ Row selection with checkboxes (individual and page-level)
- ✅ **Custom bulk selection** via overlay panel
- ✅ **Persistent selection** across page navigation
- ✅ **No prefetching** - Uses ID-based tracking strategy instead of storing row objects

---

## ✨ Key Features

### 1. Server-Side Pagination
- Fetches only current page data (12 rows per page)
- Fresh API call on every page change
- No caching of previous pages

### 2. Row Selection
- Select/deselect individual rows
- Select/deselect all rows on current page
- Custom bulk selection via overlay panel (select first N rows)
- Real-time selection count display

### 3. Persistent Selection
- Selections maintained when navigating between pages
- Works without prefetching or storing row objects from other pages
- Uses **global index calculation** strategy

---

## 🛠 Tech Stack

- **React** 19.2.0 - UI Framework
- **TypeScript** 5.9.3 - Type Safety
- **Vite** 7.2.4 - Build Tool
- **PrimeReact** 10.9.7 - DataTable Component
- **Art Institute of Chicago API** - Data Source

---

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Steps

```bash
# Clone the repository
git clone https://github.com/soumyaraj21/Grow_Me_Organic_Assignment
cd Grow_Me_Organic_Assignment

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

The application will run on `http://localhost:5173`

---

## 🎮 Usage

1. **View Artworks**: Table loads with 12 artworks on page 1
2. **Navigate Pages**: Use pagination controls at the bottom
3. **Select Rows**: Click checkboxes to select individual rows
4. **Select All on Page**: Click header checkbox
5. **Custom Selection**: 
   - Click "Custom Select" button
   - Enter number of rows (e.g., 50)
   - Click Submit
   - First N rows across all pages will be selected

### Testing Persistent Selection
1. Select some rows on page 1
2. Navigate to page 2
3. Return to page 1
4. ✅ Your selections are still there!

---

## 🏗 Project Structure

```
src/
├── components/
│   ├── ArtworkTable.tsx          # Main table component
│   ├── ArtworkTable.css
│   ├── CustomSelectionPanel.tsx  # Bulk selection overlay
│   └── CustomSelectionPanel.css
├── hooks/
│   ├── useArtworkData.ts         # Data fetching hook
│   └── useRowSelection.ts        # Selection logic hook
├── services/
│   └── artworkService.ts         # API service
├── types/
│   └── artwork.ts                # TypeScript interfaces
├── App.tsx
├── App.css
├── main.tsx
└── index.css
```

---

## 🔑 Key Implementation: Selection Strategy

### The Challenge
Maintain selection across pages **WITHOUT** prefetching or storing row objects from other pages.

### The Solution: Global Index Calculation

Instead of fetching rows from other pages, we use a mathematical approach:

```typescript
// Calculate global position of any row
const globalIndex = (currentPage - 1) * rowsPerPage + localIndex;
```

### How It Works

**Two Selection Modes:**

1. **Normal Mode**: Tracks individual selections via `selectedIds` Set
2. **Bulk Mode**: Uses global index to determine if a row should be selected

**Example: Selecting First 50 Rows**
```
Page 1 (rows 0-11):   All selected ✓
Page 2 (rows 12-23):  All selected ✓
Page 3 (rows 24-35):  All selected ✓
Page 4 (rows 36-47):  All selected ✓
Page 5 (rows 48-59):  First 2 selected ✓
Page 6+:              None selected
```

**Data Structures:**
- `selectedIds`: Set of explicitly selected row IDs
- `deselectedIds`: Set of explicitly deselected row IDs (in bulk mode)
- `bulkSelectionCount`: Number of rows to select from start

### Why This Approach?

✅ **Memory Efficient** - Only stores IDs, not full objects  
✅ **No Prefetching** - Doesn't fetch pages in advance  
✅ **Fast** - O(1) lookups with Set data structure  
✅ **Scalable** - Works with any number of rows  
✅ **Compliant** - Meets assignment requirements  

---

## 🌐 API Integration

**Endpoint:** `https://api.artic.edu/api/v1/artworks?page={pageNumber}`

**Response Structure:**
```typescript
{
  pagination: {
    total: number,
    limit: number,
    current_page: number,
    // ...
  },
  data: Artwork[]
}
```

**Fields Displayed:**
- `title` - Artwork title
- `place_of_origin` - Origin location
- `artist_display` - Artist information
- `inscriptions` - Inscriptions (shows "N/A" if null)
- `date_start` - Start date
- `date_end` - End date

---

## 🚀 Deployment

### Build Command
```bash
npm run build
```

### Deployment Platform
The application is deployed using **Netlify**.

**Live URL:**  
🔗 https://gmo-assignmentt.netlify.app/

**Configuration:**
- Build command: `npm run build`
- Publish directory: `dist`

---

## 🧪 Testing Checklist

- [x] Initial page loads with 12 artworks
- [x] Pagination controls work
- [x] Individual row selection works
- [x] Select all on page works
- [x] Custom selection overlay works
- [x] Selections persist across pages
- [x] Clear selection works
- [x] Selection count updates correctly
- [x] Handles selecting more rows than available
- [x] Loading and error states work

---

## 📝 Code Quality

- **TypeScript**: Strict mode enabled, no `any` types
- **ESLint**: Configured with React and TypeScript rules
- **Code Organization**: Modular components and custom hooks
- **Comments**: Comprehensive inline documentation
- **Type Safety**: All components and functions are fully typed

---

## 🎯 Assignment Compliance

### ✅ Implementation Approach

1. **No Prefetching**: Rows from other pages are not fetched and stored
2. **ID-Based Tracking**: Only row IDs are stored, not full objects
3. **Fresh API Calls**: Each page navigation fetches fresh data
4. **Efficient Strategy**: Global index calculation for bulk selection

### ❌ Avoided Anti-Patterns

```typescript
// ❌ AVOIDED: This type of logic that fetches multiple pages
while (collected < count) {
  const response = await fetch(`/artworks?page=${currentPage}`);
  // ... storing rows from other pages
}
```

Instead, the implementation uses:
```typescript
// ✅ USED: Mathematical approach with global index
const globalIndex = (currentPage - 1) * rowsPerPage + index;
if (globalIndex < bulkSelectionCount) {
  return !deselectedIds.has(artwork.id);
}
```

---

## 👩‍💻 Author

**Soumya Raj**

- 🎓 3rd Year B.Tech CSE (AI)
- 💻 Frontend / React Developer
- GitHub: https://github.com/soumyaraj21
- Email: soumya2115@gmail.com


---

## 🙏 Acknowledgments

- **Art Institute of Chicago** for the public API
- **PrimeReact** for the DataTable component
- **Grow Me Organic** for the assignment opportunity

---

<div align="center">

**Made with ❤️ for Grow Me Organic Internship Assignment**

⭐ If you found this project helpful, please give it a star!

</div>