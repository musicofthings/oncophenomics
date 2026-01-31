# Cloudflare Pages Build Configuration

This file configures the build process for Cloudflare Pages deployment.

## Production Build

**Build Command:** `npm run build`  
**Build Output Directory:** `dist`

The Vite build will produce optimized production assets in the `dist/` directory.

## Environment Variables

Set these in Cloudflare Pages dashboard:

- `VITE_GEMINI_API_KEY` - Your Gemini API key
- `VITE_FIREBASE_API_KEY` - Your Firebase API key (optional)

## Deployment

1. Connect your GitHub repository to Cloudflare Pages
2. Set the build command to `npm run build`
3. Set the output directory to `dist`
4. Add environment variables in the Pages dashboard
5. Deploy!

For manual deployment:
```bash
npm install -g wrangler
npm run build
wrangler pages deploy dist
```
