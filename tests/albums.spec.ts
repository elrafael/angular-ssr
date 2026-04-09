import { test, expect } from '@playwright/test';

test.describe('Página de Álbuns', () => {
  test('deve carregar a lista de álbuns e navegar para os detalhes', async ({ page }) => {
    // 1. Vai para a página (o SSR já entrega o HTML aqui)
    await page.goto('http://localhost:4200/albums');

    // 2. Verifica se o título principal está lá
    await expect(page.getByRole('heading', { name: 'Albums', level: 1 })).toBeVisible();

    // 3. Valida se o @defer funcionou
    // Vamos procurar pelo texto "fotos" que está dentro do loop @for
    const firstAlbumBadge = page.locator('span:has-text("fotos")').first();

    // O Playwright vai esperar o placeholder sumir e o conteúdo aparecer automaticamente
    await expect(firstAlbumBadge).toBeVisible({ timeout: 10000 });

    // 4. Testando a navegação que você definiu no [routerLink]
    const firstAlbumLink = page.locator('a:has-text("Show photos for")').first();
    await firstAlbumLink.click();

    // 5. Verifica se a URL mudou corretamente (ex: /albums/1)
    await expect(page).toHaveURL(/\/albums\/\d+/);
  });

  test('deve mostrar erro quando a API falhar', async ({ page }) => {
    // Intercepta a chamada para o seu proxy do server.ts
    await page.route('/api/albums', (route) =>
      route.fulfill({
        status: 500,
        body: JSON.stringify({ error: 'Failed to fetch albums' }),
      }),
    );

    await page.goto('http://localhost:4200/albums');

    // Aqui você verificaria se sua UI mostra um Toast ou mensagem de erro
    // (Algo que você ainda pode implementar no seu projeto!)
  });

  test('SSR: deve conter o título no HTML inicial para SEO', async ({ request }) => {
    // Faz uma requisição direta sem processar JS para simular um Crawler de busca
    const response = await request.get('http://localhost:4200/albums');
    const text = await response.text();

    // Verifica se o título já veio renderizado no servidor
    expect(text).toContain('Explore the images collection');
  });
});
