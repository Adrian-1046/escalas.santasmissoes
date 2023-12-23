function arquivo(filePath) {
  fetch(filePath)
    .then(response => {
      if (!response.ok) {
        throw new Error(
          `Erro ao buscar o arquivo: ${response.status} ${response.statusText}`
        );
      }

      return response.text();
    })
    .then(htmlContent => {
      // Inserir o conteúdo do arquivo no elemento com o ID "conteudo"
      document.getElementById('conteudo').innerHTML = htmlContent;
    })
    .catch(error => {
      console.error('Erro:', error);
      // Lidar com o erro, por exemplo, exibindo uma mensagem de erro para o usuário
    });
}

function mostrarLoading() {
  document.getElementById('loading-overlay').style.display = 'block';
}

function ocultarLoading() {
  document.getElementById('loading-overlay').style.display = 'none';
}

function waring() {
  document.querySelector('h3').style.visibility = 'visible';
}

function warningOff(){
  document.querySelector('h3').style.visibility = 'hidden';
}


function telaSugestao() {
  const filePath = './../../SUGESTAO.html';
  arquivo(filePath);
  warningOff()
}

function escalaDomingoManha() {
  const filePath = './../SUBPAGINAS/escalas/escalaDomingoManha.html';
  arquivo(filePath);
  buscarDadosDoServidorEscalas('DomingoManha');
  document.addEventListener('DOMContentLoaded', function () {
    buscarDadosDoServidorEscalas('DomingoManha');
    
  });
  waring();
}

function escalaDomingoNoite() {
  const filePath = './../SUBPAGINAS/escalas/escalaDomingoNoite.html';

  arquivo(filePath);
  buscarDadosDoServidorEscalas('DomingoNoite');
  document.addEventListener('DOMContentLoaded', function () {
    buscarDadosDoServidorEscalas('DomingoNoite');
  });
  waring();
}

function escalaTercaFeira() {
  const filePath = './../SUBPAGINAS/escalas/escalaTercaFeira.html';
  arquivo(filePath);
  buscarDadosDoServidorEscalas('Terca');
  document.addEventListener('DOMContentLoaded', function () {
    buscarDadosDoServidorEscalas('Terca');
  });
  waring();
}

function escalaQuartaFeira() {
  const filePath = './../SUBPAGINAS/escalas/escalaQuartaFeira.html';
  arquivo(filePath);
  buscarDadosDoServidorEscalas('Quarta');
  document.addEventListener('DOMContentLoaded', function () {
    buscarDadosDoServidorEscalas('Quarta');
  });
  waring();
}
/* ======== MUSICAS ============ */

function musicaDomingoManha() {
  const filePath = './../SUBPAGINAS/musicas/musicaDomingoManha.html';
  arquivo(filePath);
  buscarDadosDoServidorMusicas('DomingoManha');
  document.addEventListener('DOMContentLoaded', function () {
    buscarDadosDoServidorMusicas('DomingoManha');
  });
}

function musicaDomingoNoite() {
  const filePath = './../SUBPAGINAS/musicas/musicaDomingoNoite.html';
  arquivo(filePath);
  buscarDadosDoServidorMusicas('DomingoNoite');
  document.addEventListener('DOMContentLoaded', function () {
    buscarDadosDoServidorMusicas('DomingoNoite');
  });
}

function musicaTercaFeira() {
  const filePath = './../SUBPAGINAS/musicas/musicaTercaFeira.html';
  arquivo(filePath);
  buscarDadosDoServidorMusicas('Terca');
  document.addEventListener('DOMContentLoaded', function () {
    buscarDadosDoServidorMusicas('Terca');
  });
}

function musicaQuartaFeira() {
  const filePath = './../SUBPAGINAS/musicas/musicaQuartaFeira.html';
  arquivo(filePath);
  buscarDadosDoServidorMusicas('Quarta');
  document.addEventListener('DOMContentLoaded', function () {
    buscarDadosDoServidorMusicas('Quarta');
  });
}

/* ========== PREGADORES =========*/
function pregadorDomingoManha() {
  const filePath = './../SUBPAGINAS/pregadores/pregadorDomingoManha.html';
  arquivo(filePath);
  buscarDadosDoServidorPregadores('DomingoManha');
  document.addEventListener('DOMContentLoaded', function () {
    buscarDadosDoServidorPregadores('DomingoManha');
  });
  waring();
}

function pregadorDomingoNoite() {
  const filePath = './../SUBPAGINAS/pregadores/pregadorDomingoNoite.html';
  arquivo(filePath);
  buscarDadosDoServidorPregadores('DomingoNoite');
  document.addEventListener('DOMContentLoaded', function () {
    buscarDadosDoServidorPregadores('DomingoNoite');
  });
  waring();
}

function pregadorTercaFeira() {
  const filePath = './../SUBPAGINAS/pregadores/pregadorTercaFeira.html';
  arquivo(filePath);
  buscarDadosDoServidorPregadores('Terca');
  document.addEventListener('DOMContentLoaded', function () {
    buscarDadosDoServidorPregadores('Terca');
  });
  waring();
}

function pregadorQuartaFeira() {
  const filePath = './../SUBPAGINAS/pregadores/pregadorQuartaFeira.html';
  arquivo(filePath);
  buscarDadosDoServidorPregadores('Quarta');
  document.addEventListener('DOMContentLoaded', function () {
    buscarDadosDoServidorPregadores('Quarta');
  });
  waring();
}

/* ========== RECEPCIONISTAS =========*/

function recepcionistaDomingoManha() {
  const filePath =
    './../SUBPAGINAS/recepcionistas/recepcionistaDomingoManha.html';
  arquivo(filePath);
  buscarDadosDoServidorRecepcionistas('DomingoManha');
  document.addEventListener('DOMContentLoaded', function () {
    buscarDadosDoServidorRecepcionistas('DomingoManha');
  });
  waring();
}

function recepcionistaDomingoNoite() {
  const filePath =
    './../SUBPAGINAS/recepcionistas/recepcionistaDomingoNoite.html';
  arquivo(filePath);
  buscarDadosDoServidorRecepcionistas('DomingoNoite');
  document.addEventListener('DOMContentLoaded', function () {
    buscarDadosDoServidorRecepcionistas('DomingoNoite');
  });
  waring();
}

function recepcionistaTercaFeira() {
  const filePath =
    './../SUBPAGINAS/recepcionistas/recepcionistaTercaFeira.html';
  arquivo(filePath);
  buscarDadosDoServidorRecepcionistas('Terca');
  document.addEventListener('DOMContentLoaded', function () {
    buscarDadosDoServidorRecepcionistas('Terca');
  });
  waring();
}

function recepcionistaQuartaFeira() {
  const filePath =
    './../SUBPAGINAS/recepcionistas/recepcionistaQuartaFeira.html';
  arquivo(filePath);
  buscarDadosDoServidorRecepcionistas('Quarta');
  document.addEventListener('DOMContentLoaded', function () {
    buscarDadosDoServidorRecepcionistas('Quarta');
  });
  waring();
}
