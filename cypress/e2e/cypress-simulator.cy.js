describe("Cypress Simulator", () => {
  beforeEach(()=>{
  cy.login()
  cy.visit("./src/index.html?skipCaptcha=true", {
  onBeforeLoad(win) {
    win.localStorage.setItem("cookieConsent", "accepted")
  }
})

  //cy.contains("button", "Login").click()
  
})

  it("Sucesso, simular o comando Cy.log", () => {
    

   cy.run("cy.log('Olá')")//função customizada na aba comando customizados

    cy.get('#outputArea', { timeout: 6000 })
      .should("contain", "Success:")
      .and("be.visible")
   
  })

  it.only("Apresentar Erro ao digitar um comando cypress inválido(e.g., cy.run()).", () => {
   
    //cy.get("textarea[placeholder='Write your Cypress code here...']")
      //.type("cy.run('Teste')")
    //cy.contains("button", "Run").click()

    //cy.run("cy.run('Teste')")

    cy.get('#outputArea', { timeout: 6000 })
    .should("contain", "Invalid Cypress command: cy.run('Teste')")
      .and("be.visible")
    
  })

  it("Exibir aviso ao inserir e executar um comando Cypress não implementado (cy.contains('Login') não implementado", () => {
   
    //cy.get("textarea[placeholder='Write your Cypress code here...']")
     // .type("cy.contains('Login')")
    //cy.contains("button", "Run").click()

    cy.run("cy.contains('Login')")

    cy.get('#outputArea', { timeout: 6000 })
    .should("contain", "The `cy.contains` command has not been implemented yet.")
      .and("be.visible")
  })

  it("Exibir erro ao inserir e executar um comando Cypress válido sem parênteses (cy.visit) ", () => {
    cy.get("textarea[placeholder='Write your Cypress code here...']")
      .type("cy.visit")
    cy.get('#runButton').click()

    cy.get('#outputArea', { timeout: 6000 })
    .should("contain", "Missing parentheses on `cy.visit` command")
      .and("be.visible")
  })

  it("Solicitar ajuda para obter comandos e exemplos comuns do Cypress com um link para a documentação", () => {
    cy.get("textarea[placeholder='Write your Cypress code here...']")
      .type("help")
    cy.get('#runButton').click()

    cy.get('#outputArea', { timeout: 6000 })
      .should("contain", "Common Cypress commands and examples:")
      .and("contain", "For more commands and details, visit the official Cypress API documentation.")
      .and("be.visible")

      cy.contains("#outputArea a", "official Cypress API documentation")
      .should("have.attr", "href", "https://docs.cypress.io/api/table-of-contents")// verificar a existência do link
      .and("have.attr", "target", "_blank")
      .and("have.attr", "rel", "noopener noreferrer")
      .and("be.visible")
  })

  it("Maximixar/Minimizar o resultado de uma simulação", () => {

    //cy.get("textarea[placeholder='Write your Cypress code here...']")
      //.type("cy.log('Olá')")
   // cy.contains("button", "Run").click()

    cy.run("cy.log('Olá')")

    cy.get('.expand-collapse').click()

    cy.get('#outputArea', { timeout: 6000 })
      .should("contain", "Success:")
      .and("be.visible")
    cy.get("#collapseIcon").should("be.visible") 

    cy.get("#collapseIcon").click() 

    cy.get('.expand-collapse').should("be.visible")

  })

  it("Exibir e esconder o botão logout", () => {
    cy.get('#sandwich-menu').click()

    cy.get("#logoutButton")
      .should("be.visible")

    cy.get("#logoutButton").click()

    cy.get("#logoutButton").should("not.be.visible")
  })

  it("Exibir estado em execução do botão durante o processamento antes do resultado final", () => {

    //cy.get("textarea[placeholder='Write your Cypress code here...']")
      //.type("cy.log('Olá')")
    //cy.contains("button", "Run").click()

    cy.run("cy.log('Olá')")

    cy.contains("button", "Running...").should("be.visible")
    cy.contains("button", "Running...").should("be.disabled")
    cy.get('#outputArea')
      .should("contain", "Running... Please wait.")
      .and("be.visible")

    
  })


   it("Estados habilitado/desabilitado do botão run", () => {

    cy.contains("button", "Run").should("be.disabled")

    cy.get("textarea[placeholder='Write your Cypress code here...']")
      .type("cy.log('aprendendo Cypress')")

    cy.contains("button", "Run").should("be.enabled")

    cy.get("textarea[placeholder='Write your Cypress code here...']")
      .clear()

      cy.contains("button", "Run").should("be.disabled")
    
  })

   it("Resetar área de texto quando realizar logout e login", () => {

    cy.get("textarea[placeholder='Write your Cypress code here...']")
      .type("cy.log('aprendendo Cypress')")
    

    cy.get('#sandwich-menu').click()
    cy.get("#logoutButton").click()
    cy.contains("button", "Login").click()
    cy.contains("button", "Run").should("be.disabled")
    
    cy.get("#outputArea")
    .should("have.value", "")
  })

   it("Resetar output após logout e login", () => {

    
    //cy.get("textarea[placeholder='Write your Cypress code here...']")
    //  .type("cy.log('aprendendo Cypress')")

   // cy.contains("button", "Run").click()

   cy.run("cy.log('aprendendo Cypress')")

    cy.get('#outputArea', { timeout: 6000 })
    .should("contain", "cy.log('aprendendo Cypress')")
    

    cy.get('#sandwich-menu').click()
    cy.get("#logoutButton").click()
    cy.contains("button", "Login").click()
   
    
    cy.get("#outputArea").should("have.value", "")

     
  })

   it("Não apresentação do banner de cookies na página de login", () => {

    cy.clearAllLocalStorage()//Limpa o local store
    cy.reload()// Realiza a atualização da página

    cy.contains("button", "Login").should("be.visible")
    cy.get("#cookieConsent").should("not.be.visible")
    
  })
})


describe("Cypress Simulator com os cookies", () => {
  beforeEach(()=>{
  cy.login()
  cy.visit("./src/index.html?skipCaptcha=true")
  //cy.contains("button", "Login").click()
})
it("Aceita cookies", () => {
    
  cy.get("#cookieConsent")
    .as("cookiesConcenteBanner")// dando apelido para o seletor, para chamar este apelido posteriormente basta incluir o @antes do apelido
  cy.get("#acceptCookies").click()
    
  cy.get("@cookiesConcenteBanner").should("not.be.visible")
  cy.window()
    .its("localStorage.cookieConsent")
    .should("be.equal", "accepted")
  })

  it("Rejeita cookies", () => {
    cy.get("#cookieConsent")
    .as("cookiesConcenteBanner")// dando apelido para o seletor, para chamar este apelido posteriormente basta incluir o @antes do apelido
  cy.get("#declineCookies").click()
    
  cy.get("@cookiesConcenteBanner").should("not.be.visible")
  cy.window()//função widow é usada para acessar a janela do navegador, e com isso podemos verificar se de fato a situação está sendo setada corretamento no armazenamento local
    .its("localStorage.cookieConsent")
    .should("be.equal", "declined")
    
  })
})

describe("Cypress Simulator com os captha", () => {
  beforeEach(()=>{
  cy.visit("./src/index.html")
  cy.contains("button", "Login").click()
})

 it("Estado do botão captcha", () => {
    cy.get('#verifyCaptcha').should("be.disabled")

    cy.get("#captchaInput").type("2")

    cy.get('#verifyCaptcha').should("be.enabled")

    cy.get("#captchaInput").clear()

    cy.get('#verifyCaptcha').should("be.disabled")
  })

  it("Erro do captcha", () => {

    cy.get("#captchaInput").type("100")
    cy.get('#verifyCaptcha').click()

    cy.get("#captchaError")
      .should("contain", "Incorrect answer, please try again.")
      .should("be.visible")

      cy.get("#captchaInput")
        .should("be.value", "")

      cy.get('#verifyCaptcha').should("be.disabled")
        
    
  })
  })