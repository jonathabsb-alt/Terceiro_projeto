const KEY = 'painel-hospedagem-reservas';

export const Store = {
  all() {
    try {
      return JSON.parse(localStorage.getItem(KEY)) ?? [];
    } catch {
      return [];
    }
  },

  save(list) {
    localStorage.setItem(KEY, JSON.stringify(list));
  },

  add(reserva) {
    const list = Store.all();
    list.push(reserva);
    Store.save(list);
  },

  remove(id) {
    Store.save(Store.all().filter(r => r.id !== id));
  },

  toggleStatus(id) {
    const list = Store.all().map(r =>
      r.id === id
        ? { ...r, status: r.status === 'concluída' ? 'ativa' : 'concluída' }
        : r
    );
    Store.save(list);
  }
};
