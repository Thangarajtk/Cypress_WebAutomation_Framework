# Visual Testing Guide

This guide explains the visual testing capabilities integrated into the Cypress Web Automation Framework.

## Overview

The framework includes **two complementary visual testing tools**:

### 1. **Cypress Screenshots** (Baseline Image Comparison)
- **Purpose**: Pixel-level visual regression testing
- **Best for**: Detecting UI layout changes, color changes, styling issues
- **Storage**: Baseline images stored in `cypress/screenshots/`
- **Method**: `cy.screenshot()` command captures baseline on first run
- **Cost**: Free, self-hosted

### 2. **Applitools Eyes** (AI-Powered Visual Testing - Optional)
- **Purpose**: Intelligent visual validation with AI
- **Best for**: Cross-browser testing, responsive design validation, ignoring dynamic content
- **Storage**: Cloud-based (requires Applitools account)
- **Cost**: Paid tier available, free tier with limits

---

## Quick Start

### Running Visual Tests

```bash
# Run all visual tests
npm run test:visual

# Update baseline images (after reviewing new snapshots)
npm run test:visual:update

# Run specific visual test
npx cypress run --spec "cypress/e2e/todomvc-visual.spec.js"
```

### Generated Artifacts

- **Screenshots**: `cypress/screenshots/` - Baseline images (created on first run)
- **Reports**: Automatically generated on each run
- **Test Results**: Timestamped in `cypress/results/`

---

## Usage Examples

### 1. Basic Snapshot Testing

```javascript
// Take a screenshot and compare to baseline
cy.screenshot('empty-todo-list')

// Full page screenshot
cy.screenshot('full-page', { capture: 'fullPage' })

// Viewport-only screenshot
cy.screenshot('viewport', { capture: 'viewport' })
```

### 2. Element-Level Visual Testing

```javascript
// Screenshot specific element
cy.get('.todo-list').screenshot('todo-list-element')

// Using custom command
cy.get('.todo-item').matchElementSnapshot('todo-item-styling')
```

### 3. Applitools Eyes Testing (Optional)

To enable Applitools Eyes:

1. Create account at https://applitools.com
2. Get your API key from account settings
3. Set environment variable:
   ```bash
   export APPLITOOLS_API_KEY="your-api-key-here"
   ```
4. In `cypress.config.js`, set `applitoolsIsDisabled: false`
5. Use in tests:
   ```javascript
   cy.checkWithEyes('todo-app-state')
   ```

---

## File Structure

```
cypress/
├── e2e/
│   └── todomvc-visual.spec.js          # Visual test suite
├── screenshots/                        # Baseline and test screenshots
│   └── todomvc-visual.spec.js/         # Baseline images (auto-generated on first run)
│       ├── empty-todo-list.png         # Auto-created after first test
│       ├── with-todos-added.png
│       ├── full-page-with-todos.png
│       └── ...
├── results/                            # Test reports
│   └── mochawesome-report-[timestamp].json
└── support/                            # Test utilities
    ├── commands.js
    └── e2e.js
│   └── todomvc-visual.spec.js/         # Test run screenshots
│       └── ...
└── support/
    ├── commands.js                      # Visual testing custom commands
    └── e2e.js                           # Plugin initialization
```

---

## Configuration

### Image Snapshot Settings (cypress.config.js)

```javascript
env: {
  imageSnapshotMaxDiffThreshold: 0.5,        // Allow 0.5% difference
  imageSnapshotResizeDevicePixelRatio: true, // Handle device pixel ratio
  imageSnapshotDisableTimersAndAnimations: true // Stop animations for stability
}
```

### Adjust Sensitivity

- **Strict (0%)**: No pixel differences allowed
- **Relaxed (2-3%)**: Allows minor anti-aliasing differences
- **Loose (5%+)**: Allows significant changes

```javascript
// In test file, override threshold
cy.screenshot('element', { 
  capture: 'viewport',
  // Custom threshold logic handled via cypress.config.js
})
```

---

## Best Practices

### ✅ DO

- ✓ Run visual tests in headless mode for consistency
- ✓ Use fixed viewport sizes for reproducible results
- ✓ Disable animations and transitions in visual tests
- ✓ Review baseline images before committing
- ✓ Update baselines when intentional design changes occur
- ✓ Run tests on the same OS/browser for consistency
- ✓ Use meaningful snapshot names

### ❌ DON'T

- ✗ Don't test dynamic content (timestamps, random data)
- ✗ Don't ignore snapshot differences without review
- ✗ Don't use different resolutions in CI vs local
- ✗ Don't commit baselines without team review
- ✗ Don't update all baselines blindly

---

## Troubleshooting

### Snapshots Mismatched

**Issue**: Test fails because "snapshot doesn't match"
- Review the diff in `cypress/snapshots/` folder
- If changes are intentional, update baseline:
  ```bash
  npm run test:visual:update
  ```

### No Baseline Image Found

**Issue**: First time running visual tests
```bash
# This will create baseline images
npm run test:visual:update
```

### Inconsistent Results Across Machines

**Solution**: 
- Ensure same Cypress version
- Lock viewport size in tests
- Run in headless mode
- Use consistent OS/browser

### Screenshots Too Small

Add to test:
```javascript
cy.viewport(1024, 768) // Set consistent viewport before screenshot
cy.screenshot('name')
```

---

## Advanced Features

### Custom Visual Commands

```javascript
// Create custom snapshots with options
cy.matchSnapshot('element-name', {
  failureThreshold: 0.5,
  failureThresholdType: 'percent'
})

// Full page visual check
cy.matchFullPageSnapshot('full-page-name')

// Element-specific check
cy.get('.selector').matchElementSnapshot('element-name')
```

### CI/CD Integration

```yaml
# GitHub Actions example
- name: Run Visual Tests
  run: npm run test:visual
  
- name: Upload Screenshots
  if: failure()
  uses: actions/upload-artifact@v2
  with:
    name: visual-test-results
    path: cypress/screenshots/
```

---

## Resources

- [cypress-image-snapshot Docs](https://github.com/cypress-io/cypress-image-snapshot)
- [Applitools Eyes Docs](https://applitools.com/docs/topics/general-concepts/overview.html)
- [Cypress Screenshots Guide](https://docs.cypress.io/guides/guides/screenshots-and-videos)

---
# Visual Testing Setup - Implementation Summary

## ✅ What's Been Added

Your Cypress framework now has **professional-grade visual testing** capabilities! Here's what was implemented:

### 1. **cypress-image-snapshot** (Primary Visual Testing)
   - ✓ Pixel-perfect visual regression testing
   - ✓ Automatic baseline image generation and comparison
   - ✓ Local storage (no external dependencies)
   - ✓ Works in CI/CD pipelines

### 2. **Applitools Eyes** (Cloud-Based AI Testing - Optional)
   - ✓ Already installed and configured
   - ✓ AI-powered visual validation (requires API key)
   - ✓ Cross-browser visual testing
   - ✓ Smart element matching (ignores dynamic content)

---

## 📁 New Files Created

| File | Purpose |
|------|---------|
| [VISUAL_TESTING_GUIDE.md](VISUAL_TESTING_GUIDE.md) | Complete visual testing documentation |
| [cypress/e2e/todomvc-visual.spec.js](cypress/e2e/todomvc-visual.spec.js) | Enhanced visual regression test suite |
| [cypress/e2e/visual-testing-examples.spec.js](cypress/e2e/visual-testing-examples.spec.js) | Best practices & examples |

---

## 🚀 Quick Start

### Install Dependencies
```bash
npm install --legacy-peer-deps
```

### Run Visual Tests
```bash
# Run visual tests (creates baseline snapshots on first run)
npm run test:visual

# Update baselines after intentional design changes
npm run test:visual:update

# Run specific visual test file
npx cypress run --spec "cypress/e2e/todomvc-visual.spec.js"
```

### View Results
- **Snapshots**: `cypress/snapshots/` - Baseline images for comparison
- **Screenshots**: `cypress/screenshots/` - Current test run screenshots
- **Diffs**: Generated when snapshots don't match

---

## 🎯 New Custom Commands

All commands available in your test files:

```javascript
// Take viewport screenshot
cy.screenshot('screenshot-name')

// Full page screenshot
cy.screenshot('full-page', { capture: 'fullPage' })

// Pixel-perfect comparison
cy.matchSnapshot('element-name')

// Element-specific visual testing
cy.get('.selector').matchElementSnapshot('name')

// Full page visual testing
cy.matchFullPageSnapshot('full-page-name')

// Applitools Eyes (when enabled)
cy.checkWithEyes('step-name')
```

---

## 📋 Configuration Files Updated

### `cypress.config.js`
- ✓ Added image snapshot plugin configuration
- ✓ Added Applitools Eyes setup
- ✓ Configured visual testing thresholds
- ✓ Set up environment variables for visual testing

### `package.json`
- ✓ Added `cypress-image-snapshot` as dev dependency
- ✓ Added npm scripts for visual testing:
  - `test:visual` - Run visual tests
  - `test:visual:update` - Update baseline snapshots

### `cypress/support/e2e.js`
- ✓ Initialized cypress-image-snapshot plugin
- ✓ Added Applitools Eyes support

### `cypress/support/commands.js`
- ✓ Added visual testing custom commands
- ✓ Created helper functions for visual assertions

### `.gitignore`
- ✓ Added `cypress/snapshots/` to ignore baseline images

---

## 🧪 Example Test Scenarios

Your framework now includes comprehensive examples:

### Available Test Suites
1. **todomvc-visual.spec.js** - main visual regression tests
2. **visual-testing-examples.spec.js** - 10 best practices with examples

### Test Categories
- ✓ Full page snapshots
- ✓ Element-level visual testing
- ✓ Responsive design testing (mobile, tablet, desktop)
- ✓ State comparison (empty list, with items, completed items)
- ✓ Filter state validation

---

## 🔧 First-Time Setup Steps

### Step 1: Generate Baselines
```bash
npm run test:visual:update
```
This creates the baseline images in `cypress/snapshots/`

### Step 2: Verify Snapshots
Review the generated baselines in `cypress/snapshots/todomvc-visual.spec.js/`:
```
empty-todo-list-1.png
with-todos-added-1.png
with-completed-todo-1.png
... and more
```

### Step 3: Commit Baselines
```bash
git add cypress/snapshots/
git commit -m "Add visual test baselines"
```

### Step 4: Run Tests in CI/CD
```bash
npm run test:visual
```

---

## 📊 Visual Testing Workflow

```
Create Test
    ↓
Run: npm run test:visual:update
    ↓
Review Snapshots in cypress/snapshots/
    ↓
Commit Baselines to Git
    ↓
On Future Runs: npm run test:visual
    ↓
Compare Current Screenshots to Baselines
    ↓
Pass: UI matches expected appearance
    ↓
Fail: UI differs from baseline (review diff)
```

---

## 🎨 Customization Options

### Adjust Snapshot Sensitivity

In `cypress.config.js`:
```javascript
env: {
  // Allow 0.5% pixel difference (default)
  imageSnapshotMaxDiffThreshold: 0.5,  // Strict
  // imageSnapshotMaxDiffThreshold: 2.0,  // Relaxed
  // imageSnapshotMaxDiffThreshold: 5.0,  // Loose
}
```

### Different Viewport Sizes

```javascript
describe('Responsive Testing', () => {
  it('should match desktop view', () => {
    cy.viewport(1024, 768)
    cy.visit('http://todomvc-app-for-testing.surge.sh/')
    cy.screenshot('desktop-view')
  })

  it('should match mobile view', () => {
    cy.viewport(375, 667)
    cy.visit('http://todomvc-app-for-testing.surge.sh/')
    cy.screenshot('mobile-view')
  })
})
```

---

## 🔐 Enable Applitools Eyes (Optional)

### Get API Key
1. Sign up at https://applitools.com
2. Get your API key from account settings

### Enable in Tests
```bash
# Set environment variable
export APPLITOOLS_API_KEY="your-api-key-here"

# In cypress.config.js, change:
applitoolsIsDisabled: false  // Enable Eyes
```

### Use in Tests
```javascript
describe('Applitools Visual Testing', () => {
  it('should validate with Eyes', () => {
    cy.eyesOpen({
      appName: 'TodoApp',
      testName: 'Visual check'
    })
    
    cy.visit('http://todomvc-app-for-testing.surge.sh/')
    cy.checkWithEyes('initial-state')
    
    // ... test actions ...
    
    cy.eyesClose()
  })
})
```

---

## 📈 CI/CD Integration Example

### GitHub Actions
```yaml
- name: Run Visual Tests
  run: npm run test:visual
  
- name: Upload Visual Artifacts
  if: always()
  uses: actions/upload-artifact@v2
  with:
    name: visual-test-results
    path: |
      cypress/screenshots/
      cypress/snapshots/

- name: Comment on PR
  if: failure()
  uses: actions/github-script@v6
  with:
    script: |
      github.rest.issues.createComment({
        issue_number: context.issue.number,
        owner: context.repo.owner,
        repo: context.repo.repo,
        body: '❌ Visual tests failed. Check artifacts for diff images.'
      })
```

---

## ⚠️ Common Issues & Solutions

### Issue: "No baseline found"
**Solution**: Run `npm run test:visual:update` to create baselines

### Issue: Snapshots differ locally vs CI
**Solution**: Ensure same:
- Cypress version
- Node.js version
- Operating system
- Browser version

### Issue: Animations causing snapshot failures
**Solution**: Tests wait for animations to complete, but you can disable them:
```javascript
beforeEach(() => {
  cy.visit('http://todomvc-app-for-testing.surge.sh/')
  // Animations are disabled via imageSnapshotDisableTimersAndAnimations config
})
```

### Issue: Applitools Eyes not working
**Solution**: Verify:
1. `APPLITOOLS_API_KEY` environment variable is set
2. `applitoolsIsDisabled: false` in cypress.config.js
3. Run: `export APPLITOOLS_API_KEY="your-key"` before tests

---

## 📚 Next Steps

1. ✅ **Run tests**: `npm run test:visual`
2. ✅ **Review baselines**: Check `cypress/snapshots/`
3. ✅ **Add to CI/CD**: Integrate into your pipeline
4. ✅ **Create project baselines**: Commit snapshots
5. ✅ **Start writing tests**: Use examples as template

---

## 📖 Additional Resources

- [Visual Testing Guide](VISUAL_TESTING_GUIDE.md) - Comprehensive documentation
- [Best Practices Examples](cypress/e2e/visual-testing-examples.spec.js) - Real-world examples
- [cypress-image-snapshot Docs](https://github.com/cypress-io/cypress-image-snapshot)
- [Applitools Eyes Docs](https://applitools.com/docs/)
- [Cypress Screenshots Guide](https://docs.cypress.io/guides/guides/screenshots-and-videos)

---

## 🎓 Key Takeaways

✅ **Pixel-perfect testing** with cypress-image-snapshot  
✅ **AI-powered validation** with Applitools Eyes (optional)  
✅ **Zero external dependencies** (image snapshots are local)  
✅ **CI/CD ready** - works in headless mode  
✅ **Industry standard** - used by thousands of teams  
✅ **Easy to maintain** - baselines are just images  
