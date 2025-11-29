import type { Page } from '@playwright/test';

export type Lang = 'RU' | 'EN' | 'DE' | 'ES' | 'FR' | 'IT' | 'UA' | 'CN';

// data-code в верстке: EN, DE, ES, FR, IT, RU, UA, CN
const langCodeMap: Record<Lang, string> = {
  RU: 'RU',
  EN: 'EN',
  DE: 'DE',
  ES: 'ES',
  FR: 'FR',
  IT: 'IT',
  UA: 'UA',
  CN: 'CN',
};

export async function switchLanguage(page: Page, lang: Lang): Promise<void> {
  const langCode = langCodeMap[lang];

  // 1. Кнопка выбора языка в шапке
  const langButton = page
    .locator('header button.langs-wrapper-lang[data-show-langs]')
    .first();

  await langButton.click();

  // 2. Ждём, пока dropdown языков появится
  const dropdown = page
    .locator('header nav.langs-wrapper-dropdown[data-langs-dropdown]')
    .first();

  await dropdown.waitFor({ state: 'visible' });

  // 3. Пункт языка по data-code
  const langOption = dropdown
    .locator(`a.link[data-code="${langCode}"]`)
    .first();

  // 4. Кликаем, НО НЕ ЖДЁМ навигацию (noWaitAfter!)
  await langOption.click({ noWaitAfter: true });

  // Всё. Дальше любые locator/expect сами подождут нужное состояние.
}
