import { expect } from '@playwright/test';

export async function freshPostShiftSave(page, name = 'QA Tester') {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.goto('/?panel=new');
  await page.getByLabel('Nome do Analista').fill(name);
  await page.getByLabel('Só pós-expediente').check();
  await page.getByRole('button', { name: /INICIAR PÓS-EXPEDIENTE/i }).click();
  await expect(page).toHaveURL(/\/conversa/);
  await expect(page.getByText(/Noite 1/i).first()).toBeVisible();
}

export async function selectQaCharacter(page, label) {
  await page.goto('/qa/social');
  const option = page.locator('select option').filter({ hasText: label }).first();
  const value = await option.getAttribute('value');
  if (!value) throw new Error(`Personagem de QA nao encontrado: ${label}`);
  await page.locator('select').selectOption(value);
}

export async function prepareStageAndOpen(page, characterLabel, stage) {
  await selectQaCharacter(page, characterLabel);
  await page.getByRole('button', { name: `D${stage} + abrir`, exact: true }).click();
  await expect(page).toHaveURL(/\/conversa/);
  await expect(page.getByText(characterLabel, { exact: true }).first()).toBeVisible();
}

export async function completeCurrentChatUntilOuting(page) {
  for (let guard = 0; guard < 30; guard += 1) {
    const outing = page.getByRole('button', { name: /IR PARA ENCONTRO|CONTINUAR ENCONTRO/i });
    if (await outing.isVisible().catch(() => false)) return outing;

    const sendIntro = page.getByRole('button', { name: 'Enviar mensagem' });
    const replyButtons = page.locator('.nexoReplySuggestions button:not([disabled])');
    const replyCount = await replyButtons.count();

    if (replyCount > 0) {
      await replyButtons.first().click();
      await sendIntro.click();
    } else if (await sendIntro.isVisible().catch(() => false) && await sendIntro.isEnabled().catch(() => false)) {
      await sendIntro.click();
    } else {
      await page.waitForTimeout(700);
    }
  }
  throw new Error('Chat nao chegou ao CTA de encontro apos 30 ciclos; possivel hardlock de conversa.');
}

export async function readDateToEnd(page) {
  const start = page.getByRole('button', { name: /Começar Date|Rever cena/i });
  if (await start.isVisible().catch(() => false)) await start.click();
  for (let guard = 0; guard < 80; guard += 1) {
    const next = page.locator('.outingContinue');
    await expect(next).toBeVisible();
    const label = (await next.innerText()).trim();
    await next.click();
    if (/Voltar ao NEXO|Encerrar replay/i.test(label)) return;
  }
  throw new Error('Date ultrapassou 80 paginas sem encerrar; possivel hardlock do leitor.');
}

export async function storedSave(page) {
  return page.evaluate(() => JSON.parse(localStorage.getItem('ressonancia.save') || 'null'));
}
