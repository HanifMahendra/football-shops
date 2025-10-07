// static/js/auth_ajax.js
// Depends on: window.AJAX_URLS (set in base.html), createToast (toast.js)

(function() {
  if (!window.AJAX_URLS) return;

  function getCsrf() {
    const meta = document.querySelector('meta[name="csrf-token"]');
    if (meta) return meta.content;
    // fallback: read cookie
    const name = 'csrftoken=';
    const c = document.cookie.split(';').map(s=>s.trim()).find(s=>s.startsWith(name));
    return c ? decodeURIComponent(c.substring(name.length)) : '';
  }
  const CSRF = getCsrf();

  // Generic helper: post JSON
  async function postJson(url, payload) {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': CSRF,
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    const data = await res.json().catch(()=>({ success: false, error: 'Invalid response' }));
    return { ok: res.ok, data };
  }

  // Login form (if exists)
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = loginForm.querySelector('button[type="submit"]');
      const username = loginForm.querySelector('input[name="username"], #username')?.value?.trim();
      const password = loginForm.querySelector('input[name="password"], #password')?.value?.trim();
      if (!username || !password) {
        createToast('Login', 'Username & password harus diisi', 'warning');
        return;
      }
      if (btn) btn.disabled = true;
      const { ok, data } = await postJson(window.AJAX_URLS.login, { username, password });
      if (data && data.success) {
        createToast('Login', 'Login berhasil! Mengalihkan...', 'success');
        setTimeout(()=> window.location.href = '/', 900);
      } else {
        createToast('Login gagal', data.error || 'Invalid credentials', 'danger');
      }
      if (btn) btn.disabled = false;
    });
  }

  // Register form
  const regForm = document.getElementById('register-form');
  if (regForm) {
    regForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = regForm.querySelector('button[type="submit"]');
      const username = regForm.querySelector('input[name="username"], #id_username')?.value?.trim();
      const password1 = regForm.querySelector('input[name="password1"], #id_password1')?.value;
      const password2 = regForm.querySelector('input[name="password2"], #id_password2')?.value;
      if (!username || !password1 || !password2) {
        createToast('Register', 'Semua field harus diisi', 'warning');
        return;
      }
      if (password1 !== password2) {
        createToast('Register', 'Password dan konfirmasi tidak cocok', 'warning');
        return;
      }
      if (btn) btn.disabled = true;
      const { ok, data } = await postJson(window.AJAX_URLS.register, { username, password: password1 });
      if (data && data.success) {
        createToast('Register', 'Akun berhasil dibuat. Mengalihkan...', 'success');
        setTimeout(()=> window.location.href = '/', 900);
      } else {
        createToast('Register gagal', data.error || 'Gagal mendaftar', 'danger');
      }
      if (btn) btn.disabled = false;
    });
  }

  // Logout: intercept anchor to logout url (if present) and call AJAX
  document.addEventListener('click', async (e) => {
    const a = e.target.closest('a');
    if (!a) return;
    // match logout URL path (AJAX endpoint)
    const logoutUrl = window.AJAX_URLS.logout;
    // We intercept only if href equals the regular logout url (non-ajax, typically '/logout/')
    if (a.getAttribute('href') && a.getAttribute('href').endsWith('/logout/')) {
      e.preventDefault();
      // call AJAX logout endpoint
      try {
        const { ok, data } = await postJson(logoutUrl, {});
        if (data && data.success) {
          createToast('Logout', 'Berhasil logout', 'success');
          setTimeout(()=> window.location.href = '/login/', 700);
        } else {
          createToast('Logout gagal', data.error || 'Gagal logout', 'danger');
          // fallback: follow href
          setTimeout(()=> window.location.href = a.getAttribute('href'), 900);
        }
      } catch (err) {
        console.error(err);
        createToast('Error', 'Gagal terhubung', 'danger');
      }
    }
  });

})();
