document.addEventListener('DOMContentLoaded', () => {
  const signIn = document.getElementById('signIn-btn');
  const userName = document.getElementById('input-userName');
  const inputPass = document.getElementById('input-pass');

  signIn.addEventListener('click', async (e) => {
    e.preventDefault();

    const getUserName = userName.value.trim();
    const getPassword = inputPass.value.trim();

    if (!getUserName || !getPassword) {
      alert('Username এবং Password প্রয়োজন');
      return;
    }

    try {
      // এখানে শুধু ডেমো হিসেবে hardcoded চেক করা হচ্ছে
      if (getUserName === 'admin' && getPassword === 'admin123') {
        alert('Login Successfully');
        window.location.assign('/home.html');
      } else {
        alert('Login failed');
      }
    } catch (error) {
      alert('কিছু সমস্যা হয়েছে');
      console.error(error);
    }
  });
});
