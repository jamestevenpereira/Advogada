# EmailJS Setup Guide

Follow these steps to enable the automated email system for your contact form.

## 1. Create an Account
Go to [emailjs.com](https://www.emailjs.com/) and create a free account.

## 2. Add an Email Service
- Go to the **Email Services** tab.
- Click **Add New Service**.
- Select your preferred email provider (e.g., Gmail).
- Connect your account and take note of the **Service ID** (e.g., `service_abc123`).

## 3. Create an Email Template
- Go to the **Email Templates** tab.
- Click **Create New Template**.
- Customize the content. You can use these variables which are already sent by the app:
    - `{{firstName}}`: Customer's first name
    - `{{lastName}}`: Customer's last name
    - `{{email}}`: Customer's email
    - `{{phone}}`: Customer's phone number
    - `{{date}}`: Requested date
    - `{{time}}`: Requested time
    - `{{reason}}`: Message content
    - `{{site_name}}`: App name
- Save the template and take note of the **Template ID** (e.g., `template_xyz456`).

## 4. Get your Public Key
- Go to the **Account** section (usually in the sidebar).
- Find the **API Keys** tab.
- Copy your **Public Key** (e.g., `user_789...`).

## 5. Recommended Email Template
Copy and paste this into your EmailJS template for a professional look:

**Subject:**
`Novo Pedido de Consulta: {{firstName}} {{lastName}}`

**Content (HTML):**
```html
<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
    <h2 style="color: #78572b; border-bottom: 2px solid #78572b; padding-bottom: 10px;">Novo Pedido de Agendamento</h2>
    
    <p>Recebeu um novo pedido de consulta através do seu website.</p>
    
    <table style="width: 100%; border-collapse: collapse;">
        <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Cliente:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">{{firstName}} {{lastName}}</td>
        </tr>
        <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">{{email}}</td>
        </tr>
        <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Telefone:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">{{phone}}</td>
        </tr>
        <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Data:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">{{date}}</td>
        </tr>
        <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Hora:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">{{time}}</td>
        </tr>
    </table>
    
    <div style="margin-top: 20px; background: #f9f9f9; padding: 15px; border-radius: 5px;">
        <strong>Motivo da Consulta:</strong><br>
        {{reason}}
    </div>
    
    <p style="margin-top: 20px; font-size: 12px; color: #999; text-align: center;">
        Este e-mail foi enviado automaticamente por <strong>{{site_name}}</strong>
    </p>
</div>
```

## 6. Update the App
Once you have these three IDs, provide them to me and I will update your `EmailService.ts` file automatically!

> [!TIP]
> The free plan allows up to 200 emails per month, perfect for starting!
