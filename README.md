## 🎨 Artwork Gallery - React Data Table Application

<div align="center">

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![PrimeReact](https://img.shields.io/badge/PrimeReact-10.9.7-007bff?style=for-the-badge&logo=react&logoColor=white)

**A React + TypeScript application displaying artwork from the Art Institute of Chicago API with advanced pagination and selection features**

</div>

---

## 📋 Overview

This project is built for the **Grow Me Organic React Internship Assignment**.  
It implements a data table with **server-side pagination** and **persistent row selection** using the  
[Art Institute of Chicago API](https://api.artic.edu/api/v1/artworks).

The main focus of this assignment is to efficiently manage large datasets while ensuring correct selection behavior across multiple pages without unnecessary data fetching.

---

## ✅ Assignment Requirements Met

- ✅ Built with **Vite** and **TypeScript** (not JavaScript)
- ✅ Uses **PrimeReact DataTable** component
- ✅ Displays all required fields:  
  `title`, `place_of_origin`, `artist_display`, `inscriptions`, `date_start`, `date_end`
- ✅ Implements **server-side pagination** (fetches data per page, not all at once)
- ✅ Row selection with checkboxes (individual and page-level)
- ✅ **Custom bulk selection** via overlay panel
- ✅ **Persistent selection** across page navigation
- ✅ **No prefetching** – Uses ID-based tracking strategy instead of storing row objects

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

- **React** 19.2.0 – UI Framework
- **TypeScript** 5.9.3 – Type Safety
- **Vite** 7.2.4 – Build Tool
- **PrimeReact** 10.9.7 – DataTable Component
- **Art Institute of Chicago API** – Data Source

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
The application will run on http://localhost:5173

🎮 Usage
View Artworks: Table loads with 12 artworks on page 1

Navigate Pages: Use pagination controls at the bottom

Select Rows: Click checkboxes to select individual rows

Select All on Page: Click header checkbox

Custom Selection:

Click "Custom Select" button

Enter number of rows (e.g., 50)

Click Submit

First N rows across all pages will be selected

Testing Persistent Selection
Select some rows on page 1

Navigate to page 2

Return to page 1

✅ Your selections are still there

🏗 Project Structure
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
🔑 Key Implementation: Selection Strategy
The Challenge
Maintain selection across pages WITHOUT prefetching or storing row objects from other pages.

The Solution: Global Index Calculation
const globalIndex = (currentPage - 1) * rowsPerPage + localIndex;
How It Works
Two Selection Modes:

Normal Mode

Tracks individual selections via a Set of selected row IDs

Bulk Mode

Uses global index calculation to decide whether a row should be selected

Explicit deselections are tracked separately

Example: Selecting First 50 Rows

Page 1 (rows 0–11):   All selected ✓
Page 2 (rows 12–23):  All selected ✓
Page 3 (rows 24–35):  All selected ✓
Page 4 (rows 36–47):  All selected ✓
Page 5 (rows 48–59):  First 2 selected ✓
Page 6+:              None selected
Data Structures Used:

selectedIds: Set of explicitly selected row IDs

deselectedIds: Set of explicitly deselected IDs (bulk mode)

bulkSelectionCount: Number of rows selected from the start

Why This Approach?
✅ Memory Efficient – Only stores IDs, not full objects
✅ No Prefetching – Doesn't fetch pages in advance
✅ Fast – O(1) lookups using Set
✅ Scalable – Works with any number of rows
✅ Compliant – Meets assignment requirements

🌐 API Integration
Endpoint:
https://api.artic.edu/api/v1/artworks?page={pageNumber}

Response Structure:

{
  pagination: {
    total: number,
    limit: number,
    current_page: number
  },
  data: Artwork[]
}
Fields Displayed:

title – Artwork title

place_of_origin – Origin location

artist_display – Artist information

inscriptions – Inscriptions (shows "N/A" if null)

date_start – Start date

date_end – End date

🧪 Testing Checklist
 Initial page loads with 12 artworks

 Pagination controls work

 Individual row selection works

 Select all on page works

 Custom selection overlay works

 Selections persist across pages

 Selection count updates correctly

 Handles edge cases

 Loading and error states work

📝 Code Quality
TypeScript strict mode enabled

No any types

Modular component structure

Reusable custom hooks

Clear and maintainable logic

👩‍💻 Author
Soumya Raj

🎓 3rd Year B.Tech CSE (AI)

💻 Frontend / React Developer

GitHub: https://github.com/soumyaraj21

Email: soumya2115@gmail.com

🙏 Acknowledgments
Art Institute of Chicago for the public API

PrimeReact for the DataTable component

Grow Me Organic for the assignment opportunity

<div align="center">
Made with ❤️ by Soumya Raj for the Grow Me Organic Internship Assignment

⭐ If you found this project helpful, please give it a star!

</div> ```
