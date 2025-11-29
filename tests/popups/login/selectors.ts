export const loginSelectors = {
  // Кнопка "Войти" в шапке
  openLoginButton: 'a.btn.header-log-in',

  // Корневой попап логина
  popup: 'div.popup.form-popup.api-form[data-popup-name="signin"]',

  // Заголовок "Вход"
  title: 'div.popup.form-popup.api-form[data-popup-name="signin"] span.neue-40-bold.title',

  // Email
  emailLabel: 'div.popup.form-popup.api-form[data-popup-name="signin"] form[action="/v2/account/signIn"] label:nth-of-type(1) span.placeholder',
  emailInput: 'div.popup.form-popup.api-form[data-popup-name="signin"] form[action="/v2/account/signIn"] input[name="email"]',

  // Пароль
  passwordLabel: 'div.popup.form-popup.api-form[data-popup-name="signin"] form[action="/v2/account/signIn"] label:nth-of-type(2) span.placeholder',
  passwordInput: 'div.popup.form-popup.api-form[data-popup-name="signin"] form[action="/v2/account/signIn"] input[name="password"]',

  // "Забыли пароль?"
  forgotPasswordButton: 'div.popup.form-popup.api-form[data-popup-name="signin"] button.forgot',

  // Низ попапа: "Нет учетной записи?"
  noAccountText: 'div.popup.form-popup.api-form[data-popup-name="signin"] .cta-bottom p.neue-14',

  // Кнопка "Зарегистрироваться"
  signUpButton: 'div.popup.form-popup.api-form[data-popup-name="signin"] .cta-bottom button[data-open-popup="signup"]',

  // Кнопка "Войти" (submit)
  submitButton: 'div.popup.form-popup.api-form[data-popup-name="signin"] button.btn.btn--gradient.text--dark-blue.large[type="submit"]',
  submitButtonText: 'div.popup.form-popup.api-form[data-popup-name="signin"] button.btn.btn--gradient.text--dark-blue.large[type="submit"] .btn-text',

  // Признак успешного логина — кнопка Sign out
  logoutButton: 'button.btn.btn--icon.logout',
};
