function mostrarDiasMusica() {
  document.querySelector('.dias-musica').style.visibility = 'visible'
  document.querySelector('.dias-recepcionista').style.visibility = 'hidden'
  document.querySelector('.dias-escala').style.visibility = 'hidden'
  document.querySelector('.dias-pregador').style.visibility = 'hidden'
}
function ocultarDiasMusica() {
  document.querySelector('.dias-musica').style.visibility = 'hidden'
}

function abrirMusicas(solicitado) {
  document.querySelector('.dias-musica').style.visibility = 'hidden'
  let selecionado
  switch (solicitado) {
    case 'quartaFeira':
      selecionado = musicaQuartaFeira()
      tela = 'Quarta'
      break
    case 'domingoManha':
      selecionado = musicaDomingoManha()
      tela = 'DomingoManha'
      break
    case 'domingoNoite':
      selecionado = musicaDomingoNoite()
      tela = 'DomingoNoite'
      break
    case 'tercaFeira':
      selecionado = musicaTercaFeira()
      tela = 'Terca'
      break
    default:
      selecionado = 'há algo errado, entre em contato com o suporte'
      break
  }
  document.getElementById('conteudo').innerHTML = selecionado()
}

function atualizarMusicas(tela) {
  const updateData = index => {
    const sData = encodeURIComponent(
      document.getElementById(`S${index}_data`).innerText.trim()
    )
    const sMinistrante = encodeURIComponent(
      document.getElementById(`S${index}_ministrante`).innerText.trim()
    )
    const sMusicas = encodeURIComponent(
      document.getElementById(`S${index}_musicas`).innerText.trim()
    )

    const bodyData = `s${index}Data=${sData}&s${index}Ministrante=${sMinistrante}&s${index}Musicas=${sMusicas}`
    console.log(`Enviando dados para linha ${index}: ${bodyData}`)

    fetch(`/atualizar-musicas/${tela}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: bodyData,
    })
      .then(response => response.text())
      .then(message => {
        console.log(`Resposta do servidor para linha ${index}: ${message}`)
      })
      .catch(error => {
        console.error('Erro na solicitação de atualização:', error)
      })
    alert(message)
  }

  for (let i = 1; i <= 5; i++) {
    updateData(i)
  }
}

unction buscarDadosDoServidorMusicas(tela) {
  mostrarLoading();

  fetch(`/inicio/musicas/${tela}`, { timeout: 50000 })
    .then(response => {
      console.log(response);
      return response.json();
    })
    .then(dados => {
      const container = document.querySelector('.musicas_container');
      container.innerHTML = ''; 
    
      let dia;
      switch (tela) {
        case 'DomingoManha':
          dia = '-DM';
          break;
        case 'DomingoNoite':
          dia = '-DN';
          break;
        case 'Terca':
          dia = '-T';
          break;
        case 'Quarta':
          dia = '-Q';
          break;
        default:
          dia = '';
          break;
      }

      dados.forEach((dado, index) => {
        const musica = dado[`MUSICA`] 
        const obs = dado[`OBS`] 
        const link = dado[`LINK`] 
   
        if (musica || obs || link) { 

          const div = document.createElement('div');
          div.classList.add('musicas');
          div.setAttribute('key', index);
    
          const musicaElement = document.createElement('p');
          musicaElement.innerText = musica;
    
          const obsElement = document.createElement('small');
          obsElement.classList.add('text-light');
          obsElement.innerText = obs;
    
          const linkElement = document.createElement('a');
          linkElement.setAttribute('href', link);
          linkElement.textContent = 'Saiba mais';
    
          div.appendChild(musicaElement);
          if (obs) {
            div.appendChild(obsElement);
          }

          if (link) {
            div.appendChild(linkElement);
          }
          container.appendChild(div);
        }
      });
    })
    .finally(() => {
      ocultarLoading();
    })
    .catch(error => {
      console.error('Erro na busca de dados:', error);
      ocultarLoading();
    });
}





document
  .getElementById('bSalvar' + tela)
  .addEventListener('click', function (event) {
    event.preventDefault()
    atualizarMusicas(tela)
  })
