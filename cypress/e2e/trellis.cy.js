// visit home page
describe('Visit Home Page', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173/')
  })
})

// visit login page 
describe('Visit Login Page', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173/login')
  })
})

// visit search page
describe('Visit Search Page', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173/search')
  })
})

// visit integration page
describe('Visit Integrations Page', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173/integrations')
  })
})

// visit template browser page
describe('Visit Template Browser Page', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173/template')
  })
})

// visit template editor page
describe('Visit Template Editor Page', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173/template/new')
  })
})