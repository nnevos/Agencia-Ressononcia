import { test, expect } from '@playwright/test';
import { freshPostShiftSave, prepareStageAndOpen, completeCurrentChatUntilOuting, readDateToEnd, storedSave } from './helpers.mjs';

test.describe.serial('Date gate e continuidade', () => {
  test.beforeEach(async ({ page }) => {
    await freshPostShiftSave(page);
  });

  test('D3: CTA explicito abre Date; reload preserva; URL manual sem launch e bloqueada', async ({ page }) => {
    await prepareStageAndOpen(page, 'Hélio', 3);
    const outing = await completeCurrentChatUntilOuting(page);
    await expect(outing).toHaveText(/IR PARA ENCONTRO/i);
    await outing.click();
    await expect(page).toHaveURL(/\/encontro\/outing-day3-helio\?launch=1/);
    await expect(page.getByText('CENA PRESENCIAL').first()).toBeVisible();

    await page.reload();
    await expect(page).toHaveURL(/launch=1/);
    await expect(page.getByRole('button', { name: /Começar Date/i })).toBeVisible();

    await page.goto('/encontro/outing-day3-helio');
    await expect(page).toHaveURL(/\/conversa/);
  });

  test('D3: sair sem concluir nao avanca rota; reentrada continua disponivel', async ({ page }) => {
    await prepareStageAndOpen(page, 'Hélio', 3);
    const outing = await completeCurrentChatUntilOuting(page);
    await outing.click();
    await page.getByRole('button', { name: /Começar Date/i }).click();
    await page.getByRole('button', { name: /Voltar ao NEXO/i }).first().click();
    await expect(page).toHaveURL(/\/conversa/);

    const before = await storedSave(page);
    expect(before.social.outingMilestones.helio).not.toContain(3);
    expect(before.social.routeStage.helio).toBe(3);

    await page.getByText('Hélio', { exact: true }).first().click();
    await expect(page.getByRole('button', { name: /CONTINUAR ENCONTRO|IR PARA ENCONTRO/i })).toBeVisible();
  });

  test('D3: concluir Date grava milestone uma unica vez e avanca rota', async ({ page }) => {
    await prepareStageAndOpen(page, 'Hélio', 3);
    const outing = await completeCurrentChatUntilOuting(page);
    await outing.click();
    await readDateToEnd(page);
    await expect(page).toHaveURL(/\/conversa/);

    const save = await storedSave(page);
    expect(save.social.outingMilestones.helio.filter((x) => x === 3)).toHaveLength(1);
    expect(save.social.routeStage.helio).toBeGreaterThanOrEqual(4);
  });

  test('replay e QA preview sao read-only', async ({ page }) => {
    const before = await storedSave(page);
    await page.goto('/encontro/outing-day3-helio?qa=1');
    await readDateToEnd(page);
    const afterQa = await storedSave(page);
    expect(afterQa.social.routeStage.helio).toBe(before.social.routeStage.helio);
    expect(afterQa.social.outingMilestones.helio).toEqual(before.social.outingMilestones.helio);

    await page.goto('/encontro/outing-day3-helio?replay=1');
    await readDateToEnd(page);
    const afterReplay = await storedSave(page);
    expect(afterReplay.social.routeStage.helio).toBe(before.social.routeStage.helio);
    expect(afterReplay.social.outingMilestones.helio).toEqual(before.social.outingMilestones.helio);
  });
});
