/* ===== MOSTRAR E OCULTAR DIAS DAS ESCALAS =====*/
function mostrarDiasEscalaADM() {
  document.querySelector('.dias-escala').style.visibility = 'visible'
  document.querySelector('.dias-recepcionista').style.visibility = 'hidden'
  document.querySelector('.dias-musica').style.visibility = 'hidden'
  document.querySelector('.dias-pregador').style.visibility = 'hidden'
}
function ocultarDiasEscalaADM() {
  document.querySelector('.dias-escala').style.visibility = 'hidden'
}

/* ========== ABRIR ESCALAS ========== */

function abrirEscalasADM(solicitado) {
  document.querySelector('.dias-escala').style.visibility = 'hidden'
  let selecionado, tela
  switch (solicitado) {
    case 'quartaFeira':
      selecionado = escalaQuartaFeiraADM()
      tela = 'Quarta'
      break
    case 'domingoManha':
      selecionado = escalaDomingoManhaADM()
      tela = 'DomingoManha'
      break
    case 'domingoNoite':
      selecionado = escalaDomingoNoiteADM()
      tela = 'DomingoNoite'
      break
    case 'tercaFeira':
      selecionado = escalaTercaFeiraADM()
      tela = 'Terca'
      break
    default:
      selecionado = 'há algo errado, entre em contato com o suporte'
      break
  }
  document.getElementById('conteudo').innerHTML = selecionado
}

function gravarEscalaADM(tela) {
  const updateData = index => {
    const sData = encodeURIComponent(
      document.getElementById(`S${index}_data`).innerText.trim()
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

    const bodyData = `s${index}Data=${sData}&s${index}Ministro=${sMinistro}&s${index}Violao=${sViolao}&s${index}Baixo=${sBaixo}&s${index}Teclado=${sTeclado}&s${index}Bateria=${sBateria}&s${index}Guitarra=${sGuitarra}&s${index}Back_1=${sBack_1}&s${index}Back_2=${sBack_2}&s${index}Back_3=${sBack_3}&s${index}Midia=${sMidia}&s${index}Som=${sSom}`

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

  alert('Escala atualizada!')
}

function buscarDadosDoServidorEscalasADM(tela) {
  try {
    mostrarLoadingADM()
    fetch(`/inicio/escalas-ADM/${tela}`, { timeout: 50000 })
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

        const colunas = 12
        const totalDados = dadosArray.length
        const totalLinhas = totalDados / colunas

        for (let i = 0; i < totalLinhas; i++) {
          document.getElementById(`S${i + 1}_data`).textContent =
            dadosArray[i * colunas + 0]
          document.getElementById(`S${i + 1}_Ministro`).textContent =
            dadosArray[i * colunas + 1]
          document.getElementById(`S${i + 1}_Violão`).textContent =
            dadosArray[i * colunas + 2]
          document.getElementById(`S${i + 1}_Baixo`).textContent =
            dadosArray[i * colunas + 3]
          document.getElementById(`S${i + 1}_Teclado`).textContent =
            dadosArray[i * colunas + 4]
          document.getElementById(`S${i + 1}_Bateria`).textContent =
            dadosArray[i * colunas + 5]
          document.getElementById(`S${i + 1}_Guitarra`).textContent =
            dadosArray[i * colunas + 6]
          document.getElementById(`S${i + 1}_Back_1`).textContent =
            dadosArray[i * colunas + 7]
          document.getElementById(`S${i + 1}_Back_2`).textContent =
            dadosArray[i * colunas + 8]
          document.getElementById(`S${i + 1}_Back_3`).textContent =
            dadosArray[i * colunas + 9]
          document.getElementById(`S${i + 1}_Mídia`).textContent =
            dadosArray[i * colunas + 10]
          document.getElementById(`S${i + 1}_Som`).textContent =
            dadosArray[i * colunas + 11]
        }
      })
      .catch(error => {
        console.error('Erro na busca de dados:', error)
      })
      .finally(() => {
        ocultarLoadingADM()
      })
  } catch (error) {
    console.error('Erro:', error)
    ocultarLoadingADM()
  }
}

document
  .getElementById('bSalvar' + tela)
  .addEventListener('click', function (event) {
    event.preventDefault()
    gravarEscalaADM(tela)
  })
