# Foodie Test App

An email template management system built with React and Lexical editor for creating and managing restaurant email communications.

## Overview

This application provides a comprehensive platform for managing email templates specifically designed for restaurant and food service businesses. It features a rich text editor powered by Lexical, allowing users to create, edit, and manage email templates with advanced formatting capabilities.

## Features

- **Email Template Management**: Create, edit, and organize email templates
- **Rich Text Editor**: Powered by Lexical with toolbar functionality and variable insertion
- **Template Variables**: Dynamic content insertion for personalized emails
- **Template Categories**: Pre-built templates for common restaurant communications
- **Responsive Design**: Built with Tailwind CSS and Ant Design components
- **Form Validation**: Robust form handling with React Hook Form and Joi validation

## Tech Stack

- **Frontend Framework**: React 18.3.1
- **Build Tool**: Vite 6.0.5
- **Styling**: Tailwind CSS 4.0.3
- **UI Components**: Ant Design 5.23.3
- **Text Editor**: Lexical 0.23.1
- **Routing**: React Router 7.1.5
- **Form Management**: React Hook Form 7.54.2
- **Validation**: Joi 17.13.3
- **TypeScript**: 5.6.2
- **Package Manager**: Yarn

## Project Structure

```
src/
├── components/
│   └── Form/
│       ├── atomics/
│       │   └── Editor/          # Lexical rich text editor
│       └── controls/            # Form control components
├── data/
│   └── mockEmailTemplates.ts   # Sample email templates
├── layouts/
│   ├── AuthLayout/             # Authentication layout
│   └── MainLayout/             # Main application layout
├── modules/
│   ├── Auth/                   # Authentication module
│   └── EmailTemplates/         # Email template management
│       ├── EditEmailTemplate/
│       ├── ListEmailTemplates/
│       ├── NewEmailTemplate/
│       └── SaveEmailTemplate/
└── types/
    └── emailTemplate.ts        # TypeScript definitions
```

## Getting Started

### Prerequisites

- **Node.js**: 20.11 or higher
- **Yarn**: Package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd uber-eat
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Start development server**
   ```bash
   yarn dev
   ```

The application will be available at `http://localhost:5173` (or the next available port).

### Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn lint` - Run ESLint
- `yarn preview` - Preview production build

## Email Template Features

### Template Types

1. **Dining Experience Follow-Up**: Post-meal feedback and thank you messages
2. **Happy Birthday**: Birthday celebration emails for customers
3. **Custom Templates**: Create your own templates for various occasions

### Editor Capabilities

- Rich text formatting (bold, italic, underline)
- Variable insertion for dynamic content
- Toolbar with common formatting options
- HTML preview and export functionality

## Development

### Code Style

- ESLint configuration for code quality
- Prettier for code formatting
- TypeScript for type safety
- Component-based architecture

### State Management

- React Context API for global state
- Local state management with React hooks
- Template CRUD operations with local storage simulation

## Future Improvements

1. **Enhanced Editor Features**
   - Image insertion and management
   - Table support
   - Advanced text formatting options
   - Email template preview with real data

2. **Backend Integration**
   - API integration for template persistence
   - User authentication and authorization
   - Template sharing and collaboration

3. **Advanced Features**
   - Email scheduling and automation
   - Template analytics and performance tracking
   - Multi-language support
   - Custom variable definitions

4. **UI/UX Enhancements**
   - Dark mode support
   - Mobile responsiveness improvements
   - Drag-and-drop template organization
   - Advanced search and filtering

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is private and intended for test purposes.