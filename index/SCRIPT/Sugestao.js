function abrirSugestao() {
  document.getElementById('conteudo').innerHTML = telaSugestao();
}

async function carregarSugestoes() {
  try {
    // Faça uma requisição para obter as sugestões do servidor
    const response = await fetch('/obter-sugestoes');

    // Verifique se a resposta está OK
    if (response.ok) {
      // Obtenha o HTML da resposta
      const html = await response.text();

      // Inserir o HTML no contêiner
      document.getElementById('sugestoes-container').innerHTML = html;
    } else {
      console.error('Erro ao obter sugestões:', response.statusText);
    }
  } catch (error) {
    console.error('Erro ao obter sugestões:', error.message);
  }
}

// Chame a função para carregar as sugestões ao carregar a página
carregarSugestoes();

function removerSugestao(sugestao) {
  try {
    // Redireciona para a rota de remoção com o nome da sugestão como parâmetro de consulta
    window.location.href = `/remover-sugestao?sugestao=${encodeURIComponent(
      sugestao
    )}`;
  } catch (error) {
    console.error('Erro ao remover sugestão:', error.message);
  }
}
