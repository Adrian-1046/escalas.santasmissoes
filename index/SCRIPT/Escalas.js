const session = require('express-session')
console.log(session)

/* ===== MOSTRAR E OCULTAR DIAS DAS ESCALAS =====*/
function mostrarDiasEscala() {
  document.querySelector('.dias-escala').style.visibility = 'visible'
  document.querySelector('.dias-recepcionista').style.visibility = 'hidden'
  /* document.querySelector('.dias-musica').style.visibility = 'hidden' */
  document.querySelector('.dias-pregador').style.visibility = 'hidden'
}
function ocultarDiasEscala() {
  document.querySelector('.dias-escala').style.visibility = 'hidden'
}

/* ========== ABRIR ESCALAS ========== */

function abrirEscalas(solicitado, data) {
  document.querySelector('.dias-escala').style.visibility = 'hidden'
  let selecionado, tela
  switch (solicitado) {
    case 'quartaFeira':
      selecionado = escalaQuartaFeira(data)
      tela = 'Quarta'
      break
    case 'domingoManha':
      selecionado = escalaDomingoManha(data)
      tela = 'DomingoManha'
      break
    case 'domingoNoite':
      selecionado = escalaDomingoNoite(data)
      tela = 'DomingoNoite'
      break
    case 'tercaFeira':
      selecionado = escalaTercaFeira(data)
      tela = 'Terca'
      break
    default:
      selecionado = 'há algo errado, entre em contato com o suporte'
      tela = undefined
      break
  }
  document.getElementById('conteudo').innerHTML = selecionado(data)
}

function gravarEscala(tela) {
  const updateData = index => {
    const sData1 = encodeURIComponent(
      document.getElementById(`S1_data`).innerText.trim()
    )
    const sData2 = encodeURIComponent(
      document.getElementById(`S2_data`).innerText.trim()
    )
    const sData3 = encodeURIComponent(
      document.getElementById(`S3_data`).innerText.trim()
    )
    const sData4 = encodeURIComponent(
      document.getElementById(`S4_data`).innerText.trim()
    )
    const sData5 = encodeURIComponent(
      document.getElementById(`S5_data`).innerText.trim()
    )
    const sMinistro = encodeURIComponent(
      document.getElementById(`S${index}_Ministro`).innerText.trim()
    )
    const sViolao = encodeURIComponent(
      document.getElementById(`S${index}_Violão`).innerText.trim()
    )
    const sBaixo = encodeURIComponent(
      document.getElementById(`S${index}_Baixo`).innerText.trim()
    )
    const sTeclado = encodeURIComponent(
      document.getElementById(`S${index}_Teclado`).innerText.trim()
    )
    const sBateria = encodeURIComponent(
      document.getElementById(`S${index}_Bateria`).innerText.trim()
    )
    const sGuitarra = encodeURIComponent(
      document.getElementById(`S${index}_Guitarra`).innerText.trim()
    )
    const sBack_1 = encodeURIComponent(
      document.getElementById(`S${index}_Back_1`).innerText.trim()
    )
    const sBack_2 = encodeURIComponent(
      document.getElementById(`S${index}_Back_2`).innerText.trim()
    )
    const sBack_3 = encodeURIComponent(
      document.getElementById(`S${index}_Back_3`).innerText.trim()
    )
    const sMidia = encodeURIComponent(
      document.getElementById(`S${index}_Mídia`).innerText.trim()
    )
    const sSom = encodeURIComponent(
      document.getElementById(`S${index}_Som`).innerText.trim()
    )

    const bodyData = `sData1=${sData1}&sData2=${sData2}&sData3=${sData3}&sData4=${sData4}&sData5=${sData5}&s${index}Ministro=${sMinistro}&s${index}Violao=${sViolao}&s${index}Baixo=${sBaixo}&s${index}Teclado=${sTeclado}&s${index}Bateria=${sBateria}&s${index}Guitarra=${sGuitarra}&s${index}Back_1=${sBack_1}&s${index}Back_2=${sBack_2}&s${index}Back_3=${sBack_3}&s${index}Midia=${sMidia}&s${index}Som=${sSom}`

    fetch(`/atualizar-escalas/${tela}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: bodyData,
    })
      .then(response => response.text())
      .catch(error => {
        console.error('Erro na solicitação de atualização:', error)
      })
  }

  for (let i = 1; i <= 5; i++) {
    updateData(i)
  }
}

function buscarDadosDoServidorEscalas(tela, dia) {
  try {
    mostrarLoading()

    fetch(`/inicio/escalas/${tela}/${dia}`, { timeout: 50000 })
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

        const colunas = 16
        const totalDados = dadosArray.length
        const totalLinhas = totalDados / colunas

        for (let i = 0; i < totalLinhas; i++) {
          document.getElementById(`S1_data`).innerText = dadosArray[0]
          document.getElementById(`S2_data`).innerText = dadosArray[1]
          document.getElementById(`S3_data`).innerText = dadosArray[2]
          document.getElementById(`S4_data`).innerText = dadosArray[3]
          document.getElementById(`S5_data`).innerText = dadosArray[4]
          document.getElementById(`${dia}_Ministro`).innerText = dadosArray[5]
          document.getElementById(`${dia}_Violão`).innerText = dadosArray[6]
          document.getElementById(`${dia}_Baixo`).innerText = dadosArray[7]
          document.getElementById(`${dia}_Teclado`).innerText = dadosArray[8]
          document.getElementById(`${dia}_Bateria`).innerText = dadosArray[9]
          document.getElementById(`${dia}_Guitarra`).innerText = dadosArray[10]
          document.getElementById(`${dia}_Back_1`).innerText = dadosArray[11]
          document.getElementById(`${dia}_Back_2`).innerText = dadosArray[12]
          document.getElementById(`${dia}_Back_3`).innerText = dadosArray[13]
          document.getElementById(`${dia}_Mídia`).innerText = dadosArray[14]
          document.getElementById(`${dia}_Som`).innerText = dadosArray[15]
        }
      })
      .catch(error => {
        console.error('Erro na busca de dados:', error)
      })
      .finally(() => {
        ocultarLoading()
      })
  } catch (error) {
    console.error('Erro:', error)
    ocultarLoading()
  }
}

document
  .getElementById('bSalvar' + tela)
  .addEventListener('click', function (event) {
    event.preventDefault()
    gravarEscala(tela)
  })
