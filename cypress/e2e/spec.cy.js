// examples of basic e2e tests
describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })
});

// passing test example
describe('My First Test', () => {
  it('Does not do much!', () => {
    expect(true).to.equal(true)
  })
})

// failing test example
describe('My First Test', () => {
  it('Does not do much!', () => {
    expect(true).to.equal(false)
  })
})
