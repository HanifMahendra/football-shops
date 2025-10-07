// static/js/toast.js
// createToast(title, message, variant='info', timeout=3500)
function createToast(title, message, variant='info', timeout=3500) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const colors = {
    info: 'bg-blue-600',
    success: 'bg-green-600',
    warning: 'bg-yellow-500 text-black',
    danger: 'bg-red-600'
  };
  const colorClass = colors[variant] || colors.info;

  const toast = document.createElement('div');
  toast.className = `${colorClass} text-white px-4 py-3 rounded shadow-lg flex items-start gap-3 w-80 pointer-events-auto`;
  toast.style.opacity = '0';
  toast.style.transform = 'translateY(-8px)';
  toast.innerHTML = `
    <div class="flex-1">
      <div class="font-semibold">${escapeHtml(title)}</div>
      <div class="text-sm mt-1">${escapeHtml(message)}</div>
    </div>
    <button class="ml-2 text-white/80 close-toast" aria-label="close">&times;</button>
  `;
  container.appendChild(toast);

  // animate in
  requestAnimationFrame(() => {
    toast.style.transition = 'opacity 220ms ease, transform 220ms ease';
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
  });

  const to = setTimeout(() => dismissToast(toast), timeout);

  toast.querySelector('.close-toast').addEventListener('click', () => {
    clearTimeout(to);
    dismissToast(toast);
  });

  function dismissToast(el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(-8px)';
    setTimeout(() => { if (el.parentNode) el.parentNode.removeChild(el); }, 220);
  }

  function escapeHtml(s) {
    if (!s && s !== 0) return '';
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  }
}
