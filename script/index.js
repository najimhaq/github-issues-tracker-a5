document.addEventListener('DOMContentLoaded', () => {
  const signIn = document.getElementById('signIn-btn');
  const userName = document.getElementById('input-userName');
  const inputPass = document.getElementById('input-pass');

  signIn.addEventListener('click', async (e) => {
    e.preventDefault();

    const getUserName = userName.value.trim();
    const getPassword = inputPass.value.trim();

    if (!getUserName || !getPassword) {
      alert('Please input Username and Password');
      return;
    }

    try {
      if (getUserName === 'admin' && getPassword === 'admin123') {
        alert('Login Successfully');
        window.location.assign('/dashboard.html');
      } else {
        alert('Login failed');
      }
    } catch (error) {
      alert('Problem');
      console.error(error);
    }
  });
});
