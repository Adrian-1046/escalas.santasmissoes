/* ===== MOSTRAR E OCULTAR DIAS DAS MUSICAS =====*/
function mostrarDiasMusica() {
  document.querySelector('.dias-musica').style.visibility = 'visible';
  document.querySelector('.dias-recepcionista').style.visibility = 'hidden';
  document.querySelector('.dias-escala').style.visibility = 'hidden';
  document.querySelector('.dias-pregador').style.visibility = 'hidden';
}
function ocultarDiasMusica() {
  document.querySelector('.dias-musica').style.visibility = 'hidden';
}

/* ========== ABRIR MUSICAS ========== */

function abrirMusicas(solicitado) {
  document.querySelector('.dias-musica').style.visibility = 'hidden';
  let selecionado, tela;
  switch (solicitado) {
    case 'quartaFeira':
      selecionado = musicaQuartaFeira();
      tela = 'Quarta';
      break;
    case 'domingoManha':
      selecionado = musicaDomingoManha();
      tela = 'DomingoManha';
      break;
    case 'domingoNoite':
      selecionado = musicaDomingoNoite();
      tela = 'DomingoNoite';
      break;
    case 'tercaFeira':
      selecionado = musicaTercaFeira();
      tela = 'Terca';
      break;
    default:
      selecionado = 'há algo errado, entre em contato com o suporte';
      break;
  }
  document.getElementById('conteudo').innerHTML = selecionado();
}

function atualizarMusicas(tela) {
  const updateData = index => {
    const sData = encodeURIComponent(
      document.getElementById(`S${index}_data`).innerText.trim()
    );
    const sMinistrante = encodeURIComponent(
      document.getElementById(`S${index}_ministrante`).innerText.trim()
    );
    const sMusicas = encodeURIComponent(
      document.getElementById(`S${index}_musicas`).innerText.trim()
    );

    const bodyData = `s${index}Data=${sData}&s${index}Ministrante=${sMinistrante}&s${index}Musicas=${sMusicas}`;
    console.log(`Enviando dados para linha ${index}: ${bodyData}`);

    fetch(`/atualizar-musicas/${tela}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: bodyData,
    })
      .then(response => response.text())
      .then(message => {
        console.log(`Resposta do servidor para linha ${index}: ${message}`);
      })
      .catch(error => {
        console.error('Erro na solicitação de atualização:', error);
      });
    alert(message);
  };

  for (let i = 1; i <= 5; i++) {
    updateData(i);
  }
}

function buscarDadosDoServidorMusicas(tela) {
  mostrarLoading();
  fetch(`/inicio/musicas/${tela}`, { timeout: 50000 })
    .then(response => {
      console.log(response);
      if (!response.ok) {
        throw new Error(
          `Erro na busca de dados: ${response.status} ${response.statusText}`
        );
      }
      return response.text();
    })
    .then(dados => {
      const dadosArray = dados.split(';');

      const colunas = 3;
      const totalDados = dadosArray.length;
      const totalLinhas = totalDados / colunas;

      for (let i = 0; i < totalLinhas; i++) {
        document.getElementById(`S${i + 1}_data`).innerText =
          dadosArray[i * colunas];
        document.getElementById(`S${i + 1}_ministrante`).innerText =
          dadosArray[i * colunas + 1];
        document.getElementById(`S${i + 1}_musicas`).innerText =
          dadosArray[i * colunas + 2];
      }
    })
    .finally(() => {
      ocultarLoading();
    })
    .catch(error => {
      console.error('Erro na busca de dados:', error);
      ocultarLoading();
    });
}

// evento genérico para buscar dados ao carregar a página
document.addEventListener('DOMContentLoaded', function () {
  buscarDadosDoServidorMusicas(tela);
});

// evento genérico para atualizar músicas ao clicar no botão de salvar
document
  .getElementById('bSalvar' + tela)
  .addEventListener('click', function (event) {
    event.preventDefault();
    atualizarMusicas(tela);
  });
