/* ===== MOSTRAR E OCULTAR DIAS DAS PREGADORES =====*/
function mostrarDiasPregador() {
  document.querySelector('.dias-pregador').style.visibility = 'visible'
  document.querySelector('.dias-recepcionista').style.visibility = 'hidden'
  document.querySelector('.dias-escala').style.visibility = 'hidden'
  /* document.querySelector('.dias-musica').style.visibility = 'hidden'; */
}
function ocultarDiasPregador() {
  document.querySelector('.dias-pregador').style.visibility = 'hidden'
}

/* ========== ABRIR PREGADORES ========== */

function abrirPregadores(solicitado) {
  document.querySelector('.dias-pregador').style.visibility = 'hidden'
  let selecionado, tela
  switch (solicitado) {
    case 'quartaFeira':
      selecionado = pregadorQuartaFeira()
      tela = 'Quarta'
      break
    case 'domingoManha':
      selecionado = pregadorDomingoManha()
      tela = 'DomingoManha'
      break
    case 'domingoNoite':
      selecionado = pregadorDomingoNoite()
      tela = 'DomingoNoite'
      break
    case 'tercaFeira':
      selecionado = pregadorTercaFeira()
      tela = 'Terca'
      break
    default:
      selecionado = 'há algo errado, entre em contato com o suporte'
      break
  }

  document.getElementById('conteudo').innerHTML = selecionado(tela)
}

function atualizarPregador(dia) {
  const s1Data = encodeURIComponent(
    document.getElementById('s1_data').value.trim()
  )
  const s1Pregador = encodeURIComponent(
    document.getElementById('s1_pregador').innerText.trim()
  )
  const s2Data = encodeURIComponent(
    document.getElementById('s2_data').value.trim()
  )
  const s2Pregador = encodeURIComponent(
    document.getElementById('s2_pregador').innerText.trim()
  )
  const s3Data = encodeURIComponent(
    document.getElementById('s3_data').value.trim()
  )
  const s3Pregador = encodeURIComponent(
    document.getElementById('s3_pregador').innerText.trim()
  )
  const s4Data = encodeURIComponent(
    document.getElementById('s4_data').value.trim()
  )
  const s4Pregador = encodeURIComponent(
    document.getElementById('s4_pregador').innerText.trim()
  )
  const s5Data = encodeURIComponent(
    document.getElementById('s5_data').value.trim()
  )
  const s5Pregador = encodeURIComponent(
    document.getElementById('s5_pregador').innerText.trim()
  )

  fetch('/atualizar-pregadores/' + dia, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body:
      `s1Data=${s1Data}&s1Pregador=${s1Pregador}&` +
      `s2Data=${s2Data}&s2Pregador=${s2Pregador}&` +
      `s3Data=${s3Data}&s3Pregador=${s3Pregador}&` +
      `s4Data=${s4Data}&s4Pregador=${s4Pregador}&` +
      `s5Data=${s5Data}&s5Pregador=${s5Pregador}`,
  })
    .then(response => response.text())
    .then(message => {
      alert(message)
    })
    .catch(error => {
      console.error('Erro na solicitação de atualização:', error)
    })

  carregarPregadores(dia)
}

function buscarDadosDoServidorPregadores(tela) {
  try {
    mostrarLoading()

    fetch(`/inicio/pregadores/${tela}`, { timeout: 50000 })
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
        const colunas = 2 // Considerando que são duas colunas: data e pregadores
        const totalDados = dadosArray.length
        const totalLinhas = totalDados / colunas

        for (let i = 0; i < totalLinhas; i++) {
          const dataCell = document.getElementById(`s${i + 1}_data`)
          const pregadorCell = document.getElementById(`s${i + 1}_pregador`)

          if (dataCell && pregadorCell) {
        const data1 = new Date(dadosArray[i * colunas])

        const dia1 = data1.getDate()+1

        const mes1 = data1.getMonth()+1

        const fdia1 = dia1 < 10 ? '0' + dia1 : dia1;

        const fmes1 = mes1 < 10 ? '0' + mes1 : mes1;

        const dataFormatada1 = fdia1 + '-' + fmes1
            
            dataCell.innerText = dataFormatada1
            pregadorCell.innerText = dadosArray[i * colunas + 1]
          }
        }
      })
      .catch(error => {
        console.error('Erro na busca de dados:', error)
      }).then(() => {
         fetch(`/inicio/pregadores/${tela}`, { timeout: 50000 })
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
        const colunas = 2 // Considerando que são duas colunas: data e pregadores
        const totalDados = dadosArray.length
        const totalLinhas = totalDados / colunas

        for (let i = 0; i < totalLinhas; i++) {
          const dataCell = document.getElementById(`s${i + 1}_data`)
          const pregadorCell = document.getElementById(`s${i + 1}_pregador`)

          if (dataCell && pregadorCell) {

            const data1 = new Date(dadosArray[i * colunas])

        const dia1 = data1.getDate()+1

        const mes1 = data1.getMonth()+1

        const fdia1 = dia1 < 10 ? '0' + dia1 : dia1;

        const fmes1 = mes1 < 10 ? '0' + mes1 : mes1;

        const dataFormatada1 = fdia1 + '-' + fmes1
            
            dataCell.innerText = dataFormatada1
            pregadorCell.innerText = dadosArray[i * colunas + 1]
          }
        }
      })
      .catch(error => {
        console.error('Erro na busca de dados:', error)
      })
      }).finally(() => {
        ocultarLoading()
      })
  } catch (error) {
    console.error('Erro:', error)
    ocultarLoading()
  }
}
