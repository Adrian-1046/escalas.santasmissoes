function abrirSugestao() {
  document.getElementById('conteudo').innerHTML = telaSugestao()
}

async function carregarSugestoes() {
  console.log('carregando')
  try {
    const response = await fetch('/obter-sugestoes')

    if (response.ok) {
      const html = await response.text()

      document.getElementById('sugestoes-container').innerHTML = html
    } else {
      console.error('Erro ao obter sugestões:', response.statusText)
    }
  } catch (error) {
    console.error('Erro ao obter sugestões:', error.message)
  }
}

carregarSugestoes()

function removerSugestao(sugestao) {
  try {
    window.location.href = `/remover-sugestao?sugestao=${encodeURIComponent(
      sugestao
    )}`
  } catch (error) {
    console.error('Erro ao remover sugestão:', error.message)
  }
}
