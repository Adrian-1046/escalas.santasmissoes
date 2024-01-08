function arquivo(filePath) {
  fetch(filePath)
    .then(response => {
      if (!response.ok) {
        throw new Error(
          `Erro ao buscar o arquivo: ${response.status} ${response.statusText}`
        )
      }

      return response.text()
    })
    .then(htmlContent => {
      document.getElementById('conteudo').innerHTML = htmlContent
    })
    .catch(error => {
      console.error('Erro:', error)
    })
}

function addEventListeners() {
  const dataLinks = document.querySelectorAll('.tabela-datas a')

  dataLinks.forEach(link => {
    link.addEventListener('click', function (event) {
      event.preventDefault()

      dataLinks.forEach(item => item.classList.remove('active'))

      this.classList.add('active')
    })
  })
}

function tabela(filePath, tela, dia) {
  addEventListeners()

  fetch(filePath)
    .then(response => {
      if (!response.ok) {
        throw new Error(
          `Erro ao buscar o arquivo: ${response.status} ${response.statusText}`
        )
      }

      return response.text()
    })
    .then(htmlContent => {
      document.getElementById('tabela').innerHTML = htmlContent
      waring()
    })
    .catch(error => {
      console.error('Erro:', error)
    })
}

function mostrarTabela(tab, tela) {
  const data = document.getElementById(tab)
  let outros = ['S1', 'S2', 'S3', 'S4', 'S5']

  outros.forEach(item => {
    const elemento = document.getElementById(item)
    elemento.classList.remove('active')
  })

  data.classList.add('active')

  let tabelaPathLink
  switch (tab) {
    case 'S1':
      tabelaPathLink = './../SUBPAGINAS/escalas/Tabela/S1.html'
      break
    case 'S2':
      tabelaPathLink = './../SUBPAGINAS/escalas/Tabela/S2.html'
      break
    case 'S3':
      tabelaPathLink = './../SUBPAGINAS/escalas/Tabela/S3.html'
      break
    case 'S4':
      tabelaPathLink = './../SUBPAGINAS/escalas/Tabela/S4.html'
      break
    case 'S5':
      tabelaPathLink = './../SUBPAGINAS/escalas/Tabela/S5.html'
      break
  }

  tabela(tabelaPathLink, tela, tab)
}

function mostrarLoading() {
  document.getElementById('loading-overlay').style.display = 'block'
}

function ocultarLoading() {
  document.getElementById('loading-overlay').style.display = 'none'
}

function waring() {
  document.querySelector('h3').style.visibility = 'visible'
}

function warningOff() {
  document.querySelector('h3').style.visibility = 'hidden'
}

function telaSugestao() {
  const filePath = './../../SUGESTAO.html'
  arquivo(filePath)
  warningOff()
}

function escalaDomingoManha(data) {
  const tela = 'DomingoManha'
  const filePath = `./../SUBPAGINAS/escalas/escala${tela}.html`
  arquivo(filePath)

  const tabelaPath = './../SUBPAGINAS/escalas/Tabela/S1.html'
  tabela(tabelaPath, tela, data)

  buscarDadosDoServidorEscalas(tela, data)
  waring()
}

function escalaDomingoNoite(data) {
  const tela = 'DomingoNoite'
  const filePath = `./../SUBPAGINAS/escalas/escala${tela}.html`
  arquivo(filePath)

  const tabelaPath = './../SUBPAGINAS/escalas/Tabela/S1.html'
  tabela(tabelaPath, tela, data)

  buscarDadosDoServidorEscalas(tela, data)
  waring()
}

function escalaTercaFeira(data) {
  const tela = 'Terca'
  const filePath = `./../SUBPAGINAS/escalas/escala${tela}Feira.html`
  arquivo(filePath)

  const tabelaPath = './../SUBPAGINAS/escalas/Tabela/S1.html'
  tabela(tabelaPath, tela, data)

  buscarDadosDoServidorEscalas(tela, data)
  waring()
}

function escalaQuartaFeira(data) {
  const tela = 'Quarta'
  const filePath = `./../SUBPAGINAS/escalas/escala${tela}Feira.html`
  arquivo(filePath)

  const tabelaPath = './../SUBPAGINAS/escalas/Tabela/S1.html'
  tabela(tabelaPath, tela, data)

  buscarDadosDoServidorEscalas(tela, data)
  waring()
}
/* ======== MUSICAS ============ */

function musicaDomingoManha(data) {
  const tela = 'DomingoManha'
  const filePath = `./../SUBPAGINAS/musicas/musica${tela}.html`
  arquivo(filePath)

  const tabelaPath = './../SUBPAGINAS/musicas/Tabela/S1.html'
  tabela(tabelaPath, tela, data)

  buscarDadosDoServidorMusicas(tela, data)
  waring()
}

function musicaDomingoNoite(data) {
  const tela = 'DomingoNoite'
  const filePath = `./../SUBPAGINAS/musicas/musica${tela}.html`
  arquivo(filePath)

  const tabelaPath = './../SUBPAGINAS/musicas/Tabela/S1.html'
  tabela(tabelaPath, tela, data)

  buscarDadosDoServidorMusicas(tela, data)
  waring()
}

function musicaTercaFeira(data) {
  const tela = 'Terca'
  const filePath = `./../SUBPAGINAS/musicas/musicaTercaFeira.html`
  arquivo(filePath)

  const tabelaPath = './../SUBPAGINAS/musicas/Tabela/S1.html'
  tabela(tabelaPath, tela, data)

  buscarDadosDoServidorMusicas(tela, data)
  waring()
}

function musicaQuartaFeira(data) {
  const tela = 'Quarta'
  const filePath = `./../SUBPAGINAS/musicas/musicaQuartaFeira.html`
  arquivo(filePath)

  const tabelaPath = './../SUBPAGINAS/musicas/Tabela/S1.html'
  tabela(tabelaPath, tela, data)

  buscarDadosDoServidorMusicas(tela, data)
  waring()
}

/* ========== PREGADORES =========*/
function pregadorDomingoManha() {
  const filePath = './../SUBPAGINAS/pregadores/pregadorDomingoManha.html'
  arquivo(filePath)
  buscarDadosDoServidorPregadores('DomingoManha')
  document.addEventListener('DOMContentLoaded', function () {
    buscarDadosDoServidorPregadores('DomingoManha')
  })
  waring()
}

function pregadorDomingoNoite() {
  const filePath = './../SUBPAGINAS/pregadores/pregadorDomingoNoite.html'
  arquivo(filePath)
  buscarDadosDoServidorPregadores('DomingoNoite')
  document.addEventListener('DOMContentLoaded', function () {
    buscarDadosDoServidorPregadores('DomingoNoite')
  })
  waring()
}

function pregadorTercaFeira() {
  const filePath = './../SUBPAGINAS/pregadores/pregadorTercaFeira.html'
  arquivo(filePath)
  buscarDadosDoServidorPregadores('Terca')
  document.addEventListener('DOMContentLoaded', function () {
    buscarDadosDoServidorPregadores('Terca')
  })
  waring()
}

function pregadorQuartaFeira() {
  const filePath = './../SUBPAGINAS/pregadores/pregadorQuartaFeira.html'
  arquivo(filePath)
  buscarDadosDoServidorPregadores('Quarta')
  document.addEventListener('DOMContentLoaded', function () {
    buscarDadosDoServidorPregadores('Quarta')
  })
  waring()
}

/* ========== RECEPCIONISTAS =========*/

function recepcionistaDomingoManha() {
  const filePath =
    './../SUBPAGINAS/recepcionistas/recepcionistaDomingoManha.html'
  arquivo(filePath)
  buscarDadosDoServidorRecepcionistas('DomingoManha')
  document.addEventListener('DOMContentLoaded', function () {
    buscarDadosDoServidorRecepcionistas('DomingoManha')
  })
  waring()
}

function recepcionistaDomingoNoite() {
  const filePath =
    './../SUBPAGINAS/recepcionistas/recepcionistaDomingoNoite.html'
  arquivo(filePath)
  buscarDadosDoServidorRecepcionistas('DomingoNoite')
  document.addEventListener('DOMContentLoaded', function () {
    buscarDadosDoServidorRecepcionistas('DomingoNoite')
  })
  waring()
}

function recepcionistaTercaFeira() {
  const filePath = './../SUBPAGINAS/recepcionistas/recepcionistaTercaFeira.html'
  arquivo(filePath)
  buscarDadosDoServidorRecepcionistas('Terca')
  document.addEventListener('DOMContentLoaded', function () {
    buscarDadosDoServidorRecepcionistas('Terca')
  })
  waring()
}

function recepcionistaQuartaFeira() {
  const filePath =
    './../SUBPAGINAS/recepcionistas/recepcionistaQuartaFeira.html'
  arquivo(filePath)
  buscarDadosDoServidorRecepcionistas('Quarta')
  document.addEventListener('DOMContentLoaded', function () {
    buscarDadosDoServidorRecepcionistas('Quarta')
  })
  waring()
}
