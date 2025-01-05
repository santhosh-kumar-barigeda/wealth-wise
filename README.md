# Next.js Starter Template

Welcome to the **Next.js Starter Template**! This repository is designed to kickstart your Next.js projects with essential tools and modern libraries. It includes a set of pre-configured dependencies to help you build scalable, maintainable, and feature-rich web applications efficiently.

## Features

- **[Next.js](https://nextjs.org/):** A React framework for production-grade web applications.
- **[shadcn](https://shadcn.dev/):** Pre-styled, accessible, and customizable components for rapid UI development.
- **[React Hook Form](https://react-hook-form.com/):** Simple and flexible form handling.
- **[Zod](https://zod.dev/):** Type-safe schema validation and parsing.
- **[Tailwind CSS](https://tailwindcss.com/):** Utility-first CSS framework for custom designs.
- **[Axios](https://axios-http.com/):** Promise-based HTTP client for making API requests.
- **[date-fns](https://date-fns.org/):** Modern JavaScript date utility library.

---

## Getting Started

Follow these steps to get up and running:

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/nextjs-starter.git
cd nextjs-starter
```

### 2. Install Dependencies

Make sure you have [Node.js](https://nodejs.org/) installed. Then, run:

```bash
npm install
# or
yarn install
```

### 3. Run Development Server

Start the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see your application.

---

## Project Structure

Here is an overview of the project structure:

```
├── public          # Static assets (images, icons, etc.)
├── src             # Source code
│   ├── components  # Reusable UI components
│   ├── hooks       # Custom React hooks
│   ├── lib         # Utility functions and configurations
├── .env.local      # Environment variables (example provided)
├── tailwind.config.js # Tailwind CSS configuration
└── next.config.js  # Next.js configuration
```

---

## Scripts

Here are some useful scripts included in the project:

- `dev`: Run the development server.
- `build`: Build the application for production.
- `start`: Start the production server.
- `lint`: Lint the codebase using ESLint.
- `format`: Format code with Prettier.

---

## Configuration

### Environment Variables

Create a `.env.local` file in the root directory for your environment variables. An example file is provided as `.env.local.example`.

### Tailwind CSS

Tailwind CSS is pre-configured in the `tailwind.config.js` file. You can extend or customize it as per your needs.
