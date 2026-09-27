# KTM Best Real Estate Website

A modern real estate landing page and admin dashboard for KtM Best, built using free tools for easy deployment on Netlify.

## Features
- Responsive property listing homepage
- Search and filter by type
- Property detail modal with gallery and WhatsApp CTA
- Admin login with password protection on the client side
- Add, delete, and publish listings
- Uses localStorage so it works without a backend
- Free deployment on Netlify

## Files
- `index.html` — public website homepage
- `admin.html` — admin dashboard for publishing listings
- `styles.css` — full styling
- `app.js` — homepage logic
- `admin.js` — admin logic
- `netlify.toml` — Netlify configuration

## Admin login
Default admin password:
- `khalifa2025`

## How to deploy on Netlify
1. Push this project to GitHub
2. Go to Netlify
3. Click `Add new site` → `Import existing project`
4. Select your GitHub repository
5. Use the default deploy settings
6. Deploy the site

## Notes
This is a free static solution meant for simple real-estate business use. For a production system with shared multi-user access, better use Supabase + authentication + storage.

## Local preview
Open `index.html` directly in a browser, or use a local web server if preferred.
