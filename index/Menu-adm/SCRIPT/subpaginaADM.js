function arquivoADM(filePath) {
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

function mostrarLoadingADM() {
  document.getElementById('loading-overlay').style.display = 'block'
}

function ocultarLoadingADM() {
  document.getElementById('loading-overlay').style.display = 'none'
}

function waringADM() {
  document.querySelector('h3').style.visibility = 'visible'
}

function warningOffADM() {
  document.querySelector('h3').style.visibility = 'hidden'
}

function escalaDomingoManhaADM() {
  const filePath = './../Menu-adm/SUBPAGINAS/escalas/escalaDomingoManha.html'
  arquivoADM(filePath)
  buscarDadosDoServidorEscalasADM('DomingoManha')
  waringADM()
}

function escalaDomingoNoiteADM() {
  const filePath = './../Menu-adm/SUBPAGINAS/escalas/escalaDomingoNoite.html'

  arquivoADM(filePath)
  buscarDadosDoServidorEscalasADM('DomingoNoite')
  waringADM()
}

function escalaTercaFeiraADM() {
  const filePath = './../Menu-adm/SUBPAGINAS/escalas/escalaTercaFeira.html'
  arquivoADM(filePath)
  buscarDadosDoServidorEscalasADM('Terca')
  waring()
}

function escalaQuartaFeiraADM() {
  const filePath = './../Menu-adm/SUBPAGINAS/escalas/escalaQuartaFeira.html'
  arquivoADM(filePath)
  buscarDadosDoServidorEscalasADM('Quarta')
  waringADM()
}
/* ======== MUSICAS ============ */

function musicaDomingoManhaADM() {
  const filePath = './../Menu-adm/SUBPAGINAS/musicas/musicaDomingoManha.html'
  arquivoADM(filePath)
  buscarDadosDoServidorMusicasADM('DomingoManha')
}

function musicaDomingoNoiteADM() {
  const filePath = './../Menu-adm/SUBPAGINAS/musicas/musicaDomingoNoite.html'
  arquivoADM(filePath)
  buscarDadosDoServidorMusicasADM('DomingoNoite')
}

function musicaTercaFeiraADM() {
  const filePath = './../Menu-adm/SUBPAGINAS/musicas/musicaTercaFeira.html'
  arquivoADM(filePath)
  buscarDadosDoServidorMusicasADM('Terca')
}

function musicaQuartaFeiraADM() {
  const filePath = './../Menu-adm/SUBPAGINAS/musicas/musicaQuartaFeira.html'
  arquivoADM(filePath)
  buscarDadosDoServidorMusicasADM('Quarta')
}

/* ========== PREGADORES =========*/
function pregadorDomingoManhaADM() {
  const filePath =
    './../Menu-adm/SUBPAGINAS/pregadores/pregadorDomingoManha.html'
  arquivoADM(filePath)
  buscarDadosDoServidorPregadoresADM('DomingoManha')
  waringADM()
}

function pregadorDomingoNoiteADM() {
  const filePath =
    './../Menu-adm/SUBPAGINAS/pregadores/pregadorDomingoNoite.html'
  arquivoADM(filePath)
  buscarDadosDoServidorPregadoresADM('DomingoNoite')
  document.addEventListener('DOMContentLoaded', function () {
    buscarDadosDoServidorPregadoresADM('DomingoNoite')
  })
  waringADM()
}

function pregadorTercaFeiraADM() {
  const filePath = './../Menu-adm/SUBPAGINAS/pregadores/pregadorTercaFeira.html'
  arquivoADM(filePath)
  buscarDadosDoServidorPregadoresADM('Terca')
  waringADM()
}

function pregadorQuartaFeiraADM() {
  const filePath =
    './../Menu-adm/SUBPAGINAS/pregadores/pregadorQuartaFeira.html'
  arquivoADM(filePath)
  buscarDadosDoServidorPregadoresADM('Quarta')
  waringADM()
}

/* ========== RECEPCIONISTAS =========*/

function recepcionistaDomingoManhaADM() {
  const filePath =
    './../Menu-adm/SUBPAGINAS/recepcionistas/recepcionistaDomingoManha.html'
  arquivoADM(filePath)
  buscarDadosDoServidorRecepcionistasADM('DomingoManha')
  waringADM()
}

function recepcionistaDomingoNoiteADM() {
  const filePath =
    './../Menu-adm/SUBPAGINAS/recepcionistas/recepcionistaDomingoNoite.html'
  arquivoADM(filePath)
  buscarDadosDoServidorRecepcionistasADM('DomingoNoite')
  waringADM()
}

function recepcionistaTercaFeiraADM() {
  const filePath =
    './../Menu-adm/SUBPAGINAS/recepcionistas/recepcionistaTercaFeira.html'
  arquivoADM(filePath)
  buscarDadosDoServidorRecepcionistasADM('Terca')
  waringADM()
}

function recepcionistaQuartaFeiraADM() {
  const filePath =
    './../Menu-adm/SUBPAGINAS/recepcionistas/recepcionistaQuartaFeira.html'
  arquivoADM(filePath)
  buscarDadosDoServidorRecepcionistasADM('Quarta')
  waringADM()
}
