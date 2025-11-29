import { test, expect } from '@playwright/test';
import { loginSelectors } from './selectors';
import { switchLanguage, type Lang } from '../common/language';

import { ru } from './translations/ru';
import { en } from './translations/en';
import { de } from './translations/de';
import { es } from './translations/es';
import { fr } from './translations/fr';
import { it } from './translations/it';
import { ua } from './translations/ua';
import { cn } from './translations/cn';
import type { LoginPopupTranslations } from './translations/types';

const translations: Record<Lang, LoginPopupTranslations> = {
  RU: ru,
  EN: en,
  DE: de,
  ES: es,
  FR: fr,
  IT: it,
  UA: ua,
  CN: cn,
};

test.describe('Login popup I18N', () => {
  const languages: Lang[] = ['RU', 'EN', 'DE', 'ES', 'FR', 'IT', 'UA', 'CN'];

  for (const lang of languages) {
    test(`Тексты попапа логина (${lang})`, async ({ page }) => {
      const t = translations[lang];

      await page.goto('/');
      await switchLanguage(page, lang);

      // Открываем попап логина
      await page.locator(loginSelectors.openLoginButton).click();

      const popup = page.locator(loginSelectors.popup);
      await expect(popup).toBeVisible();

      await expect(popup.locator(loginSelectors.title)).ЭtoHaveText(t.title);

      await expect(popup.locator(loginSelectors.emailLabel)).toHaveText(t.emailLabel);
      await expect(popup.locator(loginSelectors.emailInput))
        .toHaveAttribute('placeholder', t.emailPlaceholder);

      await expect(popup.locator(loginSelectors.passwordLabel)).toHaveText(t.passwordLabel);
      await expect(popup.locator(loginSelectors.passwordInput))
        .toHaveAttribute('placeholder', t.passwordPlaceholder);

      await expect(popup.locator(loginSelectors.forgotPasswordButton)).toHaveText(t.forgotPassword);

      await expect(popup.locator(loginSelectors.noAccountText)).toHaveText(t.noAccount);
      await expect(popup.locator(loginSelectors.signUpButton)).toHaveText(t.signUp);

      await expect(popup.locator(loginSelectors.submitButtonText)).toHaveText(t.submit);
    });
  }
});
