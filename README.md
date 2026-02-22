# Cypress Web Automation Framework

[Cypress.io](https://www.cypress.io/)

<img src = "https://user-images.githubusercontent.com/48508827/118402173-69b0cf00-b686-11eb-8896-5cf1e9ce850a.png" height = "300">

**🏢 Enterprise-Grade Automation Testing Framework**

Cypress is a next generation front end testing tool built for the modern web. This is an **enterprise-grade implementation** with CI/CD integration, test data management, and code quality standards.

## ✨ Features

✅ **Cypress Fixtures** - Centralized test data management  
✅ **GitHub Actions CI/CD** - Automated multi-browser testing pipeline  
✅ **Custom Commands** - Reusable test utilities and helpers  
✅ **Code Quality** - ESLint, Prettier, EditorConfig integration  
✅ **Test Reports** - Mochawesome with HTML report generation  
✅ **Cross-browser Testing** - Chrome, Firefox, Edge support  
✅ **Security Scanning** - npm audit in CI pipeline  
✅ **Page Object Model** - Maintainable test structure  
✅ **Scheduled Testing** - Daily automated test runs  
✅ **PR Integration** - Automatic test results on pull requests  

## 📋 Quick Navigation

- [Quick Start](#-quick-start)
- [Installation](#installation)
- [Project Structure](#-project-structure)
- [Test Data & Fixtures](#-test-data--fixtures)
- [Custom Commands](#-custom-commands--utilities)
- [Running Tests](#▶️-running-tests)
- [CI/CD Pipeline](#-cicd-pipeline)
- [Code Quality](#-code-quality)
- [Test Reports](#-test-reports)
- [Configuration Guide](#️-configuration-guide)
- [Troubleshooting](#-troubleshooting)

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) >= 14.x
- [Visual Studio Code](https://code.visualstudio.com/download) or any code editor
- Git

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd Cypress_WebAutomation_Framework

# Install dependencies
npm install

# Run tests
npm test
```

## 📁 Project Structure

```
cypress/
├── e2e/                       # End-to-end tests
│   ├── todomvc-actions.spec.js
│   ├── todomvc-filtering.spec.js
│   └── todomvc-visual.spec.js
├── pageobjects/               # Page Object Models
│   └── todo-page.js
├── fixtures/                  # Test data (Centralized)
│   ├── todos.json
│   └── testdata.json
├── support/                   # Support & utilities
│   ├── e2e.js                # Global setup & hooks
│   ├── commands.js           # Custom Cypress commands
│   └── utils.js              # Utility functions
├── results/                   # Test reports (generated)
├── screenshots/               # Visual test baselines & outputs (auto-generated)
└── config/                    # Configuration files

.github/workflows/             # GitHub Actions
├── cypress-tests.yml         # Main CI/CD pipeline
└── pull-request-checks.yml   # PR validation

.editorconfig                  # Editor consistency
.eslintrc.json                # Linting rules
.prettierrc                    # Code formatting
cypress.config.js              # Cypress configuration
package.json                   # Dependencies & scripts
ENTERPRISE_CONFIG.md           # Detailed enterprise guide
```

## 🔧 Test Data & Fixtures

### Centralized Fixtures

Test data is managed in `cypress/fixtures/` for reusability and maintainability:

```javascript
// Load fixture in before hook
before(() => {
  cy.fixture('todos.json').then((data) => {
    testData = data
  })
})

// Use in tests
it('Should add todo from fixture', () => {
  const todoText = testData.todos[0].text
  todoPage.addTodo(todoText)
  todoPage.validateTodoText(0, todoText)
})
```

### Available Fixtures

| File | Purpose |
|------|---------|
| `todos.json` | Sample todo items with properties (id, text, completed, priority) |
| `testdata.json` | Test scenarios, expectations, and user roles |

## ⚡ Custom Commands & Utilities

### Custom Commands

```javascript
// Add multiple todos at once
cy.addMultipleTodos(['todo1', 'todo2', 'todo3'])

// Toggle multiple todos
cy.toggleMultipleTodos([0, 1, 2])

// Verify todo count
cy.verifyTodoCount(3)

// Verify specific todo text
cy.verifyTodoTextAt(0, 'Expected Text')

// Get all todo texts
cy.getAllTodoTexts().then(texts => {
  expect(texts).to.include('my todo')
})

// Wait for page load
cy.waitForPageLoad()
```

### Utility Functions

```javascript
import { 
  waitAndVerifyElement, 
  clearAndType, 
  assertElementText,
  logTestStep,
  takeScreenshot 
} from '../support/utils.js'

// Wait and verify element visibility
waitAndVerifyElement('.todo-list', 5000)

// Clear input and type text
clearAndType('.new-todo', 'New todo item')

// Assert element text
assertElementText('.todo', 'Expected Text')

// Log test step
logTestStep('Adding todo', 'With text: Learn Cypress')

// Screenshot with timestamp
takeScreenshot('todos-added')
```

## ▶️ Running Tests

### Basic Commands

```bash
# Run all tests (headless)
npm test

# Run tests with UI
npm run test:headed

# Open Cypress Test Runner
npm run cypress:open
```

### Browser-Specific Testing

```bash
# Chrome
npm run test:chrome

# Firefox
npm run test:firefox

# Edge
npm run test:edge
```

### Specialized Test Runs

```bash
# Debug mode
npm run test:debug

# CI optimized
npm run test:ci

# Smoke tests
npm run test:smoke

# Sanity check (single spec)
npm run test:sanity

# Visual tests (generate/compare snapshots)
npm run test:visual

# Update baseline snapshots (after intentional UI changes)
npm run test:visual:update
```

## 📸 Visual Testing & Snapshots

### How Baseline Images Work

- **Automatic Generation**: Baseline images are created automatically on first run
- **Storage Location**: Baselines stored in `cypress/screenshots/<spec-name>/`
- **Baseline Capture**: `cy.screenshot('name')` captures the baseline image
- **Comparison**: Subsequent runs compare against baseline to detect visual changes

### Managing Baseline Images

```bash
# Generate initial baselines (first run creates all screenshots)
npm run test:visual

# Run all tests including visual
npm test

# View baseline images
open cypress/screenshots/
```

For detailed visual testing guide, see [VISUAL_TESTING_GUIDE.md](VISUAL_TESTING_GUIDE.md)

## 🤖 CI/CD Pipeline

### GitHub Actions Workflows

#### Main CI Pipeline (`cypress-tests.yml`)

**Triggers:**
- Push to main/develop/staging branches
- Pull requests
- Daily schedule (2 AM UTC)

**Features:**
- Multi-browser testing (Chrome, Firefox, Edge)
- Parallel test execution
- Security scanning (npm audit)
- Automatic report generation
- Artifact storage (30-day retention)
- Screenshot capture on failure

**Running:**
```bash
# Manually trigger via GitHub Actions tab
# Or automatically on push/PR to protected branches
```

#### Pull Request Validation (`pull-request-checks.yml`)

**Features:**
- Runs tests on every PR
- Posts results as PR comments
- Test summary with pass/fail counts
- Duration tracking
- Blocks merge until tests pass

### Workflow Matrix

```yaml
Test Matrix:
- Node: 18.x
- Browsers: Chrome, Firefox, Edge
- Total: 3 parallel jobs
```

## 🎨 Code Quality

### ESLint Configuration

```bash
# Run linter
npm run lint

# Fix issues automatically
npm run lint:fix
```

**Rules Enforced:**
- No semicolons (Prettier compatible)
- Single quotes
- 2-space indentation
- No unnecessary waiting in tests
- Cypress best practices

### Prettier Formatting

```bash
# Check formatting
npm run format:check

# Auto-format code
npm run format
```

**Format Rules:**
- 2-space indentation
- Single quotes
- 100 character line width
- Trailing commas (ES5)
- LF line endings

### EditorConfig

Ensures consistency across editors (.editorconfig):
- UTF-8 charset
- LF line endings
- 2-space indentation
- Trim trailing whitespace

### Run All QA Checks

```bash
npm run qa:all
```

This runs: lint + format check + tests

## 📊 Test Reports

### Mochawesome Reporter

Tests automatically generate Mochawesome JSON reports in `cypress/results/`

### Generate HTML Reports

```bash
# Merge all reports
npm run report:merge

# Generate HTML report
npm run report:generate

# View report
open cypress/results/html-report/index.html
```

### Report Features

- Pass/fail statistics
- Test duration tracking
- Screenshot attachments
- Video recording (optional)
- Timestamped reports

### Clean Reports

```bash
npm run report:clean
```

## 🛠️ Configuration

### Cypress Configuration (`cypress.config.js`)

```javascript
{
  baseUrl: 'http://todomvc-app-for-testing.surge.sh/',
  viewportWidth: 1024,
  viewportHeight: 768,
  requestTimeout: 10000,
  responseTimeout: 10000,
  specPattern: 'cypress/e2e/**/*.spec.js'
}
```

### For Detailed Enterprise Configuration

See [ENTERPRISE_CONFIG.md](ENTERPRISE_CONFIG.md) for comprehensive setup guide

## 🏗️ Test Organization

### Test Categories

| Test Suite | Purpose | Coverage |
|-----------|---------|----------|
| `todomvc-actions.spec.js` | CRUD operations | Add, Mark, Clear todos |
| `todomvc-filtering.spec.js` | Filter functionality | Active, Completed, All filters |
| `todomvc-visual.spec.js` | Visual validation | Screenshot baselines |

### Page Object Model

All selectors and interactions abstracted in `cypress/pageobjects/todo-page.js`:

```javascript
// Navigate, add, verify, toggle todos
todoPage.navigate()
todoPage.addTodo('text')
todoPage.validateTodoText(index, text)
todoPage.toggleTodo(index)
```

## 🔄 Continuous Integration

### Supported Environments

- ✅ GitHub Actions (Primary)
- ✅ Local development
- ✅ GitHub Codespaces
- ✅ Docker containers

### Environment Variables

```bash
# Set for CI runs
CI=true
```

### Scheduled Runs

Tests run automatically:
- ⏰ On push to main/develop/staging
- ⏰ On pull requests
- ⏰ Daily at 2 AM UTC

## 📝 Best Practices

  - ✅ Use fixtures for test data
  - ✅ Leverage custom commands
  - ✅ Follow Page Object Model
  - ✅ Keep tests independent
  - ✅ Use data-testid attributes
  - ✅ Log test steps
  - ✅ Take screenshots strategically
  - ✅ Review test reports regularly
  - ✅ Monitor CI/CD pipeline
  - ✅ Update dependencies regularly

## 🔒 Security

- npm audit in CI pipeline
- Vulnerability scanning
- No credentials in code
- Environment variables for secrets
- Dependency management

## 🐛 Troubleshooting

### Tests Pass Locally but Fail in CI

```bash
# Check Node version matches CI
node --version  # Should be 18.x

# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Run tests with CI flag
CI=true npm test
```

### Fixture Not Loading

```javascript
// Check path is correct
cy.fixture('todos.json')  // ✓ Correct
cy.fixture('/fixtures/todos.json')  // ✗ Wrong

// Verify JSON syntax
npm run lint
```

### GitHub Actions Not Triggering

- Check branch name (main/develop/staging)
- Verify workflow file syntax
- Check `.github/workflows/` directory exists
- Review repository settings for branch protection

### Port Already in Use

Change port in `cypress.config.js` or kill process:

```bash
lsof -i :8080
kill -9 <PID>
```

### Visual Tests Failing - Baseline Comparison Issues

If visual tests fail due to screenshot mismatch:

```bash
# Review the screenshots in cypress/screenshots/
# If UI changes are intentional, baseline images are automatically updated
# If changes are unintentional, check CSS/styling issues

# Run visual tests to capture updated baselines
npm run test:visual
```

## 📚 Resources

- [Cypress Documentation](https://docs.cypress.io/)
- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [Page Object Model](https://applitools.com/blog/page-object-model-cypress/)
- [GitHub Actions](https://docs.github.com/en/actions)
- [Mochawesome Reporter](https://github.com/adamgruber/mochawesome)
- [ESLint Rules](https://eslint.org/docs/rules/)
- [Prettier Options](https://prettier.io/docs/en/options.html)

## 👥 Contributing

1. Create a feature branch
2. Make your changes
3. Run `npm run qa:all` to validate
4. Create a pull request
5. Ensure all CI checks pass

---

**Framework Version**: 2.0.0

**Last Updated**: February 2026  
**Author**: Thangaraj

For detailed enterprise configurations, see [ENTERPRISE_CONFIG.md](ENTERPRISE_CONFIG.md)



