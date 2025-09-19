# Claude Development Guidelines

## Styling Guidelines

### Color Specification in globals.scss

When specifying colors in globals.scss, follow these guidelines:

1. **Use Tailwind CSS classes** with `@apply` directive for consistency:
   - Prefer: `@apply bg-gray-800 text-gray-100`
   - Avoid: `background-color: #1f1f1f; color: #e5e5e5;`

2. **For custom colors that must use hex values**, use CSS variables:
   - Define in `:root` or `body` selector
   - Use semantic naming (e.g., `--border-primary`, `--text-secondary`)

3. **Dark theme color palette**:
   - Background: `bg-black` (pure black)
   - Input backgrounds: `bg-gray-800`
   - Borders: `border-gray-700` or `border-gray-600`
   - Primary text: `text-gray-100`
   - Secondary text: `text-gray-300` or `text-gray-400`
   - Links: `text-blue-400` with `hover:text-blue-300`
   - Buttons: `bg-blue-600` with `hover:bg-blue-700`

4. **Special elements**:
   - HR elements: `@apply border-gray-700`
   - Checkboxes: `@apply bg-gray-800 border-gray-600`
   - Chart elements: Use Tailwind classes or CSS variables for consistency

5. **When using direct color values** (e.g., for chart libraries):
   - Document why Tailwind classes can't be used
   - Use hex values that match Tailwind's color palette
   - Example: `#374151` for `gray-700`, `#1f2937` for `gray-800`

## Build and Deployment

- Package manager: Bun
- Framework: Next.js 14
- Deployment: Vercel
- Node version: 18+

## Testing

Run the following commands before committing:
```bash
bun run build
bun run lint
```