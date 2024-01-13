document.addEventListener('DOMContentLoaded', function() {
  const botaoAcesso = document.getElementById('acesso');
  ///validar usuario para exibir só pra adm
  botaoAcesso.style.visibility = 'visible';
});

function deletarUsuario() {
  document.getElementById('submit-cad4').style.display = 'block'
}

function deletarAgora(usuario) {
  try {
    window.location.href = `/remover-usuario?usuario=${encodeURIComponent(
      usuario
    )}`
  } catch (error) {
    console.error('Erro ao remover usuario:', error.message)
  }
}