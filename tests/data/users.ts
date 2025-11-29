// tests/data/users.ts

// Тестовые пользователи.
// Пока используем только невалидного для проверки ошибки логина.
// Сюда же позже можно добавить валидных юзеров.
export const TestUsers = {
  valid: {
    email: 'valid@example.com',
    password: 'ValidPassword123',
  },

  invalid: {
    email: 'wrong@example.com',
    password: 'wrong-pass',
  },
};
