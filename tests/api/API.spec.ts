import { expect, test } from '@playwright/test';

test.describe('', () => {

    test.beforeEach(async ({ request }) => {

    })

    test('test mock api', async ({ request }) => {
        const res = await request.get('products');
        console.log(res.url());
        await expect(res).toBeOK();
        await expect(res.status()).toBe(200);
    });
});