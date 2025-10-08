// =========================
// Fungsi ambil CSRF Token
// =========================
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let c of cookies) {
      const cookie = c.trim();
      if (cookie.startsWith(name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
const csrftoken = getCookie('csrftoken');

// =========================
// Jalankan setelah DOM siap
// =========================
document.addEventListener('DOMContentLoaded', () => {
  const productContainer = document.getElementById('productContainer');
  const loadingState = document.getElementById('loadingState');
  const errorState = document.getElementById('errorState');
  const emptyState = document.getElementById('emptyState');
  const btnRefresh = document.getElementById('btnRefresh');

  const productModal = document.getElementById('productModal');
  const productModalTitle = document.getElementById('productModalTitle');
  const productForm = document.getElementById('productForm');
  const productModalClose = document.getElementById('productModalClose');
  const productModalCancel = document.getElementById('productModalCancel');

  const inputId = document.getElementById('prod-id');
  const inputName = document.getElementById('prod-name');
  const inputCategory = document.getElementById('prod-category');
  const inputPrice = document.getElementById('prod-price');
  const inputThumbnail = document.getElementById('prod-thumbnail');

  const deleteModal = document.getElementById('deleteModal');
  const deleteProductName = document.getElementById('deleteProductName');
  const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
  const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');

  let toDeleteId = null;

  // =========================
  // UI Helper
  // =========================
  function showLoading() {
    if (!loadingState) return;
    loadingState.classList.remove('hidden');
    errorState?.classList.add('hidden');
    emptyState?.classList.add('hidden');
    productContainer.innerHTML = '';
  }

  function showError() {
    if (!errorState) return;
    loadingState?.classList.add('hidden');
    errorState.classList.remove('hidden');
    emptyState?.classList.add('hidden');
    productContainer.innerHTML = '';
  }

  function showEmpty() {
    if (!emptyState) return;
    loadingState?.classList.add('hidden');
    errorState?.classList.add('hidden');
    emptyState.classList.remove('hidden');
    productContainer.innerHTML = '';
  }

  function hideStates() {
    loadingState?.classList.add('hidden');
    errorState?.classList.add('hidden');
    emptyState?.classList.add('hidden');
  }

  function showToast(title, message, variant = 'info') {
    if (window.createToast) {
      createToast(title, message, variant);
    } else {
      alert(`${title}: ${message}`);
    }
  }

  // =========================
  // Load Products
  // =========================
  async function loadProducts() {
    if (!productContainer) return;
    showLoading();
    try {
      const res = await fetch("{% url 'main:get_products_json' %}");

      // 🔒 Cek kalau ternyata redirect ke login
      if (res.redirected) {
        window.location.href = res.url;
        return;
      }

      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      const items = typeof data === 'string' ? JSON.parse(data) : data;

      if (!items || items.length === 0) {
        showEmpty();
        return;
      }

      hideStates();
      productContainer.innerHTML = '';

      items.forEach(item => {
        const pk = item.pk;
        const f = item.fields;
        const thumb = f.thumbnail || 'https://source.unsplash.com/400x300/?product';
        const card = document.createElement('div');
        card.className = 'bg-white rounded-xl shadow-lg p-4';
        card.innerHTML = `
          <img src="${thumb}" alt="${f.name}" class="w-full h-48 object-cover rounded-lg mb-4">
          <h3 class="text-lg font-bold">${escapeHtml(f.name)}</h3>
          <p class="text-sm text-gray-500">${escapeHtml(f.category)}</p>
          <p class="text-blue-700 font-semibold mb-3">Rp ${escapeHtml(f.price)}</p>
          <div class="flex space-x-2">
            <a href="/product/${pk}/" class="flex-1 bg-gradient-to-r from-sky-400 to-blue-600 text-white py-2 px-3 rounded-lg text-center hover:from-blue-600 hover:to-blue-900">Detail</a>
            <button data-id="${pk}" class="editBtn flex-1 bg-yellow-500 text-white py-2 px-3 rounded-lg text-center hover:bg-yellow-600">Edit</button>
            <button data-id="${pk}" class="deleteBtn flex-1 bg-red-600 text-white py-2 px-3 rounded-lg text-center hover:bg-red-800">Delete</button>
          </div>
        `;
        productContainer.appendChild(card);
      });

      document.querySelectorAll('.editBtn').forEach(btn => {
        btn.addEventListener('click', e => openEditModal(e.target.dataset.id));
      });
      document.querySelectorAll('.deleteBtn').forEach(btn => {
        btn.addEventListener('click', e => openDeleteModal(e.target.dataset.id));
      });

    } catch (err) {
      console.error(err);
      showError();
    }
  }

  // =========================
  // Add/Edit Modal
  // =========================
  const btnAdd = document.getElementById('openAddModal');
  if (btnAdd && productModal) {
    btnAdd.addEventListener('click', () => {
      inputId.value = '';
      productModalTitle.textContent = 'Add Product';
      inputName.value = '';
      inputCategory.value = '';
      inputPrice.value = '';
      inputThumbnail.value = '';
      productModal.classList.remove('hidden');
    });
  }

  productModalClose?.addEventListener('click', () => productModal.classList.add('hidden'));
  productModalCancel?.addEventListener('click', () => productModal.classList.add('hidden'));

  if (productForm) {
    productForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const id = inputId.value;
      const payload = {
        name: inputName.value.trim(),
        category: inputCategory.value.trim(),
        price: inputPrice.value,
        thumbnail: inputThumbnail.value.trim()
      };

      if (!payload.name || !payload.category) {
        showToast('Validation', 'Nama dan kategori wajib diisi', 'warning');
        return;
      }

      try {
        let url, method;
        if (id) {
          url = `/product-ajax/${id}/edit/`;
          method = 'POST';
        } else {
          url = "{% url 'main:add_product_ajax' %}";
          method = 'POST';
        }

        const res = await fetch(url, {
          method,
          headers: {
            'X-CSRFToken': csrftoken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        // 🔒 Cek redirect ke login
        if (res.redirected) {
          window.location.href = res.url;
          return;
        }

        const data = await res.json();

        if (res.ok && data.success) {
          productModal.classList.add('hidden');
          showToast('Sukses', data.message || (id ? 'Product updated' : 'Product added'), 'success');
          await loadProducts();
        } else {
          showToast('Error', data.error || 'Gagal menyimpan produk', 'danger');
        }
      } catch (err) {
        console.error(err);
        showToast('Error', 'Gagal menyimpan produk (network)', 'danger');
      }
    });
  }

  // =========================
  // Edit Product
  // =========================
  async function openEditModal(id) {
    try {
      const res = await fetch(`/get-product-json/${id}/`);
      if (res.redirected) {
        window.location.href = res.url;
        return;
      }

      if (!res.ok) throw new Error('Not found');
      const data = await res.json();
      const item = typeof data === 'string' ? JSON.parse(data)[0] : data;
      const f = item.fields;

      inputId.value = item.pk;
      inputName.value = f.name || '';
      inputCategory.value = f.category || '';
      inputPrice.value = f.price || '';
      inputThumbnail.value = f.thumbnail || '';

      productModalTitle.textContent = 'Edit Product';
      productModal.classList.remove('hidden');
    } catch (err) {
      console.error(err);
      showToast('Error', 'Gagal membuka data produk', 'danger');
    }
  }

  // =========================
  // Delete Product
  // =========================
  function openDeleteModal(id) {
    toDeleteId = id;
    fetch(`/get-product-json/${id}/`)
      .then(res => {
        if (res.redirected) {
          window.location.href = res.url;
          return null;
        }
        return res.json();
      })
      .then(data => {
        if (!data) return;
        const item = typeof data === 'string' ? JSON.parse(data)[0] : data;
        deleteProductName.textContent = item.fields.name;
        deleteModal.classList.remove('hidden');
      })
      .catch(err => {
        console.error(err);
        showToast('Error', 'Gagal mengambil data produk', 'danger');
      });
  }

  cancelDeleteBtn?.addEventListener('click', () => {
    toDeleteId = null;
    deleteModal.classList.add('hidden');
  });

  confirmDeleteBtn?.addEventListener('click', async () => {
    if (!toDeleteId) return;
    try {
      const res = await fetch(`/delete-product-ajax/${toDeleteId}/`, {
        method: 'POST',
        headers: { 'X-CSRFToken': csrftoken }
      });

      if (res.redirected) {
        window.location.href = res.url;
        return;
      }

      const data = await res.json();
      if (res.ok && data.success) {
        deleteModal.classList.add('hidden');
        showToast('Sukses', data.message || 'Produk dihapus', 'success');
        await loadProducts();
      } else {
        showToast('Error', data.error || 'Gagal menghapus produk', 'danger');
      }
    } catch (err) {
      console.error(err);
      showToast('Error', 'Gagal menghapus produk (network)', 'danger');
    }
  });

  // =========================
  // Refresh
  // =========================
  btnRefresh?.addEventListener('click', () => loadProducts());

  // =========================
  // Escape HTML
  // =========================
  function escapeHtml(text) {
    if (!text && text !== 0) return '';
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // =========================
  // Initial Load
  // =========================
  if (productContainer) loadProducts();
});
