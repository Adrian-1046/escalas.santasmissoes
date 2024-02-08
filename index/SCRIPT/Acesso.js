function consultaUsuario() {
  const consultaUsuario = document.getElementById('consultaUsuario').value;

  fetch('/acesso', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `usuario=${encodeURIComponent(consultaUsuario)}`,
  })
    .then(response => response.text())
    .then(data => {
      if (data !== 'Usuario nao encontrado') {
        const campos = data.split(';');

        document.getElementById('editUsuario').value = campos[0];
        document.getElementById('editSenha').value = campos[1];
        document.getElementById('editAtivo').value = campos[2];
        document.getElementById('optAcesso').value = campos[3];
      } else {

        alert('Usuário não encontrado');
        limparCampos();
      }
    })
    .catch(error => {
      console.error('Erro na solicitação de consulta:', error);
    });
}

function limparCampos() {

  document.getElementById('editUsuario').value = '';
  document.getElementById('editSenha').value = '';
  document.getElementById('editAtivo').value = '';
  document.getElementById('optAcesso').value = '';
}

function atualizarCadastro() {
  const editUsuario = document.getElementById('editUsuario').value;
  const editSenha = document.getElementById('editSenha').value;
  const editAtivo = document.getElementById('editAtivo').value;
  const optAcesso = document.getElementById('optAcesso').value;

  limparCampos() 

 
  const formData = `USUARIO=${encodeURIComponent(editUsuario)}&SENHA=${encodeURIComponent(editSenha)}&ATIVO=${encodeURIComponent(
    editAtivo
  )}&ACESSO=${encodeURIComponent(optAcesso)}`;

 
  fetch('/atualizar-usuario', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData,
  })
    .catch(error => {
      console.error('Erro na solicitação de atualização:', error);
    });
}
