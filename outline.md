# Programmatic Email: Getting Started with Twilio SendGrid Outline

This outline provides a step-by-step breakdown of the code as it was built during the workshop. This file is meant for reference. To see the app in its final state, see the [cakeOrPie directory](cakeOrPie). For a copy of the entire HTML email template, see the [emailTemplate directory](emailTemplate).

## Prerequisites

1. [Sign up for a SendGrid account](https://signup.sendgrid.com/)
2. [Create and store an API key](https://sendgrid.com/docs/ui/account-and-settings/api-keys/)
3. [Verify a single sender](https://sendgrid.com/docs/ui/sending-email/sender-verification)

### Send a basic email

**sender.js**

```javascript
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: "recipient@example.com", // Change to your recipient
  from: "orders@example.com", // Change to your verified sender
  subject: "Your Cake or Pie Order Confirmation",
  html: "Thank you for your order. We hope it's <strong>delicious</strong>!",
};

sgMail
  .send(msg)
  .then(() => {
    console.log("Email sent");
  })
  .catch((error) => {
    console.error(error);
  });
```

### Send a dynamic template with basic replacement

**sender.js**

```javascript
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: "recipient@example.com", // Change to your recipient
  from: "orders@example.com", // Change to your verified sender
  templateId: "YOUR TEMPLATE ID HERE", // Change to a valid template ID
  dynamicTemplateData: {
    name: "B. Undt",
  },
};

sgMail
  .send(msg)
  .then(() => {
    console.log("Email sent");
  })
  .catch((error) => {
    console.error(error);
  });
```

**template name snippet**

```handlebars
{{ insert name 'default=Valued Customer'}}
```

### Sending with Express

**sender.js**

```javascript
module.exports = function send(email, dynamicData) {
  const sgMail = require("@sendgrid/mail");
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: email, // Recipient from request
    from: "orders@example.com", // Change to your verified sender
    templateId: "YOUR TEMPLATE ID", // Change to a valid template ID
    dynamicTemplateData: dynamicData,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};
```

**index.js**

```javascript
const http = require("http");
const express = require("express");
const sender = require("./sender");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.post("/checkout", (req, res) => {
  console.log(`Sending confirmation email to ${req.body.email}`);
  res.writeHead(200, { "Content-Type": "application/json" });
  sender(req.body.email, req.body.cart);
  res.end(`{"success": true}`);
});

http.createServer(app).listen(8080, () => {
  console.log("Express server listening on port 8080");
});
```

**sampleREquestBody**

```json
{
  "email": "recipient@example.com",
  "cart": {
    "total": "$114.80",
    "items": [
      {
        "item": "Cupcake variety pack - dozen",
        "price": "$19.95"
      },
      {
        "item": "New York cheesecake",
        "price": "$34.95"
      },
      {
        "item": "8 inch triple chocolote cake",
        "price": "$29.95"
      },
      {
        "item": "Tiramisu",
        "price": "$29.95"
      }
    ],
    "confirmation_number": "79uxgAMW2q",
    "name": "B. Undt",
    "address01": "1234 Pretend Pl.",
    "city": "Portland",
    "state": "OR",
    "zip": "97227"
  }
}
```

**template receipt snippet**

```handlebars
<!-- Order Confirmation -->
<!-- Section One -->
<table class="module" role="module" data-type="text" border="0" cellpadding="0" width="100%"
    style="table-layout: fixed;">
    <tr>
        <td colspan="2" style="padding: 0px 20px 0px 20px;">
            <table class="module" role="module" data-type="text" border="0" cellpadding="0" width="100%"
                style="table-layout: fixed;">
                <tr>
                    <td style="padding: 0px 0px 1px 0px; background-color: #333333;"></td>
                </tr>
            </table>
        </td>
    </tr>
    <!-- End Divider -->

    <tr>
        <td style="text-align: left; padding: 15px 0px 0px 20px;">
            <h3 style="padding: 0px; margin: 0px;">Delivery Address</h3>
        </td>
        <td valign="bottom" style="text-align: right; padding: 15px 20px 10px 0px;">
            <h4 style="padding: 0px; margin: 0px;">Confirmation number:</h4>
        </td>
    </tr>
    <tr>
        <td style="text-align: left; padding: 0px 0px 5px 20px;">
            {{name}}
        </td>
        <td style="text-align: right; padding: 0px 20px 5px 0px;">
            {{confirmation_number}}
        </td>
    </tr>
    <tr>
        <td style="text-align: left; padding: 0px 0px 5px 20px;">
            {{address01}}
        </td>
    </tr>
    <tr>
        <td style="text-align: left; padding: 0px 0px 5px 20px;">
            {{address02}}
        </td>
    </tr>
    <tr>
        <td style="text-align: left; padding: 0px 0px 20px 20px;">
            {{city}}, {{state}} {{zip}}
        </td>
    </tr>
    <!-- Divider -->
    <tr>
        <td colspan="2" style="padding: 0px 20px 0px 20px;">
            <table class="module" role="module" data-type="text" border="0" cellpadding="0" width="100%"
                style="table-layout: fixed;">
                <tr>
                    <td style="padding: 0px 0px 1px 0px; background-color: #333333;"></td>
                </tr>
            </table>
        </td>
    </tr>
    <!-- End Divider -->
</table>
<!-- End Section One -->

<!-- Section Two -->
<table class="module" role="module" data-type="text" border="0" cellpadding="0" width="100%"
    style="table-layout: fixed;">
    <!-- Reciept Header -->
    <tr>
        <td colspan="2" style="text-align: left; padding: 15px 0px 0px 20px;">
            <h3 style="padding: 0px; margin: 0px;">Order Items</h3>
        </td>
    </tr>

    <!-- Receipt Items -->
    {{# each items}}
        <tr>
            <td valign="middle" style="text-align: left; padding: 10px 0px 5px 20px;">
                {{this.item}}</td>
            <td valign="middle" style="text-align: right; padding: 10px 20px 5px 0px;">
                {{this.price}}</td>
        </tr>
        {{/each}}

        <!-- Divider -->
        <tr>
            <td colspan="2" style="padding: 0px 20px 0px 20px;">
                <table class="module" role="module" data-type="text" border="0" cellpadding="0" width="100%"
                    style="table-layout: fixed;">
                    <tr>
                        <td style="padding: 0px 0px 1px 0px; background-color: #333333;"></td>
                    </tr>
                </table>
            </td>
        </tr>
        <!-- End Divider -->
        <!-- End Receipt Items -->

        <!-- Total -->
        <tr>
            <td valign="middle" style="padding: 10px 10px 0px 20px;">
                <p style="text-align: left; font-weight: bold;">Total</p>
            </td>
            <td valign="middle" style="text-align: right; padding: 10px 20px 10px 0px;">
                <p style="font-weight: bold;">{{total}}</p>
            </td>
        </tr>
        <!-- End Total -->
</table>
```
