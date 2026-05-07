# Authentication & Email Notifications Setup

This guide explains the NextAuth.js authentication system and email notifications implemented in your real estate platform.

## Features

### 1. User Authentication
- **Registration**: New homeowners can create accounts with email and password
- **Login**: Secure login with NextAuth.js JWT sessions
- **Session Management**: Sessions persist for 30 days
- **Navigation**: Automatic display of login/register or logout buttons based on auth status

### 2. Email Notifications
- **Welcome Emails**: Sent automatically when users register
- **New Listing Alerts**: Subscribed users receive emails when new properties are listed
- **Subscription Control**: Users can opt-in/out of notifications during registration

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

This installs:
- `next-auth@^5.0.0` - Authentication library
- `nodemailer@^6.9.7` - Email sending service

### 2. Environment Configuration

Create a `.env.local` file in the root directory with the following:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-random-secret-key-here

# Email Configuration (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@realestate.com
```

#### Setting up Gmail SMTP:

1. Enable 2-Step Verification on your Google Account
2. Generate an App Password:
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" and "Windows Computer"
   - Copy the generated 16-character password
   - Use this as `SMTP_PASS` in `.env.local`

#### For Other Email Providers:
- **SendGrid**: Use `SMTP_HOST: smtp.sendgrid.net` and API key
- **Mailgun**: Use `SMTP_HOST: smtp.mailgun.org`
- **Custom SMTP**: Adjust credentials accordingly

### 3. Database Setup (Current: LocalStorage)

Currently, user data is stored in browser localStorage. For production, consider upgrading to:
- MongoDB
- PostgreSQL
- Firebase
- Any Node.js-compatible database

Update `lib/storage.js` to connect to your database instead of localStorage.

## File Structure

```
app/
├── api/
│   ├── auth/
│   │   └── [...nextauth]/
│   │       └── route.js           # NextAuth configuration
│   └── notifications/
│       └── new-listing/
│           └── route.js            # Email notification endpoint
├── auth/
│   ├── login/
│   │   └── page.js                # Login page
│   └── register/
│       └── page.js                # Registration page
├── components/
│   ├── Navbar.js                  # Updated with auth links
│   ├── PropertyForm.js            # Updated to trigger notifications
│   └── SessionProvider.js         # NextAuth session wrapper
└── layout.js                      # Updated with SessionProvider

lib/
├── storage.js                     # User management functions
└── email.js                       # Email sending functions
```

## How It Works

### Registration Flow
1. User fills out registration form (`/auth/register`)
2. Form validates password match and strength
3. User is created in storage with subscription preference
4. Welcome email is sent (if SMTP configured)
5. User is redirected to login page

### Login Flow
1. User enters email and password (`/auth/login`)
2. Credentials are verified against stored users
3. JWT session is created (30-day duration)
4. User is redirected to homepage
5. Session is available via `useSession()` hook

### New Listing Notification Flow
1. Property owner lists new property
2. Property is saved to storage
3. API call triggers `/api/notifications/new-listing`
4. Server retrieves all subscribed users
5. Emails are sent to each subscriber
6. User sees success message

## Usage

### In Components

**Check if user is logged in:**
```javascript
'use client';
import { useSession } from 'next-auth/react';

export default function MyComponent() {
  const { data: session } = useSession();
  
  if (session) {
    return <p>Welcome, {session.user.email}</p>;
  }
  
  return <p>Please log in</p>;
}
```

**Redirect if not authenticated:**
```javascript
'use client';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function ProtectedPage() {
  const { data: session, status } = useSession();
  
  if (status === 'loading') return <p>Loading...</p>;
  
  if (!session) {
    redirect('/auth/login');
  }
  
  return <div>Protected content</div>;
}
```

**Sign out:**
```javascript
import { signOut } from 'next-auth/react';

<button onClick={() => signOut()}>Logout</button>
```

## Testing

### Local Testing without Email
The default `.env.local` is configured for testing without sending real emails. Emails will log to console.

### Send Test Email
1. Configure real SMTP credentials in `.env.local`
2. Register a new account
3. Check your email inbox for welcome message

## Key Functions

### In `lib/storage.js`:
- `getUsers()` - Retrieve all users
- `getUser(email)` - Find user by email
- `createUser(userData)` - Create new user
- `updateUser(email, updates)` - Update user data
- `userExists(email)` - Check if user exists

### In `lib/email.js`:
- `sendNewListingEmail(property)` - Send to all subscribers
- `sendWelcomeEmail(email, name)` - Send welcome email

## Security Notes

1. **NEXTAUTH_SECRET**: Change the default secret in production
2. **Password Storage**: Currently plaintext (not recommended for production)
   - Implement bcrypt for password hashing
   - Use `npm install bcryptjs`
3. **SMTP Credentials**: Never commit `.env.local` to version control
4. **HTTPS**: Use HTTPS in production
5. **Session Timeout**: Currently 30 days - adjust as needed

## Next Steps

1. **Database Migration**: Replace localStorage with a proper database
2. **Password Hashing**: Implement bcryptjs for secure password storage
3. **Email Templates**: Create HTML email templates for better formatting
4. **Two-Factor Authentication**: Add 2FA for enhanced security
5. **OAuth Providers**: Add Google, GitHub login options
6. **Admin Dashboard**: Create user management interface

## Troubleshooting

### Emails not sending?
- Check SMTP credentials in `.env.local`
- Verify firewall/antivirus isn't blocking port 587
- Check Gmail App Password if using Gmail

### Session not persisting?
- Clear browser cookies and restart dev server
- Ensure `NEXTAUTH_URL` matches your domain
- Check browser's storage settings

### Login page shows errors?
- Verify user exists by checking localStorage in browser DevTools
- Check server logs for authentication errors
- Ensure credentials match exactly (case-sensitive)

## Support

For issues or questions about:
- **NextAuth.js**: https://next-auth.js.org
- **Nodemailer**: https://nodemailer.com
- **Next.js**: https://nextjs.org
