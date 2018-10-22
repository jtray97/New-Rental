describe('All Groups Page', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/#/')
    })

    it('should click Off-roaders', () => {
        cy.get('#Off-roaders').click()
        cy.url().should('contain', 'http://localhost:3000/#/Off-roaders')
    })
    it('should click Rvs', () => {
        cy.get('#camping').click()
        cy.url().should('contain', 'http://localhost:3000/#/camping')
    })
    it('should click Boats', () => {
        cy.get('#watercraft').click()
        cy.url().should('contain', 'http://localhost:3000/#/watercraft')
    })
    it('should click experiences', () => {
        cy.get('#experiences').click()
        cy.url().should('contain', 'http://localhost:3000/#/experiences')
    })
    it('should click party', () => {
        cy.get('#party').click()
        cy.url().should('contain', 'http://localhost:3000/#/party')
    })
    it('should click storage', () => {
        cy.get('#storage-and-transport').click()
        cy.url().should('contain', 'http://localhost:3000/#/storage-and-transport')
    })
    it('should click Other', () => {
        cy.get('#others').click()
        cy.url().should('contain', 'http://localhost:3000/#/other')
    })
    it('should click all', () => {
        cy.get('#all').click()
        // cy.wait(5000)
        cy.url().should('contain', 'http://localhost:3000/#/all')
    })
    it('should go to login page', () => {
        cy.url().should('contain', 'https://tyler-ray.auth0.com/login?state=Pax24anVss3Ad55wiTr00d5EfLBu1xvJ&client=SfZ9kNdDWLLCwJjgP5khAhHjSeliCzSg&protocol=oauth2&scope=openid%20profile%20email&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&response_type=code')
    })
})

describe('Off-roaders Testing', () => {
    beforeEach(() => {
        it('should go back home', () => {
            cy.get('button').first().click()
            cy.url.should('contain', 'http://localhost:3000/#/')
        })
        it('should go to login',()=>{
            cy.get('button').eq(1).click()
            cy.url.should('contain','https://tyler-ray.auth0.com/login?state=Pax24anVss3Ad55wiTr00d5EfLBu1xvJ&client=SfZ9kNdDWLLCwJjgP5khAhHjSeliCzSg&protocol=oauth2&scope=openid%20profile%20email&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&response_type=code')
        })
        it('should filter by Quads',()=>{
            cy.get('select').first().click()
            cy.get()
        })
    })
})