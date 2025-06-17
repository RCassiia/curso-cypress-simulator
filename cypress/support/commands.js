Cypress.Commands.add("login", () => {
  const setup = () => {
    cy.visit("./src/index.html?skipCaptcha=true")
    cy.contains("button", "Login").click()
  }

  const validate = () => {
    cy.visit("./src/index.html")
    cy.contains("button", "Login", { timeout: 1000 })
      .should("not.be.visible")
  }

  const options = {
    cacheAcrossSpecs: true,
    validate
  }

  cy.session(//executando a função .session
    "sessionId",//dando um id para esta função
    setup,//vai criar a função da sessão e executa os passos de visitar a página de login pulando o captcha
    options// objeto de options para criar a sessão em um arquivo e restaurar em outro, també vai validar e recriar a sessão, caso ela seja invalidada 
  )//aqui é aonde de fato as funções estão sendo executadas
})

Cypress.Commands.add('run', cmd => {
  cy.get("textarea[placeholder='Write your Cypress code here...']")
    .type(cmd)
  cy.contains("button", "Run").click()
})

