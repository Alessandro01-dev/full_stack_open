const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

const BACKEND_URL = 'http://localhost:3003/api'

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post(`${BACKEND_URL}/testing/reset`)

    await request.post(`${BACKEND_URL}/users`, {
      data: {
        name: 'Test User',
        username: 'testuser',
        password: 'password'
      }
    })
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('log in to application')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'testuser', 'password')
      await expect(page.getByText('Test User logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'testuser', 'wrongpassword')
      await expect(page.getByText('wrong username or password')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'testuser', 'password')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'First E2E Blog', 'Author One', 'http://test.com')
      await expect(page.getByText('First E2E Blog Author One')).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      const title = 'Blog to be liked'
      await createBlog(page, title, 'Author Two', 'http://test.com')

      const blogContainer = page.locator('.blog').filter({ hasText: title })
      await blogContainer.getByRole('button', { name: 'view' }).click()

      await expect(blogContainer.getByText('likes 0')).toBeVisible()
      await blogContainer.getByRole('button', { name: 'like' }).click()
      await expect(blogContainer.getByText('likes 1')).toBeVisible()
    })

    test('a blog can be deleted by the creator', async ({ page }) => {
      const title = 'Blog to be deleted'
      await createBlog(page, title, 'Author Three', 'http://test.com')

      const blogContainer = page.locator('.blog').filter({ hasText: title })
      await blogContainer.getByRole('button', { name: 'view' }).click()

      const removeButton = blogContainer.getByRole('button', { name: 'remove' })
      await expect(removeButton).toBeVisible()

      page.on('dialog', dialog => dialog.accept())
      await removeButton.click()

      await expect(page.locator('.blog').filter({ hasText: title })).not.toBeVisible()
    })

    test('only the creator can see the delete button', async ({ page, request }) => {
      await createBlog(page, 'Creator Only Blog', 'Author Four', 'http://test.com')
      await page.getByRole('button', { name: 'logout' }).click()

      await request.post(`${BACKEND_URL}/users`, {
        data: {
          name: 'Second User',
          username: 'seconduser',
          password: 'password'
        }
      })

      await loginWith(page, 'seconduser', 'password')

      const blogContainer = page.locator('.blog').filter({ hasText: 'Creator Only Blog' })
      await blogContainer.getByRole('button', { name: 'view' }).click()

      const removeButton = blogContainer.getByRole('button', { name: 'remove' })
      await expect(removeButton).not.toBeVisible()
    })

    test('blogs are ordered according to likes', async ({ page }) => {
      await createBlog(page, 'Second best', 'Author A', 'http://test.com')
      await createBlog(page, 'The winner', 'Author B', 'http://test.com')

      const winnerBlog = page.locator('.blog').filter({ hasText: 'The winner' })
      await winnerBlog.getByRole('button', { name: 'view' }).click()

      await winnerBlog.getByRole('button', { name: 'like' }).click()
      await expect(winnerBlog.getByText('likes 1')).toBeVisible()

      const blogLocators = page.locator('.blog')

      await expect(blogLocators.nth(0)).toContainText('The winner')
      await expect(blogLocators.nth(1)).toContainText('Second best')
    })
  })
})