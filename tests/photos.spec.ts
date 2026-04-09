import { test, expect } from '@playwright/test';

test.describe('Página de Fotos - Integridade de Dados', () => {
  test('deve exibir o título real do álbum vindo do servidor', async ({ page }) => {
    // 1. Ir para a listagem
    await page.goto('http://localhost:4200/albums');

    // 2. Pegar o título do primeiro álbum disponível
    const firstAlbumCard = page.locator('h2').first();
    const expectedTitle = (await firstAlbumCard.innerText()).trim();

    // 3. Clicar e navegar
    await page.locator('a:has-text("Show photos for")').first().click();

    // 4. Validação: O H1 deve mudar de "Carregando..." para o título esperado
    const header = page.locator('h1');

    // O Playwright é esperto: ele vai tentar essa asserção várias vezes
    // até o timeout, esperando a API responder e o Angular atualizar o Signal.
    await test.step('Esperar o título do álbum ser atualizado', async () => {
      await expect(header).toHaveText(expectedTitle, {
        ignoreCase: true,
        timeout: 10000,
      });
    });

    await test.step('Garantir que o título do álbum é o esperado', async () => {
      // 5. Garantir que as fotos também chegaram
      const photoCount = page.locator('img');
      const count = await photoCount.count();
      expect(count).toBeGreaterThan(0);
    });
  });
});
