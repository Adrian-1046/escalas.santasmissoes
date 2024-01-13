function mostrarDiasMusica() {
  document.querySelector('.dias-musica').style.visibility = 'visible'
  document.querySelector('.dias-recepcionista').style.visibility = 'hidden'
  document.querySelector('.dias-escala').style.visibility = 'hidden'
  document.querySelector('.dias-pregador').style.visibility = 'hidden'
}
function ocultarDiasMusica() {
  document.querySelector('.dias-musica').style.visibility = 'hidden'
}

function abrirMusicas(solicitado, data) {
  console.log(solicitado, data)
  document.querySelector('.dias-musica').style.visibility = 'hidden'
  let selecionado, tela
  switch (solicitado) {
    case 'quartaFeira':
      selecionado = musicaQuartaFeira(data)
      tela = 'Quarta'
      break
    case 'domingoManha':
      selecionado = musicaDomingoManha(data)
      tela = 'DomingoManha'
      break
    case 'domingoNoite':
      selecionado = musicaDomingoNoite(data)
      tela = 'DomingoNoite'
      break
    case 'tercaFeira':
      selecionado = musicaTercaFeira(data)
      tela = 'Terca'
      break
    default:
      selecionado = 'há algo errado, entre em contato com o suporte'
      break
  }
  document.getElementById('conteudo').innerHTML = selecionado(data)
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

function buscarDadosDoServidorMusicas(tela, dia) {
  mostrarLoading()
  fetch(`/inicio/musicas/${tela}/${dia}`, { timeout: 50000 })
    .then(response => {
      console.log(response)
      if (!response.ok) {
        throw new Error(
          `Erro na busca de dados: ${response.status} ${response.statusText}`
        )
      }
      return response.text()
    })
    .then(dados => {
      const dadosArray = dados.split(';')
  
      const colunas = 7
      const totalDados = dadosArray.length
      const totalLinhas = totalDados / colunas

      for (let i = 0; i < totalLinhas; i++) {
        document.getElementById(`S1_data`).innerText = dadosArray[0]
        document.getElementById(`S2_data`).innerText = dadosArray[1]
        document.getElementById(`S3_data`).innerText = dadosArray[2]
        document.getElementById(`S4_data`).innerText = dadosArray[3]
        document.getElementById(`S5_data`).innerText = dadosArray[4]
        document.getElementById(`${dia}_Ministrante`).innerText = dadosArray[5]
        document.getElementById(`${dia}_Musicas`).innerText = dadosArray[6]
      }
    })
    .finally(() => {
      ocultarLoading()
    })
    .catch(error => {
      console.error('Erro na busca de dados:', error)
      ocultarLoading()
    })
}

document
  .getElementById('bSalvar' + tela)
  .addEventListener('click', function (event) {
    event.preventDefault()
    atualizarMusicas(tela)
  })
