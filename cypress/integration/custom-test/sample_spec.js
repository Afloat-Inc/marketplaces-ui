describe('My First Test', function () {
  it('Does not do much', function () {
    cy.visit('/')
    cy.get('[data-cy=menuLayoutBtn]').click()
    cy.contains('Docs').click()
  })
})