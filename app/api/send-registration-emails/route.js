import nodemailer from "nodemailer"

export async function POST(request) {
  try {
    const { userEmail, userName, userRole, organizationName } = await request.json()

    // Create transporter
    const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: 587,
    secure: false, // TLS upgrade via STARTTLS
    auth: {
      user: process.env.SMTP_USER, // your full email (user@domain.com)
      pass: process.env.SMTP_PASS, // app password or account password
    },
    tls: {
      ciphers: "SSLv3", // helps avoid "unrecognized authentication type"
      rejectUnauthorized: false, // only if you get certificate errors
    },
  });


    // Admin email content
    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">New User Registration</h2>
        <p>A new user has registered on the platform:</p>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <p><strong>Name:</strong> ${userName}</p>
          <p><strong>Email:</strong> ${userEmail}</p>
          <p><strong>Role:</strong> ${userRole}</p>
          <p><strong>Organization:</strong> ${organizationName || "Not provided"}</p>
        </div>
        <p>Please review and approve this user's profile.</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.ADMIN_PANEL_URL}" 
             style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Go to Admin Panel
          </a>
        </div>
      </div>
    `

    // User email content
    const userEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Welcome! Account Created Successfully</h2>
        <p>Dear ${userName},</p>
        <p>Thank you for registering with us! Your account has been created successfully.</p>
        <div style="background-color: #e8f5e8; padding: 20px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #28a745;">
          <p><strong>✅ Account Status:</strong> Created and pending approval</p>
          <p><strong>⏰ Review Time:</strong> Your profile will be reviewed within 24 hours</p>
          <p><strong>📧 Notification:</strong> You'll receive an email once approved</p>
        </div>
        <p>Our team will review your profile and approve it within 24 hours. You'll receive a confirmation email once your account is approved and ready to use.</p>
        <p>Thank you for your patience!</p>
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
        <p style="color: #666; font-size: 14px;">If you have any questions, please contact our support team.</p>
      </div>
    `

    // Send email to admin
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER,
      subject: `New User Registration - ${userName} (${userRole})`,
      html: adminEmailHtml,
    })

    // Send email to user
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: userEmail,
      subject: "Account Created Successfully - Profile Under Review",
      html: userEmailHtml,
    })

    return Response.json({ success: true, message: "Emails sent successfully" })
  } catch (error) {
    console.error("Email sending error:", error)
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}
