function emailTemplate(otp) {
  return `
  
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification Email</title>
    <style type="text/css">
        /* Base styles */
        body, html {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            background-color: #f5f5f5;
        }
        
        /* Container */
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        
        /* Header */
        .header {
            text-align: center;
            padding: 20px 0;
        }
        
        .header img {
            max-width: 150px;
        }
        
        /* Content */
        .content {
            padding: 20px;
            text-align: center;
        }
        
        .otp-code {
            font-size: 28px;
            font-weight: bold;
            letter-spacing: 5px;
            color: #2c3e50;
            margin: 20px 0;
            padding: 10px;
            background-color: #f8f9fa;
            border-radius: 4px;
            display: inline-block;
        }
        
        /* Button */
        .verify-button {
            display: inline-block;
            padding: 12px 24px;
            margin: 20px 0;
            background-color: #3498db;
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 4px;
            font-weight: bold;
            text-align: center;
        }
        
        .verify-button:hover {
            background-color: #2980b9;
        }
        
        /* Footer */
        .footer {
            text-align: center;
            padding: 20px;
            font-size: 12px;
            color: #7f8c8d;
            border-top: 1px solid #eeeeee;
        }
        
        /* Responsive adjustments */
        @media only screen and (max-width: 600px) {
            .container {
                width: 100%;
                padding: 10px;
            }
            
            .otp-code {
                font-size: 24px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <img src="https://yourcompany.com/logo.png" alt="Company Logo">
            <h2>Verify Your Account</h2>
        </div>
        
        <!-- Content -->
        <div class="content">
            <p>Hello Md Shakhawat,</p>
            <p>To complete your verification, please use the following One-Time Password (OTP):</p>
            
            <div class="otp-code">${otp}</div>
            
            <p>This code will expire in <strong>10 minutes</strong>.</p>
            
            <!-- Verify Button -->
            <a href="https://yourcompany.com/verify?otp=123456&email=user@example.com" class="verify-button">Verify Now</a>
            
            <p>If you didn't request this, please ignore this email or contact our support team.</p>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <p>&copy; 2024 Your Company. All rights reserved.</p>
            <p>
                <a href="https://yourcompany.com/privacy">Privacy Policy</a> | 
                <a href="https://yourcompany.com/contact">Contact Us</a>
            </p>
        </div>
    </div>
</body>
</html>
    `;
}

module.exports = emailTemplate;
