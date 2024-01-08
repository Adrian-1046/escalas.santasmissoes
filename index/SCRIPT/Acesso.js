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

        document.getElementById('editSenha').value = campos[0];
        document.getElementById('editUsuario').value = campos[1];
        document.getElementById('editEmail').value = campos[2];
        document.getElementById('cargo').value = campos[3];
        document.getElementById('editAtivo').value = campos[4];
        document.getElementById('editTelefone').value = campos[5];
        document.getElementById('editAcesso').value = campos[6];
        document.getElementById('editIndex').value = campos[0]; 
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
  document.getElementById('editEmail').value = '';
  document.getElementById('editSenha').value = '';
  document.getElementById('cargo').value = '';
  document.getElementById('editAtivo').value = '';
  document.getElementById('editTelefone').value = '';
  document.getElementById('editAcesso').value = '';
  document.getElementById('editIndex').value = '';
}

function atualizarCadastro() {
  const editUsuario = document.getElementById('editUsuario').value;
  const editEmail = document.getElementById('editEmail').value;
  const editSenha = document.getElementById('editSenha').value;
  const cargo = document.getElementById('cargo').value;
  const editAtivo = document.getElementById('editAtivo').value;
  const editTelefone = document.getElementById('editTelefone').value;
  const editAcesso = document.getElementById('editAcesso').value;

  limparCampos() 

 
  const formData = `USUARIO=${encodeURIComponent(editUsuario)}&EMAIL=${encodeURIComponent(
    editEmail
  )}&SENHA=${encodeURIComponent(editSenha)}&CARGO=${encodeURIComponent(cargo)}&ATIVO=${encodeURIComponent(
    editAtivo
  )}&TELEFONE=${encodeURIComponent(editTelefone)}&ACESSO=${encodeURIComponent(editAcesso)}`;

 
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
