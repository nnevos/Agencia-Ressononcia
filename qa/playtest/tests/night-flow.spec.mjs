import { test, expect } from '@playwright/test';
import { freshPostShiftSave, storedSave } from './helpers.mjs';

test('modo so pos-expediente avanca Noites 1-7 sem softlock', async ({ page }) => {
  await freshPostShiftSave(page, 'QA Noites');
  for (let expectedDay = 1; expectedDay <= 7; expectedDay += 1) {
    const save = await storedSave(page);
    expect(save.player.currentDay).toBe(expectedDay);
    expect(save.flags).toContain('mode:post-shift-only');
    if (expectedDay === 7) break;

    const nextNight = page.getByRole('button', { name: 'PRÓXIMA NOITE' }).first();
    await expect(nextNight).toBeVisible();
    await nextNight.click();
    await expect(page.getByRole('heading', { name: 'Deseja ir para o próximo dia?' })).toBeVisible();
    await page.getByRole('button', { name: 'Ir para próximo dia' }).click();
    await expect(page.getByText(new RegExp(`Noite ${expectedDay + 1}`)).first()).toBeVisible();
    await page.reload();
    const reloaded = await storedSave(page);
    expect(reloaded.player.currentDay).toBe(expectedDay + 1);
  }
});

test('guards do modo pos-expediente impedem entrar no expediente', async ({ page }) => {
  await freshPostShiftSave(page, 'QA Guards');
  for (const route of ['/agencia', '/introducao', '/desenvolvimento']) {
    await page.goto(route);
    await expect(page).toHaveURL(/\/conversa/);
  }
});
