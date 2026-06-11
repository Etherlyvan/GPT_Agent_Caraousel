# 🚀 Deployment Guide

Panduan lengkap untuk deploy Raho Carousel Agent ke production.

---

## 📋 Prerequisites

- Node.js 18+
- npm/yarn/pnpm
- OpenAI API Key
- Domain (optional)
- Server/Hosting platform

---

## 🎯 Deployment Options

### 1. Vercel (Recommended) ⭐

**Langkah-langkah:**

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

**Konfigurasi:**
- Framework Preset: Next.js
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

**Environment Variables:**
- Tidak perlu environment variables (API key input via UI)

**Custom Domain:**
```bash
vercel domains add yourdomain.com
```

**Advantages:**
- ✅ Zero configuration
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Instant rollbacks
- ✅ Preview deployments

---

### 2. Docker Deployment 🐳

**Build & Run:**

```bash
# Using docker-compose
docker-compose up -d --build

# Or manual docker
docker build -t raho-carousel-agent .
docker run -p 3000:3000 raho-carousel-agent
```

**docker-compose.yml:**
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

**Dockerfile:**
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

---

### 3. VPS/Cloud Server (Ubuntu) 🖥️

**Setup Server:**

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2
sudo npm install -g pm2

# Clone & setup project
git clone <your-repo-url>
cd raho-carousel-agent
npm install
npm run build

# Start with PM2
pm2 start npm --name "raho-carousel" -- start
pm2 save
pm2 startup
```

**Nginx Configuration:**

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**Setup SSL with Certbot:**

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

---

### 4. Netlify 🌐

**Deploy Steps:**

1. Connect Git repository
2. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Framework: Next.js

3. Deploy!

**Note:** Netlify memerlukan plugin untuk Next.js app router.

---

### 5. Railway 🚂

**Quick Deploy:**

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Init & deploy
railway init
railway up
```

**Or use GitHub integration:**
1. Connect repository
2. Railway auto-detects Next.js
3. Deploy automatically

---

### 6. AWS (EC2 + S3) ☁️

**EC2 Setup:**

```bash
# SSH ke EC2 instance
ssh -i your-key.pem ubuntu@your-ec2-ip

# Follow VPS setup steps above
```

**S3 for Static Assets (Optional):**
- Upload public folder ke S3 bucket
- Configure CloudFront CDN
- Update Next.js config untuk external URLs

---

## 🔧 Build Optimization

### Production Build

```bash
# Build for production
npm run build

# Analyze bundle size
npm install -g @next/bundle-analyzer
ANALYZE=true npm run build

# Start production server
npm start
```

### Environment Variables

Aplikasi ini tidak memerlukan environment variables karena:
- API key diinput via UI
- Tidak ada secret keys di backend
- Client-side only application

### Performance Optimization

**next.config.ts:**

```typescript
const nextConfig = {
  // Compress images
  images: {
    domains: ['api.openai.com'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Enable SWC minification
  swcMinify: true,
  
  // Compress output
  compress: true,
  
  // Production source maps (optional)
  productionBrowserSourceMaps: false,
  
  // Strict mode
  reactStrictMode: true,
};
```

---

## 📊 Monitoring & Analytics

### 1. Vercel Analytics

```bash
npm install @vercel/analytics

# Add to app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function Layout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### 2. Google Analytics

```typescript
// app/layout.tsx
<Script
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
  strategy="afterInteractive"
/>
```

### 3. Error Tracking (Sentry)

```bash
npm install @sentry/nextjs

# Run setup wizard
npx @sentry/wizard -i nextjs
```

---

## 🔒 Security Checklist

- [x] API keys tidak di commit ke Git
- [x] HTTPS enabled (SSL certificate)
- [x] Rate limiting untuk API calls (client-side)
- [x] Input validation & sanitization
- [x] CSP headers (Content Security Policy)
- [x] CORS properly configured
- [x] Dependencies updated regularly

**Security Headers (next.config.ts):**

```typescript
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
];

module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};
```

---

## 🧪 Pre-Deployment Checklist

- [ ] Run `npm run build` locally
- [ ] Test production build: `npm start`
- [ ] Check all pages load correctly
- [ ] Test API integration
- [ ] Verify responsive design
- [ ] Test on multiple browsers
- [ ] Check console for errors
- [ ] Validate all forms
- [ ] Test image generation
- [ ] Verify download functionality
- [ ] Check activity log
- [ ] Test lightbox
- [ ] Optimize images
- [ ] Update README
- [ ] Tag release version
- [ ] Backup database (if any)

---

## 🔄 CI/CD Pipeline

### GitHub Actions Example

`.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run tests
      run: npm test
      
    - name: Build
      run: npm run build
      
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
        vercel-args: '--prod'
```

---

## 📈 Scaling Considerations

### For High Traffic:

1. **CDN**: Use Vercel Edge Network atau CloudFlare
2. **Caching**: Implement Redis untuk session storage
3. **Rate Limiting**: Protect API endpoints
4. **Load Balancer**: Multiple instances
5. **Database**: PostgreSQL untuk persistent storage
6. **Queue System**: Bull/Redis untuk batch jobs

---

## 🆘 Troubleshooting

### Build Errors

```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

### Port Already in Use

```bash
# Find process
lsof -i :3000

# Kill process
kill -9 <PID>
```

### Memory Issues

```bash
# Increase Node memory
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

---

## 📞 Support

Untuk bantuan deployment, hubungi:
- WhatsApp: +62 851-3622-2772
- Instagram: @rahopremier

---

## 📝 Post-Deployment

1. ✅ Verify deployment URL
2. ✅ Test all features
3. ✅ Setup monitoring
4. ✅ Configure analytics
5. ✅ Setup error tracking
6. ✅ Document deployment date
7. ✅ Notify team
8. ✅ Update DNS (if custom domain)
9. ✅ Setup automated backups
10. ✅ Monitor logs for first 24 hours

---

**Deployment Time Estimate:**
- Vercel: ~5 minutes
- Docker: ~15 minutes
- VPS: ~30 minutes
- AWS: ~45-60 minutes

**Recommended:** Start with Vercel untuk fastest deployment! 🚀
