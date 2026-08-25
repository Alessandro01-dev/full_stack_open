const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

const BACKEND_URL = 'http://localhost:3003/api'

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post(`${BACKEND_URL}/testing/reset`)
    await request.post(`${BACKEND_URL}/users`, {
      data: { name: 'Test User', username: 'testuser', password: 'password' }
    })
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await page.goto('/login')
    await expect(page.getByRole('heading', { name: 'Log in to application' })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'testuser', 'password')
      await expect(page.getByRole('button', { name: 'logout' })).toBeVisible()
      await expect(page.getByRole('heading', { name: /blogs/i })).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'testuser', 'wrongpassword')
      await expect(page.getByText('wrong username or password')).toBeVisible()
      await expect(page.getByRole('button', { name: 'logout' })).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'testuser', 'password')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'First E2E Blog', 'Author One', 'http://test.com')
      await expect(page.getByRole('link', { name: 'First E2E Blog Author One' })).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      const title = 'Blog to be liked'
      await createBlog(page, title, 'Author Two', 'http://test.com')

      await page.getByRole('link', { name: `${title} Author Two` }).click()

      await page.waitForURL('**/blogs/**')

      await expect(page.getByText('0 likes')).toBeVisible()
      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByText('1 likes')).toBeVisible()
    })

    test('a blog can be deleted by the creator', async ({ page }) => {
      const title = 'Blog to be deleted'
      await createBlog(page, title, 'Author Three', 'http://test.com')

      await page.getByRole('link', { name: `${title} Author Three` }).click()

      const removeButton = page.getByRole('button', { name: 'remove' })
      await expect(removeButton).toBeVisible()

      page.on('dialog', dialog => dialog.accept())
      await removeButton.click()

      await expect(page.getByRole('link', { name: `${title} Author Three` })).not.toBeVisible()
    })

    test('only the creator can see the delete button', async ({ page, request }) => {
      await createBlog(page, 'Creator Only Blog', 'Author Four', 'http://test.com')
      await page.getByRole('button', { name: 'logout' }).click()

      await request.post(`${BACKEND_URL}/users`, {
        data: { name: 'Second User', username: 'seconduser', password: 'password' }
      })

      await loginWith(page, 'seconduser', 'password')

      await page.getByRole('link', { name: 'Creator Only Blog Author Four' }).click()

      await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
    })
  })
})