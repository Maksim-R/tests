// popups/reset/selectors.ts

export const resetSelectors = {
  // 1. Кнопка "Войти" в шапке, чтобы открыть попап логина
  loginButton: 'a.btn.header-log-in',

  // 2. В попапе логина кнопка "Забыли пароль?"
  forgotPasswordButton: 'button.forgot[data-open-popup="reset"]',

  // 3. Попап восстановления пароля
  popup: 'div.popup.form-popup.api-form.reset[data-popup-name="reset"]',

  // Заголовок "Восстановить пароль"
  title: 'div.popup.form-popup.api-form.reset span.neue-40-bold',

  // Описание под заголовком
  description: 'div.popup.form-popup.api-form.reset p.description',

  // Email
  emailLabel: 'form[action="/v2/account/password/reset"] label span.placeholder',
  emailInput: 'form[action="/v2/account/password/reset"] input[name="email"]',

  // Кнопка "Сбросить пароль"
  submitButton: 'form[action="/v2/account/password/reset"] button.btn.btn--gradient.text--dark-blue.large[type="submit"]',
  submitButtonText: 'form[action="/v2/account/password/reset"] button.btn.btn--gradient.text--dark-blue.large[type="submit"] .btn-text',

  // 4. Попап успешного восстановления
  successPopup: 'div.popup.success-popup[data-popup-name="success"]',
  successTitle: 'div.popup.success-popup[data-popup-name="success"] span.neue-32-bold.title[data-popup-title]',
  successText: 'div.popup.success-popup[data-popup-name="success"] p.text[data-popup-text]',
  successCloseButton: 'div.popup.success-popup[data-popup-name="success"] button.btn.btn--gradient.cta.large[data-popup-close]'
};
