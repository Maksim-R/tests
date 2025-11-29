// popups/signup/selectors.ts

export const signupSelectors = {
  // Кнопка "Начать бесплатно" (берём первую на странице)
  startSignupButton: 'a[href="#form-signup"]',
  
  // Основной попап регистрации
  popup: '[data-popup-name="signup"]',

  // Внутри попапа регистрации
  title: 'span.neue-40-bold.title',

  // Email
  emailLabel: 'form[action="/v2/customers/signUp"] label span.placeholder',
  emailInput: 'form[action="/v2/customers/signUp"] input[name="email"]',

  // Чекбокс маркетинга
  marketingCheckbox: 'form[action="/v2/customers/signUp"] input[type="checkbox"][name="isAcceptedMarketing"]',
  marketingText: 'form[action="/v2/customers/signUp"] input[name="isAcceptedMarketing"] + span',

  // Чекбокс agree (обязательный)
  agreeCheckbox: 'form[action="/v2/customers/signUp"] input[type="checkbox"][name="agree"]',
  agreeText: 'form[action="/v2/customers/signUp"] input[name="agree"] + span',

  // Кнопка "Зарегистрироваться"
  submitButton: '[data-popup-name="signup"] button[type="submit"]',
  submitButtonText: '[data-popup-name="signup"] button[type="submit"] .btn-text',

  // Низ попапа: "Уже есть учётная запись?" и "Войти"
  alreadyText: 'form[action="/v2/customers/signUp"] .cta-bottom p.neue-14',
  signInButton: 'form[action="/v2/customers/signUp"] .cta-bottom button[aria-label="Войти"]',

  // Попап успешной регистрации
  successPopup: 'div.popup.success-popup[data-popup-name="success"]',
  successTitle: 'div.popup.success-popup[data-popup-name="success"] span.neue-32-bold.title[data-popup-title]',
  successText: 'div.popup.success-popup[data-popup-name="success"] p.text[data-popup-text]',
  successCloseButton: 'div.popup.success-popup[data-popup-name="success"] button.btn.btn--gradient.cta.large[data-popup-close]'
};
