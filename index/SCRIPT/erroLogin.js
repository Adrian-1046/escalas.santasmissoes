document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('loginForm');
  const errorMessageElement = document.getElementById('error-message');

  loginForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(loginForm);
    const usuario = formData.get('usuario');
    const senha = formData.get('senha');

    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `usuario=${encodeURIComponent(
          usuario
        )}&senha=${encodeURIComponent(senha)}`,
      });

      if (response.ok) {
        window.location.href = '/inicio';
      } else {
        errorMessageElement.textContent = await response.text();
      }
    } catch (error) {
      console.error('Error:', error);
      errorMessageElement.textContent = 'Internal Server Error';
    }
  });
});
