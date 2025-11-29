import { test, expect } from '@playwright/test';
import { resetSelectors } from './selectors';

import { ru } from './translations/ru';
import { en } from './translations/en';
import { de } from './translations/de';
import { es } from './translations/es';
import { fr } from './translations/fr';
import { it } from './translations/it';
import { ua } from './translations/ua';
import { cn } from './translations/cn';

import type { ResetPopupTranslations } from './translations/types';

type Lang = 'RU' | 'EN' | 'DE' | 'ES' | 'FR' | 'IT' | 'UA' | 'CN';

const translations: Record<Lang, ResetPopupTranslations> = {
  RU: ru,
  EN: en,
  DE: de,
  ES: es,
  FR: fr,
  IT: it,
  UA: ua,
  CN: cn
};

// Генерация валидного email (как ты просил: text + "@test.net")
function buildValidEmail(prefix: string): string {
  return `${prefix}+${Date.now()}@test.net`;
}

test.describe('Reset password popup I18N', () => {
  const languages: Lang[] = ['RU', 'EN', 'DE', 'ES', 'FR', 'IT', 'UA', 'CN'];

  for (const lang of languages) {
    test(`Тексты и успешный сценарий reset (${lang})`, async ({ page }) => {
      const t = translations[lang];

      // TODO: поставь свой URL и способ выбора локали
      await page.goto(`/?lang=${lang.toLowerCase()}`);

      // 1. Клик по кнопке "Войти" в шапке
      await page.locator(resetSelectors.loginButton).click();

      // 2. В попапе логина — клик по "Забыли пароль?"
      await page.locator(resetSelectors.forgotPasswordButton).click();

      // 3. Ожидаем появления попапа восстановления
      const popup = page.locator(resetSelectors.popup);
      await expect(popup).toBeVisible();

      // --- Проверка текстов по ТЗ ---

      await expect(popup.locator(resetSelectors.title)).toHaveText(t.title);
      await expect(popup.locator(resetSelectors.description)).toHaveText(t.description);

      await expect(popup.locator(resetSelectors.emailLabel)).toHaveText(t.emailLabel);
      await expect(popup.locator(resetSelectors.emailInput))
        .toHaveAttribute('placeholder', t.emailPlaceholder);

      await expect(popup.locator(resetSelectors.submitButtonText)).toHaveText(t.submit);

      // --- Поведение: валидный email → кнопка активна → success-попап ---

      const email = buildValidEmail(`reset-${lang.toLowerCase()}`);
      await popup.locator(resetSelectors.emailInput).fill(email);

      // Кнопка "Сбросить пароль" должна стать enabled
      await expect(popup.locator(resetSelectors.submitButton)).toBeEnabled();

      // Клик по кнопке
      await popup.locator(resetSelectors.submitButton).click();

      // --- Попап успешного восстановления ---
      const success = page.locator(resetSelectors.successPopup);
      await expect(success).toBeVisible();

      await expect(success.locator(resetSelectors.successTitle)).toHaveText(t.successTitle);
      await expect(success.locator(resetSelectors.successText)).toHaveText(t.successText);
      await expect(success.locator(resetSelectors.successCloseButton)).toHaveText(t.successClose);
    });
  }
});
