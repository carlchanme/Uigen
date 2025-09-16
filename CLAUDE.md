# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

UIGen is an AI-powered React component generator with live preview capabilities. Users can describe components in natural language and get generated code with real-time preview. The application supports both authenticated users (with project persistence) and anonymous users.

## Development Commands

```bash
# Setup (install deps, generate Prisma client, run migrations)
npm run setup

# Development server with Turbopack
npm run dev

# Build production version
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Run tests using Vitest
npm run test

# Reset database (force migrate reset)
npm run db:reset
```

## Architecture

### Core Technologies
- **Next.js 15** with App Router and React 19
- **TypeScript** for type safety
- **Tailwind CSS v4** for styling
- **Prisma** with SQLite for data persistence
- **Anthropic Claude AI** via Vercel AI SDK for component generation
- **Vitest** for testing

### Key Architecture Patterns

**Virtual File System**: The app uses a custom `VirtualFileSystem` class (`src/lib/file-system`) that maintains component files in memory rather than writing to disk. This allows real-time preview and editing without file I/O overhead.

**AI Tool Integration**: Components are generated through a structured AI conversation using custom tools:
- `str_replace_editor`: For editing file contents
- `file_manager`: For creating/managing files in the virtual filesystem

**Authentication**: Session-based authentication with bcrypt password hashing. Anonymous users can use the app without persistence.

**Database Schema**:
- `User`: Basic user management with email/password
- `Project`: Stores chat messages and virtual filesystem state as JSON

### Directory Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── api/chat/       # AI chat API endpoint
│   ├── [projectId]/    # Dynamic project pages
│   └── layout.tsx      # Root layout
├── components/
│   ├── ui/             # Reusable UI components (shadcn/ui based)
│   ├── chat/           # Chat interface components
│   └── auth/           # Authentication components
├── lib/
│   ├── tools/          # AI tools for file manipulation
│   ├── prompts/        # AI system prompts
│   └── file-system.ts  # Virtual filesystem implementation
└── generated/prisma/   # Generated Prisma client
```

### Environment Setup

The app gracefully handles missing Anthropic API keys by using mock responses instead of actual AI generation. Set `ANTHROPIC_API_KEY` in `.env` for full functionality.

### Database Management

Uses Prisma with SQLite. The generated client is output to `src/generated/prisma/` (not the default location). Always run `npx prisma generate` after schema changes.
- Add comments sparingly. Only add comment on complex functions or code.
- The database schema is defined in the @prisma/schema.prisma file. Reference it anytime you need to understand the structure of data stored in the database.