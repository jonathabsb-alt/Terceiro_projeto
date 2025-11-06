export class FormValidator {
  constructor(form) {
    this.form = form;
    this.fields = Array.from(form.querySelectorAll('[data-validate]'));
    form.setAttribute('novalidate', '');
    form.addEventListener('submit', (e) => {
      if (!this.validate()) {
        e.preventDefault();
      }
    });
    this.fields.forEach(f =>
      f.addEventListener('input', () => this.validateField(f))
    );
  }

  validate() {
    let ok = true;
    this.fields.forEach(f => {
      if (!this.validateField(f)) ok = false;
    });
    return ok;
  }

  validateField(field) {
    const rules = (field.dataset.validate || '').split('|').filter(Boolean);
    const value = field.value.trim();
    let message = '';

    for (const rule of rules) {
      if (rule === 'required' && !value) {
        message = 'Campo obrigatório.';
        break;
      }
      if (rule.startsWith('min:')) {
        const n = Number(rule.split(':')[1]);
        if (value.length < n) {
          message = `Mínimo de ${n} caracteres.`;
          break;
        }
      }
    }

    this.setError(field, message);
    return !message;
  }

  setError(field, message) {
    let holder = field.nextElementSibling;
    if (!holder || !holder.classList.contains('form-error')) {
      holder = document.createElement('div');
      holder.className = 'form-error';
      field.insertAdjacentElement('afterend', holder);
    }
    holder.textContent = message;
    field.classList.toggle('input-invalid', Boolean(message));
  }
}
