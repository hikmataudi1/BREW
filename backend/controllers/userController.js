import dotenv  from "dotenv"
import { response } from "express";
import SibApiV3Sdk from 'sib-api-v3-sdk'


dotenv.config();
var defaultClient = SibApiV3Sdk.ApiClient.instance;
var apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY;


if (!process.env.BREVO_API_KEY) {
    console.error('BREVO_API_KEY is not set in the environment variables.');
    process.exit(1); 
  }
const brevoClient = new SibApiV3Sdk.TransactionalEmailsApi();

  const sendEbookEmail = async (req,res)=>{

    const { email, name } = req.body;

    dotenv.config();
    var defaultClient = SibApiV3Sdk.ApiClient.instance;
    var apiKey = defaultClient.authentications['api-key'];

    apiKey.apiKey = process.env.BREVO_API_KEY;
    if (!process.env.BREVO_API_KEY) {
        console.error('BREVO_API_KEY is not set in the environment variables.');
        process.exit(1); 
      }
    const brevoClient = new SibApiV3Sdk.TransactionalEmailsApi();

    try{
        const response = await brevoClient.sendTransacEmail({
            sender: { email: "brewperfect3@gmail.com", name: "Perfect Brew" },
            to: [{ email, name }],
            subject: "Get your free ebook!",
            htmlContent: `<html><body>
            <h1>Welcome to Perfect Brew ${name}!</h1>
            <p>This guide is just a simple gift from Perfect Brew , you'll find everything you need to brew your ideal cup with our expertly curated equipment, and all the inspiration you need. let's make every coffee moment extraordinary together!</p>
            <a href="https://drive.google.com/uc?id=1Hn1ZpI4Op4zinVE8EDOQnV6FkGTSxy8h&export=download">Download Coffee Guide</a>
            </body></html>`,
          });
        
        console.log('Email sent successfully:', response);
        res.status(200).json({ message: "Email sent successfully", response });
    } catch(err){
        console.error('Error sending email:', err);
        res.status(500).json({ message: "Error occurred while sending email", error: err.message });
    }
  }

const sendOrderMail = async (req, res) => {
    try {
      const { user, products, totalAmount, shippingAddress } = req.body;
  
      const sendSmtpEmail = await brevoClient.sendTransacEmail({
        to: [{ email: user.email, name: user.name }],
        sender: { email: 'brewperfect3@gmail.com', name: 'Perfect Brew' },
        subject: `Order Confirmation - Order Total: $${totalAmount}`,
        htmlContent: `
          <h2>Thank you for your order, ${user.name}!</h2>
          <p>Your order has been successfully placed and is being processed.</p>
          <h3>Order Details:</h3>
          <ul>
            ${products
              .map(
                (product) => `
              <li>
                <strong>${product.name}</strong> - Quantity: ${product.quantity} - Price: $${product.price}
                ${product.colors?.length ? `<br>Colors: ${product.colors.join(', ')}` : ''}
              </li>
            `
              )
              .join('')}
          </ul>
          <h3>Total Amount: $${totalAmount}</h3>
          <h3>Shipping Address:</h3>
          <p>${shippingAddress.address}, ${shippingAddress.building}</p>
          <p>We will notify you once your order is shipped!</p>
          <p>This guide is just a simple gift from Perfect Brew , you'll find everything you need to brew your ideal cup with our expertly curated equipment, and all the inspiration you need. let's make every coffee moment extraordinary together!</p>          
          <a href="https://drive.google.com/uc?id=1Hn1ZpI4Op4zinVE8EDOQnV6FkGTSxy8h&export=download">Download Coffee Guide</a>
          <p>Thank you for choosing perfect brew!</p>
        `,
      });
  
      
  
      res.status(201).json({ message: 'Order placed successfully, email sent!',response });
    } catch (error) {
      console.error('Error placing order:', error);
      res.status(500).json({ message: 'Error placing order , check all info and try again', error: error.message });
    }
  };

  export {sendEbookEmail , sendOrderMail}
