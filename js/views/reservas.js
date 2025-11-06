import { html, repeat } from '../templates.js';
import { Store } from '../store.js';
import { FormValidator } from '../components/FormValidator.js';
import { toast, $ } from '../utils.js';

const uid = () => Math.random().toString(36).slice(2, 9);

let currentFilter = 'todas';        // 'todas' | 'ativas' | 'concluídas'
let currentSort = 'checkin-asc';    // 'checkin-asc' | 'checkin-desc'

export async function ReservasView() {
  const reservas = Store.all();

  const view = html`
    <section>
      <h1>Reservas</h1>
      <p>Cadastre e gerencie as reservas da hospedagem.</p>

      <form id="reserva-form" class="card">
        <label>
          Nome do hóspede
          <input name="hospede" data-validate="required|min:3" placeholder="Ex: Ana Silva" />
        </label>

        <label>
          Nº do quarto
          <input name="quarto" data-validate="required" placeholder="Ex: 203" />
        </label>

        <div style="display:flex; gap:1rem; flex-wrap:wrap;">
          <label style="flex:1; min-width:150px;">
            Check-in
            <input type="date" name="checkin" data-validate="required" />
          </label>
          <label style="flex:1; min-width:150px;">
            Check-out
            <input type="date" name="checkout" data-validate="required" />
          </label>
        </div>

        <label>
          Observações
          <textarea name="obs" rows="3" data-validate="min:5"
            placeholder="Preferências, observações... (opcional)"></textarea>
        </label>

        <button type="submit">Cadastrar reserva</button>
      </form>

      <div class="card" style="margin-top:1rem;">
        <h3>Opções de visualização</h3>
        <div style="display:flex; gap:1rem; flex-wrap:wrap;">
          <label style="flex:1; min-width:160px;">
            Filtro por status
            <select id="filtro-status">
              <option value="todas">Todas</option>
              <option value="ativas">Ativas</option>
              <option value="concluídas">Concluídas</option>
            </select>
          </label>

          <label style="flex:1; min-width:160px;">
            Ordenar por data
            <select id="ordenacao-data">
              <option value="checkin-asc">Check-in (mais antiga primeiro)</option>
              <option value="checkin-desc">Check-in (mais recente primeiro)</option>
            </select>
          </label>
        </div>
      </div>

      <div class="card" id="reserva-list" style="margin-top:1rem;">
        <h3>Lista de reservas</h3>
        <ul>
          ${repeat(reservas, r => renderItem(r))}
        </ul>
      </div>
    </section>
  `;

  queueMicrotask(() => initPage());

  return view;
}

function renderItem(r) {
  return html`
    <li data-id="${r.id}" style="display:flex; align-items:center; gap:.5rem; margin-bottom:.25rem;">
      <span style="flex:1; ${r.status === 'concluída' ? 'text-decoration: line-through; opacity:.6;' : ''}">
        <strong>${r.hospede}</strong> — Quarto ${r.quarto}<br>
        ${formatDate(r.checkin)} até ${formatDate(r.checkout)}<br>
        <small>Status: ${r.status}</small>
      </span>
      <button class="secondary outline btn-toggle">
        ${r.status === 'concluída' ? 'Reabrir' : 'Concluir'}
      </button>
      <button class="secondary outline btn-delete">Excluir</button>
    </li>
  `;
}

function initPage() {
  const form = $('#reserva-form');
  const validator = new FormValidator(form);

  const filtroStatus = $('#filtro-status');
  const ordenacaoData = $('#ordenacao-data');

  if (filtroStatus) {
    filtroStatus.value = currentFilter;
    filtroStatus.addEventListener('change', () => {
      currentFilter = filtroStatus.value;
      renderList();
    });
  }

  if (ordenacaoData) {
    ordenacaoData.value = currentSort;
    ordenacaoData.addEventListener('change', () => {
      currentSort = ordenacaoData.value;
      renderList();
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validator.validate()) return;

    const data = new FormData(form);
    const checkin = String(data.get('checkin'));
    const checkout = String(data.get('checkout'));

    if (new Date(checkout) <= new Date(checkin)) {
      const checkoutInput = form.querySelector('input[name="checkout"]');
      let holder = checkoutInput.nextElementSibling;
      if (!holder || !holder.classList.contains('form-error')) {
        holder = document.createElement('div');
        holder.className = 'form-error';
        checkoutInput.insertAdjacentElement('afterend', holder);
      }
      const msg = 'Check-out deve ser após a data de check-in.';
      holder.textContent = msg;
      checkoutInput.classList.add('input-invalid');
      toast(msg);
      return;
    }

    const reserva = {
      id: uid(),
      hospede: String(data.get('hospede')).trim(),
      quarto: String(data.get('quarto')).trim(),
      checkin,
      checkout,
      obs: String(data.get('obs') || '').trim(),
      status: 'ativa',
      createdAt: Date.now()
    };

    Store.add(reserva);
    renderList();
    form.reset();
    toast('Reserva cadastrada com sucesso!');
  });

  $('#reserva-list').addEventListener('click', (e) => {
    const li = e.target.closest('li[data-id]');
    if (!li) return;
    const id = li.dataset.id;

    if (e.target.matches('.btn-toggle')) {
      Store.toggleStatus(id);
      renderList();
      toast('Status da reserva atualizado.');
    }

    if (e.target.matches('.btn-delete')) {
      if (!confirm('Tem certeza que deseja excluir esta reserva?')) return;
      Store.remove(id);
      renderList();
      toast('Reserva excluída.');
    }
  });

  renderList();
}

function renderList() {
  let reservas = Store.all();

  if (currentFilter === 'ativas') {
    reservas = reservas.filter(r => r.status === 'ativa');
  } else if (currentFilter === 'concluídas') {
    reservas = reservas.filter(r => r.status === 'concluída');
  }

  reservas.sort((a, b) => {
    const da = new Date(a.checkin);
    const db = new Date(b.checkin);
    if (currentSort === 'checkin-asc') {
      return da - db;
    }
    return db - da;
  });

  const ul = document.querySelector('#reserva-list ul');
  if (!ul) return;
  ul.innerHTML = reservas.map(r => renderItem(r)).join('');
}

function formatDate(str) {
  if (!str) return '';
  const d = new Date(str + 'T00:00:00');
  return d.toLocaleDateString('pt-BR');
}
