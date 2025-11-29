import { test, expect } from '@playwright/test';
import { signupSelectors } from './selectors';
import { switchLanguage, type Lang } from '../common/language';
import type { Locator } from '@playwright/test';
import { waitForVisible } from '../../helpers/waitFor';
test.describe.configure({ timeout: 120_000 });


import { ru } from './translations/ru';
import { en } from './translations/en';
import { de } from './translations/de';
import { es } from './translations/es';
import { fr } from './translations/fr';
import { it } from './translations/it';
import { ua } from './translations/ua';
import { cn } from './translations/cn';
import type { SignUpPopupTranslations } from './translations/types';

const translations: Record<Lang, SignUpPopupTranslations> = {
  RU: ru,
  EN: en,
  DE: de,
  ES: es,
  FR: fr,
  IT: it,
  UA: ua,
  CN: cn,
};

// Генерация валидного email: prefix + timestamp + "@test.net"
function buildValidEmail(prefix: string): string {
  return `${prefix}${Date.now()}@test.net`;
}

test.describe('Signup popup I18N', () => {
  const languages: Lang[] = ['RU', 'EN', 'DE', 'ES', 'FR', 'IT', 'UA', 'CN'];

  for (const lang of languages) {
    test(`Тексты и успешная регистрация (${lang})`, async ({ page }) => {
      const t = translations[lang];

      // Открываем сайт и включаем нужный язык через дропдаун
      await page.goto('https://green.trade-with.me/');
      await switchLanguage(page, lang);

      // Открываем попап регистрации
      await page.locator(signupSelectors.startSignupButton).first().click();

      // Ждём появления попапа регистрации
      const popup = page.locator(signupSelectors.popup);
      await popup.waitFor({ state: 'visible' });

      // ---------- МЯГКИЕ ПРОВЕРКИ ТЕКСТОВ В ПОПАПЕ РЕГИСТРАЦИИ ----------

      // Регистрация
      await expect.soft(popup.locator(signupSelectors.title))
        .toHaveText(t.title);

      // Email
      await expect.soft(popup.locator(signupSelectors.emailLabel))
        .toHaveText(t.emailLabel);
      
      // Поле Email
      await expect.soft(popup.locator(signupSelectors.emailInput))
        .toHaveAttribute('placeholder', t.emailPlaceholder);

      // Чекбокс маркетинга 
      await expect.soft(popup.locator(signupSelectors.marketingText))
        .toHaveText(t.marketing);

      // Чекбокс agree (обязательный)
      await expect.soft(popup.locator(signupSelectors.agreeText))
        .toContainText(t.agree);
      
      // Кнопка Зарегистрироваться
      const submitBtnText = page.locator(signupSelectors.submitButtonText);

      // сначала ждём появления
      await waitForVisible(submitBtnText);

      // потом мягкая проверка
      await expect.soft(submitBtnText).toHaveText(t.submit);

      // Низ попапа: "Уже есть учётная запись?" 
      await expect.soft(popup.locator(signupSelectors.alreadyText))
        .toHaveText(t.already);

      // Низ попапа: "Войти"
      await expect.soft(popup.locator(signupSelectors.signInButton))
        .toHaveText(t.signIn);

      // ---------- ПОВЕДЕНИЕ: ВАЛИДНЫЙ EMAIL + CHECKBOX AGREE ----------

      const email = buildValidEmail(`signup-${lang.toLowerCase()}`);
      // Сгенерированный Email заполняем поле
      await popup.locator(signupSelectors.emailInput).fill(email);
      // Клик по Чекбокс agree (обязательный)
      await popup.locator(signupSelectors.agreeText).check();

      // Кнопка "Зарегистрироваться" должна активироваться
      //await expect(popup.locator(signupSelectors.submitButton)).toBeEnabled();

      // Ждём, пока попап регистрации станет видимым
      await page.locator(signupSelectors.popup).waitFor({ state: 'visible' });

      // Локатор кнопки "Зарегистрироваться"
      const submitButton = page.locator(signupSelectors.submitButton);

      // Ждём, пока она появится
      await submitButton.waitFor({ state: 'visible', timeout: 10_000 });

      // Проверяем, что стала активной
      await expect(submitButton).toBeEnabled({ timeout: 10_000 });

      // Кликаем по кнопке
      await submitButton.click();
      
      // Отправляем форму
      await popup.locator(signupSelectors.submitButton).click();

      // ---------- ПОПАП "СПАСИБО ЗА РЕГИСТРАЦИЮ" ----------

      // Ждём, пока попап регистрации станет видимым
      await page.locator(signupSelectors.successTitle).waitFor({ state: 'visible' });
      
      const success = page.locator(signupSelectors.successTitle);
      await expect(success).toBeVisible();

      await expect.soft(success.locator(signupSelectors.successTitle))
        .toHaveText(t.successTitle);

      await expect.soft(success.locator(signupSelectors.successText))
        .toHaveText(t.successText);

      await expect.soft(success.locator(signupSelectors.successCloseButton))
        .toHaveText(t.successClose);
    });
  }
});
