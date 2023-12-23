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

        // Preencha os campos do formulário com os dados do usuário encontrado
        document.getElementById('editId').value = campos[0];
        document.getElementById('editUsuario').value = campos[1];
        document.getElementById('editEmail').value = campos[2];
        document.getElementById('cargo').value = campos[3];
        document.getElementById('editAtivo').value = campos[4];
        document.getElementById('editTelefone').value = campos[5];
        document.getElementById('editAcesso').value = campos[6];
        document.getElementById('editIndex').value = campos[0]; // Se precisar do ID para atualizar
      } else {
        // Usuário não encontrado
        alert('Usuário não encontrado');
        // Limpe os campos do formulário
        limparCampos();
      }
    })
    .catch(error => {
      console.error('Erro na solicitação de consulta:', error);
    });
}

function limparCampos() {
  // Limpe os campos do formulário
  document.getElementById('editId').value = '';
  document.getElementById('editUsuario').value = '';
  document.getElementById('editEmail').value = '';
  document.getElementById('cargo').value = '';
  document.getElementById('editAtivo').value = '';
  document.getElementById('editTelefone').value = '';
  document.getElementById('editAcesso').value = '';
  document.getElementById('editIndex').value = '';
}

function atualizarCadastro() {
  const editId = document.getElementById('editId').value;
  const editEmail = document.getElementById('editEmail').value;
  const cargo = document.getElementById('cargo').value;
  const editAtivo = document.getElementById('editAtivo').value;
  const editTelefone = document.getElementById('editTelefone').value;
  const editAcesso = document.getElementById('editAcesso').value;

  // Crie uma string com os dados a serem enviados
  const formData = `ID_USUARIO=${encodeURIComponent(editId)}&EMAIL=${encodeURIComponent(
    editEmail
  )}&CARGO=${encodeURIComponent(cargo)}&ATIVO=${encodeURIComponent(
    editAtivo
  )}&TELEFONE=${encodeURIComponent(editTelefone)}&ACESSO=${encodeURIComponent(editAcesso)}`;

  // Envie a solicitação POST para a rota de atualização de usuário
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
