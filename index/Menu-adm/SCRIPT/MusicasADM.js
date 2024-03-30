function mostrarDiasMusicaADM() {
  document.querySelector('.dias-musica').style.visibility = 'visible'
  document.querySelector('.dias-recepcionista').style.visibility = 'hidden'
  document.querySelector('.dias-escala').style.visibility = 'hidden'
  document.querySelector('.dias-pregador').style.visibility = 'hidden'
}
function ocultarDiasMusicaADM() {
  document.querySelector('.dias-musica').style.visibility = 'hidden'
}

function abrirMusicasADM(solicitado, data) {
  document.querySelector('.dias-musica').style.visibility = 'hidden'
  let selecionado, tela
  switch (solicitado) {
    case 'quartaFeira':
      selecionado = musicaQuartaFeiraADM(data)
      tela = 'Quarta'
      break
    case 'domingoManha':
      selecionado = musicaDomingoManhaADM(data)
      tela = 'DomingoManha'
      break
    case 'domingoNoite':
      selecionado = musicaDomingoNoiteADM(data)
      tela = 'DomingoNoite'
      break
    case 'tercaFeira':
      selecionado = musicaTercaFeiraADM(data)
      tela = 'Terca'
      break
    default:
      selecionado = 'há algo errado, entre em contato com o suporte'
      break
  }
  document.getElementById('conteudo').innerHTML = selecionado(data)
}

function gravarMusicaADM(tela) {
mostrarLoading()

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

  const sData = encodeURIComponent(
    document.getElementById(`data`).value.trim()
  )

  const sMinistro = encodeURIComponent(
    document.getElementById(`ministro`).innerText.trim()
  )

  const sMusica = encodeURIComponent(
    document.getElementById(`musica${dia}`).innerText.trim()
  );
  const sLink = encodeURIComponent(
    document.getElementById(`link${dia}`).innerText.trim()
  );
  const sObs = encodeURIComponent(
    document.getElementById(`obs${dia}`).innerText.trim()
  );

  const bodyData = `DATA=${sData}&MINISTRO=${sMinistro}&MUSICA=${sMusica}&LINK=${sLink}&OBS=${sObs}`;

  fetch(`/atualizar-musicas/${tela}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: bodyData,
  }).then(() => {
    document.getElementById(`musica${dia}`).innerText = ''
    document.getElementById(`link${dia}`).innerText = ''
    document.getElementById(`obs${dia}`).innerText = ''
  })
    .then(() => {buscarDadosDoServidorMusicasADM(tela)})
    .catch((error) => {
      console.error('Erro na solicitação de atualização:', error);
    });
}

async function removerMusica(tela, musica, link, obs) {
  mostrarLoading()

  try {
      let endpoint = '/remover/';
      let params = [];

      if (tela) params.push(tela);

      if (musica && link && obs) params.push(musica);
      if (musica && link && obs) params.push(link);
      if (musica && link && obs) params.push(`${obs}/mlo`);


      if (musica && link && !obs) params.push(musica);
      if (musica && link && !obs) params.push(`${link}/ml`);


      if (musica && !link && obs) params.push(musica);
      if (musica && !link && obs) params.push(`${obs}/mo`);

      if (!musica && link && obs) params.push(link);
      if (!musica && link && obs) params.push(`${obs}/lo`);

      if (musica && !link && !obs) params.push(`${musica}/m`);
      
      if (!musica && link && !obs) params.push(`${link}/l`)

      if (!musica && !link && obs) params.push(`${obs}/o`);

      endpoint += params.join('/');

      await fetch(endpoint, { 
          timeout: 50000,
          method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
          },
      });
      buscarDadosDoServidorMusicasADM(tela);
  } catch (error) {
      console.error('Error while removing music:', error);
  }
}




function buscarDadosDoServidorMusicasADM(tela) {
  mostrarLoading();

  fetch(`/inicio/musicas/${tela}`, { timeout: 50000 })
    .then(response => {
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
        const data = dado[`DATA`]
        const ministro = dado[`MINISTRO`]
        const musica = dado[`MUSICA`] 
        const obs = dado[`OBS`] 
        const link = dado[`LINK`] 

        vdata = document.getElementById('data');
        vdata.value = data

        vministro = document.getElementById('ministro')
        vministro.innerText = ministro
   
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

          const removeElement = document.createElement('button');
          removeElement.textContent = `remover`;
          removeElement.setAttribute('type', 'button')
          removeElement.onclick = function() {
            removerMusica(tela, musica, link, obs);
          };
    
          div.appendChild(musicaElement);
          if (obs) {
            div.appendChild(obsElement);
          }

          if (link) {
            div.appendChild(linkElement);
          }
          div.appendChild(removeElement);
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
    atualizarMusicasADM(tela)
  })
