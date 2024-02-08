document.addEventListener('DOMContentLoaded', function () {
  const logoutButton = document.getElementById('logoutButton');

  if (logoutButton) {
    logoutButton.addEventListener('click', async function () {
      try {
        // Envie uma solicitação POST para o endpoint de logout
        const response = await fetch('/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          // Redirecione para a página de login após o logout
          window.location.href = '/';
        } else {
          // Exiba uma mensagem de erro se o logout falhar
          console.error('Erro ao fazer logout:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao fazer logout:', error);
      }
    });
  }
});