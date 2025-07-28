# Contact Form App – Cypress Testing Guide

Proyek ini merupakan aplikasi Laravel sederhana dengan form kontak.  
Repositori ini menyertakan pengujian otomatis menggunakan **Cypress**.

## 📦 Instalasi Cypress

1. Pastikan Node.js sudah terinstal  
   Cek dengan:  
   ```bash
   node -v
   npm -v
   ```

2. Install Cypress melalui npm:
   ```bash
   npm install --save-dev cypress
   ```

3. Buka Cypress GUI (opsional, untuk eksplorasi interaktif):
   ```bash
   npx cypress open
   ```

4. Atau jalankan Cypress langsung di terminal (headless mode):
   ```bash
   npx cypress run
   ```

## 📁 Struktur Direktori

Setelah Cypress diinstal, struktur direktori akan seperti ini:

```
cypress/
├── e2e/
│   ├── api
│   │    └── contact_form_api.cy.js
│   └── contact_form.cy.js  ← Tempat menulis skenario test
├── support/
│   └── e2e.js
cypress.config.js           ← Konfigurasi Cypress
```

## ✍️ Contoh Test: `contact_form.cy.js`

```js
describe('Contact Form', () => {
  it('should show validation error on invalid email', () => {
    cy.visit('/contact')

    cy.get('input[name="name"]').type('Ahmad')
    cy.get('input[name="email"]').type('ahmad.com') // salah format
    cy.get('textarea[name="message"]').type('Ini pesan test.')

    cy.get('form').submit()

    cy.contains('The email must be a valid email address.').should('exist')
  })

  it('should submit the form successfully with valid data', () => {
    cy.visit('/contact')

    cy.get('input[name="name"]').type('Ahmad')
    cy.get('input[name="email"]').type('ahmad@mail.com')
    cy.get('textarea[name="message"]').type('Ini pesan test.')

    cy.get('form').submit()

    cy.contains('Your message has been sent successfully.').should('exist')
  })
})
```

---

## 🔧 API Endpoint for Testing

The API under test:

```
POST /api/contact
```

**Payload:**
```json
{
  "name": "Ahmad",
  "email": "ahmad@example.com",
  "message": "This is a test message."
}
```

---

## ✍️ Example API Test: `contact_api.cy.js`

```js
describe('Contact API', () => {
  const endpoint = '/api/contact'

  it('should submit valid contact data', () => {
    cy.request({
      method: 'POST',
      url: endpoint,
      body: {
        name: 'Ahmad',
        email: 'ahmad@example.com',
        message: 'This is a test message.'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('success', true)
    })
  })

  it('should fail with invalid email', () => {
    cy.request({
      method: 'POST',
      url: endpoint,
      body: {
        name: 'Ahmad',
        email: 'invalid-email',
        message: 'Test'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(422)
      expect(response.body).to.have.property('errors')
    })
  })
})
```

## 🧪 Tips untuk Testing Laravel Backend

- Gunakan environment `.env.testing` untuk mengarahkan ke database testing.
- Anda bisa menambahkan endpoint khusus testing untuk menghapus data dummy, seperti:

```php
// routes/web.php
if (app()->environment('testing')) {
    Route::post('/test/clear-contact', function () {
        \DB::table('contacts')->truncate();
        return response()->json(['cleared' => true]);
    });
}
```

Lalu, panggil di test:
```js
beforeEach(() => {
  cy.request('POST', '/test/clear-contact')
})
```

## ✅ Referensi

- [Cypress Docs](https://docs.cypress.io)
- [Laravel Testing Docs](https://laravel.com/docs/testing)
