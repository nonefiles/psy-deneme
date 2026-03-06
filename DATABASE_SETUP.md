# PsychoFlow - Database Setup & Configuration

## Overview
The PsychoFlow application has been successfully migrated from Firebase/React to Next.js 16 with Supabase PostgreSQL backend. All database connections and authentication flows are now properly configured.

## Database Configuration

### ✅ Completed Setup
1. **Profiles Table Created**
   - Stores user profile information
   - Linked to Supabase Auth users via foreign key
   - RLS policies enabled for data security
   - Auto-trigger on user signup to create profile records

2. **Row Level Security (RLS)**
   - All tables protected with RLS policies
   - Users can only access their own data
   - Profiles auto-created on signup with security definer privileges

3. **Tables Connected**
   - `clients` - Client information (filtered by psychologist_id)
   - `appointments` - Appointment scheduling
   - `accounting_records` - Financial tracking
   - `session_notes` - Session documentation
   - And 21+ other tables from your original schema

## Authentication Flow

### Architecture
```
User -> Login Page
  ↓
Supabase Auth (signInWithPassword)
  ↓
Session created (JWT in HTTP-only cookie)
  ↓
Middleware validates session
  ↓
Dashboard Layout renders with user data
```

### Key Components

**1. Middleware (`middleware.ts`)**
- Validates authentication on every request
- Redirects unauthenticated users to `/auth/login`
- Redirects authenticated users away from auth pages
- Handles session refresh and cookie management

**2. Supabase Clients**
- **Client-side** (`lib/supabase/client.ts`) - Browser-based operations
- **Server-side** (`lib/supabase/server.ts`) - Server-only data fetching
- **Proxy** (`lib/supabase/proxy.ts`) - Session handling in middleware

**3. Auth Hooks** (`lib/auth/hooks.ts`)
- `useAuth()` - Get current user and auth state
- `useSignIn()` - Login with email/password
- `useSignUp()` - Register new users
- `useSignOut()` - Logout and redirect

## Verification

### Test Database Connection
To verify your database is properly connected, you can:

1. **Sign up/Login** at `/auth/login`
2. **Check Dashboard** at `/dashboard` - displays real statistics from database
3. **API Test** - Call `GET /api/test-db` (requires authentication)

### Expected Behavior
- ✅ Login redirects to dashboard
- ✅ Dashboard shows: clients count, today's appointments, monthly income
- ✅ Logout clears session and redirects to login
- ✅ Unauthenticated access to `/dashboard/*` redirects to login
- ✅ Authenticated users trying to access `/auth/*` redirects to dashboard

## Environment Variables

All required environment variables are automatically set:
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Public anonymous key
- `NEXT_PUBLIC_SUPABASE_REDIRECT_URL` - Callback URL for auth

## Data Fetching Examples

### Client Component (Real-time)
```typescript
'use client'
import { createClient } from '@/lib/supabase/client'

export default function MyComponent() {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('psychologist_id', user.id)
}
```

### Server Component (One-time fetch)
```typescript
import { createClient } from '@/lib/supabase/server'

export default async function MyServerComponent() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('psychologist_id', userId)
}
```

## Next Steps

### Implement Features
1. **Clients Management** - CRUD operations for client data
2. **Appointments Calendar** - Schedule and manage appointments
3. **Session Notes** - Document therapy sessions
4. **Financial Reports** - Income/expense tracking and reporting
5. **Admin Dashboard** - User management and system settings

### Best Practices
- Always filter data by `psychologist_id` for privacy
- Use RLS policies to prevent unauthorized access
- Implement proper error handling in all data operations
- Add loading states and skeleton screens
- Use SWR or React Query for client-side data fetching

## Troubleshooting

### "Cannot find Supabase environment variables"
- Check Settings → Vars section
- Ensure all three variables are set with correct values

### "RLS policy denies access"
- Verify user is authenticated
- Check that query filters by correct user ID
- Ensure RLS policy is set to `USING (auth.uid() = user_id)`

### "Session expired"
- Middleware automatically refreshes sessions
- Login again if session expires

## Support Resources
- Database Schema: See `lib/types/database.ts`
- Migration Notes: See `MIGRATION_NOTES.md`
- Supabase Docs: https://supabase.com/docs
