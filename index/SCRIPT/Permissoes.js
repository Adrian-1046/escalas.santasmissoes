whoami()
function whoami() {
  fetch(`/whoami`, { method: 'POST' })
    .then(response => response.text())
    .then(response => verificarAutorizacao(response))
    .catch(error => {
      console.error('Erro na solicitação de atualização:', error)
    })
}

function verificarAutorizacao(tipoUsuario) {
  console.log(tipoUsuario)
  //todos os usuários devem ser capazes de falar com a liderança e deiar sugestões
  //exceto USR
  switch (tipoUsuario) {
    case 'MST': //master - acesso total
      break

    case 'ADM': //administrador - pode preencher escalas
      document.getElementById('adm--cadastro').style.display = 'none'
      document.getElementById('adm--acesso').style.display = 'none'
      document.getElementById('adm--sugestoes').style.display = 'none'
      break

    case 'MIN': //ministrante/musico - visualiza escalas, altera músicas
      document.getElementById('acessoPregador').style.display = 'none'
      document.getElementById('acessoRecepcionista').style.display = 'none'
      document.getElementById('acesso').style.display = 'none'
      break

    case 'PGD': //pregadores - visualiza pregadores
      document.getElementById('acessoEscala').style.display = 'none'
      document.getElementById('acessoRecepcionista').style.display = 'none'
      document.getElementById('acesso').style.display = 'none'
      break

    case 'REC': //recepcionistas - vizualiza recepcionistas
      document.getElementById('acessoEscala').style.display = 'none'
      document.getElementById('acessoPregador').style.display = 'none'
      document.getElementById('acesso').style.display = 'none'
      break

    case 'USR': //vizualiza tudo, altera nada, não envia sugestão
      document.getElementById('acessoLideranca').style.display = 'none'
      document.getElementById('acessoSugestao').style.display = 'none'
      document.getElementById('acesso').style.display = 'none'
      break

    default: //usuario invalido
      document.getElementById('acessoLideranca').style.display = 'none'
      document.getElementById('acessoSugestao').style.display = 'none'
      document.getElementById('acesso').style.display = 'none'
      document.getElementById('acessoEscala').style.display = 'none'
      document.getElementById('acessoPregador').style.display = 'none'
      document.getElementById('acessoRecepcionista').style.display = 'none'
      document.querySelector('.container').style.display = 'none'
      document.getElementById('conteudo').innerHTML =
        'LOGIN INVÁLIDO! ESTE SISTEMA É FECHADO'
      break
  }

  fetch(liberarAcesso, {
    method: 'POST',
  })
    .then(response => response.text())
    .catch(error => {
      console.error('Erro na solicitação de atualização:', error)
    })
}
