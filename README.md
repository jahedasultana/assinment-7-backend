# Portfolio Website - Backend API

A robust REST API built with Node.js and Express, providing data management for the portfolio website with full CRUD operations for projects and blogs.

## Live Deployment

**API Base URL:** [https://assinment-7-backend.vercel.app/](https://assinment-7-backend.vercel.app/)

## Project Overview

This is the backend API server for the portfolio website that provides:

### Key Features

- **RESTful API** - Clean, consistent API endpoints
- **CRUD Operations** - Full Create, Read, Update, Delete functionality
- **Data Validation** - Input validation and sanitization
- **Error Handling** - Comprehensive error responses
- **CORS Support** - Cross-origin resource sharing enabled
- **File Upload** - Image upload functionality for projects and blogs
- **Pagination** - Efficient data retrieval with pagination
- **Search & Filter** - Advanced querying capabilities

### Main Endpoints

- **Projects API** - Manage portfolio projects
- **Blogs API** - Handle blog posts and articles
- **File Upload** - Image and media management

## Technology Stack

### Backend Framework
- **Node.js** - JavaScript runtime environment
- **Express.js** - Fast, minimalist web framework
- **TypeScript** - Type-safe development

### Database & ORM
- **PostgreSQL** - Robust relational database
- **Prisma** - Modern database toolkit and ORM

### Cloud Storage
- **Cloudinary** - Cloud-based image and video management

### Middleware & Utilities
- **CORS** - Cross-origin resource sharing
- **Multer** - File upload handling
- **Express Validator** - Input validation

### Development Tools
- **Nodemon** - Development server with auto-restart
- **ESLint** - Code linting and formatting
- **Prisma Studio** - Database GUI

## 🚀 Setup Instructions

### Prerequisites
- Node.js 16+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <https://github.com/jahedasultana/assinment-7-backend.git>
   cd portfolio-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   NODE_ENV=development
   DATABASE_URL="postgresql://username:password@localhost:5432/portfolio_db"
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. **Database Setup**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Run Development Server**
   ```bash
   npm run dev
   ```
   Server will start at [http://localhost:8000](http://localhost:8000)

### Production Setup

```bash
npm start
```

## Project Structure

```
server/
├── src/
│   ├── controllers/      # Request handlers
│   │   ├── blogController.ts
│   │   └── projectController.ts
│   ├── middleware/       # Custom middleware
│   │   ├── upload.ts    # Cloudinary upload configuration
│   │   └── validation.ts # Input validation
│   ├── routes/          # API routes
│   │   ├── blogs.ts
│   │   └── projects.ts
│   ├── utils/           # Utility functions
│   │   ├── cloudinary.ts # Cloudinary configuration
│   │   └── helpers.ts   # Common helpers
│   └── types/           # TypeScript type definitions
├── prisma/              # Database schema and migrations
│   ├── schema.prisma
│   └── migrations/
├── .env                 # Environment variables
├── server.ts           # Main server file
└── package.json        # Dependencies
```

## API Endpoints

### Projects API

#### Get All Projects
```http
GET /api/v1//projects
```

#### Get Single Project
```http
GET /api/projects/:id
```

#### Create Project
```http
POST /api/projects
Content-Type: multipart/form-data
```

#### Update Project
```http
PUT /api/v1/projects/:id
Content-Type: multipart/form-data
```

#### Delete Project
```http
DELETE /api/v1/projects/:id
```

### Blogs API

#### Get All Blogs
```http
GET /api/v1/blogs
```


#### Get Single Blog
```http
GET /api/blogs/:id
```

#### Create Blog
```http
POST /api/blogs
Content-Type: multipart/form-data
```

#### Update Blog
```http
PUT /api/blogs/:id
```

#### Delete Blog
```http
DELETE /api/blogs/:id
```


## Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run lint` - Run ESLint
- `npm test` - Run tests (if configured)




## Security Features

- **Input Validation** - All inputs validated and sanitized
- **File Upload Security** - File type and size restrictions
- **CORS Configuration** - Controlled cross-origin access
- **Error Handling** - Secure error messages without sensitive data

## Deployment

### Render (Current Deployment)


3. **Environment Variables**
   Set in Vercel dashboard:
   - `DATABASE_URL`
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`


## Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment | `development` |
| `DATABASE_URL` | PostgreSQL connection string | Required |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | Required |
| `CLOUDINARY_API_KEY` | Cloudinary API key | Required |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | Required |

### File Upload Configuration

- **Max File Size:** 10MB
- **Allowed Types:** JPG, JPEG, PNG, GIF, WebP
- **Storage:** Cloudinary cloud storage
- **Auto-optimization:** Automatic image compression and format conversion

## Additional Notes

### Performance Considerations
- **File Caching** - Static files served with appropriate headers
- **Compression** - Response compression for better performance
- **Error Logging** - Comprehensive logging for debugging

### Development Tips
- Use Postman or similar tools for API testing
- Check server logs for debugging information
- Validate JSON data structure before deployment
- Test file uploads with different file types and sizes



---

