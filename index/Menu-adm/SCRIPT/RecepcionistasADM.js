/* ===== MOSTRAR E OCULTAR DIAS DAS RECEPCIONISTAS =====*/
function mostrarDiasRecepcionistaADM() {
  document.querySelector('.dias-recepcionista').style.visibility = 'visible'
  document.querySelector('.dias-escala').style.visibility = 'hidden'
  document.querySelector('.dias-musica').style.visibility = 'hidden'
  document.querySelector('.dias-pregador').style.visibility = 'hidden'
}
function ocultarDiasRecepcionistaADM() {
  document.querySelector('.dias-recepcionista').style.visibility = 'hidden'
}

/* ========== ABRIR RECEPCIONISTAS ========== */

function abrirRecepcionistasADM(solicitado) {
  document.querySelector('.dias-recepcionista').style.visibility = 'hidden'
  let selecionado, tela
  switch (solicitado) {
    case 'quartaFeira':
      selecionado = recepcionistaQuartaFeiraADM()
      tela = 'Quarta'
      break
    case 'domingoManha':
      selecionado = recepcionistaDomingoManhaADM()
      tela = 'DomingoManha'
      break
    case 'domingoNoite':
      selecionado = recepcionistaDomingoNoiteADM()
      tela = 'DomingoNoite'
      break
    case 'tercaFeira':
      selecionado = recepcionistaTercaFeiraADM()
      tela = 'Terca'
      break
    default:
      selecionado = 'há algo errado, entre em contato com o suporte'
      break
  }
  document.getElementById('conteudo').innerHTML = selecionado
}

// SCRIPT/Recepcionistas.js
function atualizarRecepcionistaADM(dia) {
  const s1Data = encodeURIComponent(
    document.getElementById('s1_data').value.trim()
  )
  const s1Recepcionista = encodeURIComponent(
    document.getElementById('s1_recepcionista').innerText.trim()
  )
  const s2Data = encodeURIComponent(
    document.getElementById('s2_data').value.trim()
  )
  const s2Recepcionista = encodeURIComponent(
    document.getElementById('s2_recepcionista').innerText.trim()
  )
  const s3Data = encodeURIComponent(
    document.getElementById('s3_data').value.trim()
  )
  const s3Recepcionista = encodeURIComponent(
    document.getElementById('s3_recepcionista').innerText.trim()
  )
  const s4Data = encodeURIComponent(
    document.getElementById('s4_data').value.trim()
  )
  const s4Recepcionista = encodeURIComponent(
    document.getElementById('s4_recepcionista').innerText.trim()
  )
  const s5Data = encodeURIComponent(
    document.getElementById('s5_data').value.trim()
  )
  const s5Recepcionista = encodeURIComponent(
    document.getElementById('s5_recepcionista').innerText.trim()
  )

  fetch('/atualizar-recepcionistas-ADM/' + dia, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body:
      `s1Data=${s1Data}&s1Recepcionista=${s1Recepcionista}&` +
      `s2Data=${s2Data}&s2Recepcionista=${s2Recepcionista}&` +
      `s3Data=${s3Data}&s3Recepcionista=${s3Recepcionista}&` +
      `s4Data=${s4Data}&s4Recepcionista=${s4Recepcionista}&` +
      `s5Data=${s5Data}&s5Recepcionista=${s5Recepcionista}`,
  })
    .then(response => response.text())
    .then(message => {
      alert(message)
    })
    .catch(error => {
      console.error('Erro na solicitação de atualização:', error)
    })

  carregarRecepcionistasADM(dia)
}

function buscarDadosDoServidorRecepcionistasADM(tela) {
  try {
    mostrarLoading()

    fetch(`/inicio/recepcionistas-ADM/${tela}`, { timeout: 50000 })
      .then(response => {
        if (!response.ok) {
          throw new Error(
            `Erro na busca de dados: ${response.status} ${response.statusText}`
          )
        }
        return response.text()
      })
      .then(dados => {
        const dadosArray = dados.split(';')

        // Atualize as células da tabela com os dados recebidos
        const colunas = 2
        const totalDados = dadosArray.length
        const totalLinhas = totalDados / colunas

        for (let i = 0; i < totalLinhas; i++) {
          const dataCell = document.getElementById(`s${i + 1}_data`)
          const recepcionistaCell = document.getElementById(
            `s${i + 1}_recepcionista`
          )

          if (dataCell && recepcionistaCell) {
            dataCell.value = dadosArray[i * colunas]
            recepcionistaCell.innerText = dadosArray[i * colunas + 1]
          }
        }
      })
      .catch(error => {
        console.error('Erro na busca de dados:', error)
      })
      .then(() => {
        fetch(`/inicio/recepcionistas-ADM/${tela}`, { timeout: 50000 })
      .then(response => {
        if (!response.ok) {
          throw new Error(
            `Erro na busca de dados: ${response.status} ${response.statusText}`
          )
        }
        return response.text()
      })
      .then(dados => {
        const dadosArray = dados.split(';')

        // Atualize as células da tabela com os dados recebidos
        const colunas = 2
        const totalDados = dadosArray.length
        const totalLinhas = totalDados / colunas

        for (let i = 0; i < totalLinhas; i++) {
          const dataCell = document.getElementById(`s${i + 1}_data`)
          const recepcionistaCell = document.getElementById(
            `s${i + 1}_recepcionista`
          )

          if (dataCell && recepcionistaCell) {
            dataCell.value = dadosArray[i * colunas]
            recepcionistaCell.innerText = dadosArray[i * colunas + 1]
          }
        }
      })
      .catch(error => {
        console.error('Erro na busca de dados:', error)
      })
      })
      .finally(() => {
        ocultarLoading()
      })
  } catch (error) {
    console.error('Erro:', error)
    ocultarLoading()
  }
}
