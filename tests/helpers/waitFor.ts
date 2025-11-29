import type { Locator } from '@playwright/test';

export async function waitForVisible(locator: Locator, timeout = 10_000) {
  await locator.waitFor({ state: 'visible', timeout });
}
