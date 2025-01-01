# Budget Calculator

A simple, interactive budget calculator that helps you manage your income and expenses while providing smart financial insights.

## Features

- Add and remove income sources
- Track expenses with pre-populated common categories
- Real-time calculations and summaries
- Smart financial insights based on common financial ratios
- Responsive design for mobile devices

## Deployment to GitHub Pages

1. Create a new repository on GitHub
2. Initialize git in the budget-web directory:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

3. Connect to your GitHub repository:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```

4. Go to your repository settings on GitHub:
   - Navigate to "Settings" > "Pages"
   - Under "Source", select "gh-pages" branch
   - Click "Save"

5. The GitHub Action will automatically deploy your site to:
   `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME`

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Run tests:
   ```bash
   npm test
   ```

## Testing

The application includes Cypress tests that verify:
- Default expenses loading
- Adding/removing income and expenses
- Calculations accuracy
- Input validation
- Financial insights updates
- Mortgage-specific calculations

To run the tests:
```bash
npm test
```

## License

MIT
