# Contributing to VITMAS Website

Thank you for your interest in contributing to the VITMAS website! This document provides guidelines and instructions for contributing.

## Project Structure

- **public/** - Static assets (favicon, icons)
- **src/components/** - Reusable React components (Navbar, Footer, Layout)
- **src/pages/** - Page components (Home, About, Events, Team, Gallery, Contact)
- **src/assets/** - Images, fonts, and other media

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Add Tailwind CSS: `npm install -D tailwindcss postcss autoprefixer`
4. Run the development server: `npm run dev`

## Development Guidelines

### Component Development
- Each page should be in `src/pages/`
- Shared components go in `src/components/`
- Use Tailwind CSS for styling
- Use functional components and React hooks

### Before Committing
- Test your changes locally
- Ensure all components render without errors
- Follow the existing code style
- Update this README if you make significant changes

## Adding New Pages

1. Create a new file in `src/pages/` (e.g., `NewPage.jsx`)
2. Add the route to `App.jsx`
3. Add navigation link in `Navbar.jsx` if needed
4. Use the `Layout` component to maintain consistency

## Styling

- Use Tailwind CSS utility classes
- Avoid inline styles
- Keep custom CSS in `index.css` for global styles only

## Questions?

If you have questions about the project or need clarification, please reach out to the VITMAS BOARD

Happy contributing!
