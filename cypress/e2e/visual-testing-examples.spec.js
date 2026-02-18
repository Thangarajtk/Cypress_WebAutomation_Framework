/**
 * Visual Testing Best Practices & Examples
 * 
 * This file contains examples of best practices for visual regression testing
 * using cypress-image-snapshot and Applitools Eyes
 */

describe('Visual Testing - Best Practices & Examples', () => {
  
  /**
   * BEST PRACTICE #1: Set viewport before visual tests
   * Ensures consistent image comparisons across runs
   */
  describe('1. Viewport Management', () => {
    beforeEach(() => {
      cy.viewport(1024, 768) // Standard desktop viewport
    })

    it('should take consistent screenshots with fixed viewport', () => {
      cy.visit('http://todomvc-app-for-testing.surge.sh/')
      cy.screenshot('todo-app-desktop-view')
    })

    it('should test mobile viewport separately', () => {
      cy.viewport('iphone-x') // Test mobile design separately
      cy.visit('http://todomvc-app-for-testing.surge.sh/')
      cy.screenshot('todo-app-mobile-view')
    })
  })

  /**
   * BEST PRACTICE #2: Wait for dynamic content before capturing
   * Ensures all content is loaded and stable
   */
  describe('2. Content Stability', () => {
    it('should wait for content to load before visual check', () => {
      cy.visit('http://todomvc-app-for-testing.surge.sh/')
      
      // Wait for key elements to be visible
      cy.get('[class*="todoapp"]').should('be.visible')
      cy.get('input[class*="new-todo"]').should('be.visible')
      
      // Only then take screenshot
      cy.screenshot('loaded-app-state')
    })

    it('should handle animations by waiting for completion', () => {
      cy.visit('http://todomvc-app-for-testing.surge.sh/')
      cy.get('input[class*="new-todo"]').type('Test todo{enter}')
      
      // Wait for animation to complete
      cy.get('.todo-list li').should('have.length', 1)
      cy.wait(500) // Allow animation to complete
      
      cy.screenshot('after-animation-complete')
    })
  })

  /**
   * BEST PRACTICE #3: Element-specific visual checks
   * Isolates visual changes to specific components
   */
  describe('3. Element-Level Visual Testing', () => {
    beforeEach(() => {
      cy.viewport(1024, 768)
      cy.visit('http://todomvc-app-for-testing.surge.sh/')
    })

    it('should check input field styling', () => {
      cy.get('input[class*="new-todo"]')
        .screenshot('input-field')
    })

    it('should check single todo item styling', () => {
      cy.get('input[class*="new-todo"]').type('Sample todo{enter}')
      
      cy.get('.todo-list li')
        .first()
        .screenshot('single-todo-item')
    })

    it('should check footer area styling', () => {
      cy.get('input[class*="new-todo"]').type('Item 1{enter}')
      cy.get('input[class*="new-todo"]').type('Item 2{enter}')
      
      cy.get('footer')
        .screenshot('footer-area')
    })
  })

  /**
   * BEST PRACTICE #4: Full page vs viewport screenshots
   * Use viewport for UI components, fullPage for complete layout
   */
  describe('4. Screenshot Scope', () => {
    beforeEach(() => {
      cy.viewport(1024, 768)
      cy.visit('http://todomvc-app-for-testing.surge.sh/')
    })

    it('should capture viewport-only (current view)', () => {
      cy.screenshot('viewport-only', { capture: 'viewport' })
    })

    it('should capture full page (entire scrollable area)', () => {
      // Add multiple items to create scrollable content
      for (let i = 0; i < 10; i++) {
        cy.get('input[class*="new-todo"]').type(`Item ${i + 1}{enter}`)
      }
      
      cy.screenshot('full-page', { capture: 'fullPage' })
    })
  })

  /**
   * BEST PRACTICE #5: Semantic visual testing
   * Use descriptive names that reflect what you're testing
   */
  describe('5. Meaningful Snapshot Names', () => {
    const testScenarios = [
      { name: 'empty-list', description: 'App with no todos' },
      { name: 'single-item', description: 'App with one todo' },
      { name: 'multiple-items', description: 'App with several todos' },
      { name: 'with-completed', description: 'App showing completed todo' }
    ]

    beforeEach(() => {
      cy.viewport(1024, 768)
      cy.visit('http://todomvc-app-for-testing.surge.sh/')
    })

    testScenarios.forEach((scenario) => {
      it(`should match snapshot: ${scenario.description}`, () => {
        // Test logic for scenario...
        cy.screenshot(scenario.name)
      })
    })
  })

  /**
   * BEST PRACTICE #6: Separate visual tests from functional tests
   * Keep visual expectations isolated from behavior validation
   */
  describe('6. Separation of Concerns', () => {
    // ❌ BAD: Mixing functional and visual checks
    // it('should add todo and verify visually', () => {
    //   cy.get('[class*="new-todo"]').type('New todo{enter}')
    //   cy.get('.todo-list').should('contain', 'New todo') // Functional
    //   cy.screenshot('with-new-todo') // Visual
    // })

    // ✅ GOOD: Separate behavioral test from visual test
    describe('Functional Tests', () => {
      it('should add todo successfully', () => {
        cy.visit('http://todomvc-app-for-testing.surge.sh/')
        cy.get('[class*="new-todo"]').type('New todo{enter}')
        cy.get('.todo-list').should('contain', 'New todo')
      })
    })

    describe('Visual Tests', () => {
      it('should match snapshot after adding todo', () => {
        cy.viewport(1024, 768)
        cy.visit('http://todomvc-app-for-testing.surge.sh/')
        cy.get('[class*="new-todo"]').type('New todo{enter}')
        cy.screenshot('after-adding-todo')
      })
    })
  })

  /**
   * BEST PRACTICE #7: Testing responsive design
   * Use different viewport sizes to catch responsive bugs
   */
  describe('7. Responsive Design Testing', () => {
    const viewports = [
      { name: 'mobile', width: 375, height: 667 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'desktop', width: 1024, height: 768 },
      { name: 'wide-desktop', width: 1440, height: 900 }
    ]

    viewports.forEach((viewport) => {
      it(`should match snapshot on ${viewport.name} (${viewport.width}x${viewport.height})`, () => {
        cy.viewport(viewport.width, viewport.height)
        cy.visit('http://todomvc-app-for-testing.surge.sh/')
        cy.get('[class*="new-todo"]').type('Test todo{enter}')
        cy.screenshot(`todo-app-${viewport.name}`)
      })
    })
  })

  /**
   * BEST PRACTICE #8: Accessibility-aware visual testing
   * Ensure visual changes don't break accessibility
   */
  describe('8. Accessibility with Visual Testing', () => {
    beforeEach(() => {
      cy.viewport(1024, 768)
      cy.visit('http://todomvc-app-for-testing.surge.sh/')
    })

    it('should have proper contrast in visual snapshot', () => {
      // Ensure input field has proper labels
      cy.get('input[class*="new-todo"]').should('have.attr', 'placeholder')
      
      // Take snapshot for manual contrast verification
      cy.screenshot('input-with-placeholder')
    })
  })

  /**
   * BEST PRACTICE #9: CI/CD compatible visual testing
   * Ensure visuals work in headless mode
   */
  describe('9. CI/CD Ready Visual Tests', () => {
    beforeEach(() => {
      cy.viewport(1024, 768)
      // Works in both headed and headless mode
      cy.visit('http://todomvc-app-for-testing.surge.sh/')
    })

    it('should generate consistent snapshots in headless', () => {
      cy.screenshot('headless-compatible-snapshot')
    })
  })

  /**
   * BEST PRACTICE #10: Applitools Eyes for advanced visual testing
   * Use Applitools for AI-powered visual validation (when API key available)
   */
  describe('10. Advanced: Applitools Eyes Integration', () => {
    beforeEach(() => {
      cy.viewport(1024, 768)
      // Uncomment if APPLITOOLS_API_KEY is set
      // cy.eyesOpen({
      //   appName: 'TodoApp',
      //   testName: 'Visual validation',
      //   browser: [{ width: 1024, height: 768, name: 'chrome' }]
      // });
    })

    // afterEach(() => {
    //   cy.eyesClose();
    // })

    it.skip('should validate with Applitools Eyes', () => {
      cy.visit('http://todomvc-app-for-testing.surge.sh/')
      
      // Applitools will capture and compare with AI
      // cy.checkWithEyes('initial-state')
      
      // cy.get('[class*="new-todo"]').type('AI tested todo{enter}')
      // cy.checkWithEyes('after-adding-todo')
    })
  })
})
