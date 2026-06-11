# ⚡ Quick Start Guide

Get up and running with Raho Carousel Agent in 5 minutes!

---

## 🚀 Super Quick Start (TL;DR)

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Open browser
# http://localhost:3000

# 4. Get OpenAI API key from:
# https://platform.openai.com/api-keys

# 5. Start creating! 🎉
```

---

## 📋 Prerequisites

Before you begin, ensure you have:

- ✅ **Node.js 18+** - [Download](https://nodejs.org/)
- ✅ **npm, yarn, or pnpm** - Comes with Node.js
- ✅ **Code editor** - VS Code recommended
- ✅ **OpenAI API Key** - [Get here](https://platform.openai.com/api-keys)

### Check Your Setup
```bash
node --version    # Should be v18 or higher
npm --version     # Should be v8 or higher
```

---

## 🔧 Installation

### Step 1: Clone or Download
```bash
# If using Git
git clone <repository-url>
cd raho-carousel-agent

# Or download ZIP and extract
```

### Step 2: Install Dependencies
```bash
npm install

# Or with yarn
yarn install

# Or with pnpm
pnpm install
```

**This will install:**
- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Zustand (state management)
- OpenAI SDK
- Lucide React (icons)
- And more...

---

## 🎮 Running the App

### Development Mode
```bash
npm run dev
```

The app will start at:
- **Local**: http://localhost:3000
- **Network**: http://[your-ip]:3000

You'll see:
```
▲ Next.js 15.1.9
- Local:        http://localhost:3000
- Environments: .env.local
✓ Starting...
✓ Ready in 2.3s
```

### Production Mode
```bash
# Build
npm run build

# Start production server
npm start
```

---

## 🎯 First Steps

### 1. Open the App
Navigate to http://localhost:3000 in your browser

### 2. Get Your OpenAI API Key

1. Go to https://platform.openai.com/api-keys
2. Sign up or log in
3. Click "Create new secret key"
4. Copy the key (starts with `sk-proj-...`)
5. **Important**: Save it somewhere safe!

### 3. Enter API Key

In the app:
1. Look for the **API Key** input at the top
2. Paste your OpenAI API key
3. The key is stored in your browser session only

### 4. Create Your First Content

1. Click **"+ Tambah"** in the sidebar
2. A new content item will be created
3. Edit the content name (e.g., "My First Carousel")

### 5. Add Slides

1. Click **"+ Slide"** to add more slides
2. Each content can have multiple slides
3. Edit slide labels (e.g., "Cover", "Benefits", "CTA")

### 6. Write Your Content

For each slide, write:
- Headline
- Key points
- Visual directions
- Call to action

**Example:**
```
Slide 1 - Cover:
"Introducing Premium Skincare Collection"
- Luxury ingredients
- Clinically tested
- Made for sensitive skin

Slide 2 - Benefits:
"Why Choose Us?"
- 100% natural ingredients
- Dermatologist approved
- Visible results in 2 weeks
```

### 7. Generate Images

**Single slide:**
- Click "Gen" button on any slide card

**All slides in one content:**
- Click "⚡ Generate Konten Ini" at the top

**All content (batch):**
- Click "⚡ Generate Semua" in the top bar

### 8. View & Download

Once generated:
- Click image to preview (lightbox)
- Click "Download" to save
- View all results in the Gallery section

---

## 📚 Understanding the Interface

### Layout Overview
```
┌─────────────────────────────────────────┐
│ Header - App Title                       │
├─────────────────────────────────────────┤
│ TopBar - [API Key] [Generate All]       │
├──────────┬──────────────────────────────┤
│ Sidebar  │ Editor Panel                 │
│          │                              │
│ Content  │ Base Prompt (Global)         │
│ List     │                              │
│          │ [Content Name] [+ Slide]     │
│ ┌──────┐│                              │
│ │Item 1││ Slide Grid:                  │
│ └──────┘│ ┌────┐ ┌────┐ ┌────┐        │
│         │ │Sld1│ │Sld2│ │Sld3│        │
│ ┌──────┐│ └────┘ └────┘ └────┘        │
│ │Item 2││                              │
│ └──────┘│ Gallery                      │
│         │ Activity Log                 │
└──────────┴──────────────────────────────┘
```

### Key Components

**Sidebar (Left)**
- List of all your content
- Click to switch between content
- Add new content with "+ Tambah"

**Editor Panel (Right)**
- Base Prompt: Global prompt for all slides
- Content Name: Name of current content
- Slide Cards: Edit and generate individual slides
- Gallery: View all generated images
- Activity Log: Track all activities

---

## 🎨 Customizing Prompts

### Base Prompt (Global)
The base prompt is used for ALL slides in ALL content.

**Default includes:**
- Brand: "RAHO PREMIER"
- Style: Premium modern scientific
- Colors: Gold and white
- Format: 4:5 vertical (Instagram carousel)
- Footer: Contact info

**You can customize:**
- Brand name
- Design style
- Color palette
- Layout preferences
- Footer content

### Per-Slide Content
Each slide has its own content field.

**Best practices:**
- Keep it concise
- Use bullet points
- Specify visual elements
- Include call-to-action

**Example structure:**
```
HEADLINE: Main message

KEY POINTS:
• Point 1
• Point 2
• Point 3

VISUAL NOTES:
- Include product image
- Use gradient background

CTA: "Shop Now"
```

---

## 💡 Tips & Tricks

### 1. Organizing Content
- Use descriptive names: "Summer Sale 2024", "Product Launch"
- Group similar content together
- Delete old/unused content to keep sidebar clean

### 2. Writing Better Prompts
- Be specific about colors, styles, layout
- Reference successful examples
- Use consistent terminology
- Include brand elements

### 3. Efficient Workflow
1. Create all content structures first
2. Write all slide content
3. Preview prompts to verify
4. Generate in batch (faster)
5. Download all results

### 4. Managing API Costs
- Preview prompts before generating
- Edit and refine content first
- Use "Gen" for single slides to test
- Only use "Generate All" when ready

### 5. Keyboard Tips
- `Escape`: Close lightbox
- `Ctrl/Cmd + K`: Quick search (future feature)
- Tab through form fields
- Enter to submit forms

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Find process on port 3000
lsof -i :3000   # Mac/Linux
netstat -ano | findstr :3000   # Windows

# Kill process
kill -9 <PID>   # Mac/Linux
taskkill /PID <PID> /F   # Windows

# Or use different port
npm run dev -- -p 3001
```

### API Key Not Working
- Check if key starts with `sk-proj-`
- Verify key is active in OpenAI dashboard
- Check API quota/credits
- Try creating a new key

### Generation Fails
**Common issues:**
1. **No API Key**: Enter key in top bar
2. **Invalid Key**: Check key in OpenAI dashboard
3. **Quota Exceeded**: Add credits to OpenAI account
4. **Network Error**: Check internet connection
5. **Prompt Too Long**: Simplify content

**Check Activity Log** for detailed error messages!

### Images Not Loading
- Check browser console for errors
- Verify OpenAI API response
- Clear browser cache
- Try different browser

### Build Errors
```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run build
```

---

## 📖 Next Steps

### Learn More
1. **Application Flow**: Read [FLOW.md](./FLOW.md)
2. **UI Design**: Check [UI-IMPROVEMENTS.md](./UI-IMPROVEMENTS.md)
3. **Design System**: See [DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md)
4. **Deployment**: Read [DEPLOYMENT.md](./DEPLOYMENT.md)

### Explore Features
- Create multiple content items
- Try different prompt styles
- Experiment with layouts
- Use batch generation
- Preview before generating

### Customize
- Modify base prompt for your brand
- Adjust colors in Tailwind config
- Add custom components
- Create your own templates

---

## 🎓 Understanding the Tech

### Tech Stack
- **Next.js 15**: React framework
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first CSS
- **Zustand**: State management
- **OpenAI API**: Image generation

### Project Structure
```
src/
├── app/          # Next.js pages
├── components/   # React components
├── store/        # Zustand store
├── hooks/        # Custom hooks
└── lib/          # Types & utilities
```

### Key Files
- `page.tsx`: Main page
- `carouselStore.ts`: State management
- `useGenerate.ts`: API integration
- `globals.css`: Global styles
- `tailwind.config.ts`: Design tokens

---

## 🆘 Getting Help

### Resources
- **Documentation**: See `/docs` folder
- **README**: Project overview
- **FLOW**: Application architecture
- **CHANGELOG**: Recent changes

### Contact
- **WhatsApp**: +62 851-3622-2772
- **Instagram**: @rahopremier
- **TikTok**: @rahopremier

### Common Questions

**Q: Is my API key saved permanently?**
A: No, it's only in browser session. Re-enter after refresh.

**Q: How much does it cost per image?**
A: Check OpenAI pricing. Model: `gpt-image-1`, Size: 1024x1536, Quality: high

**Q: Can I use my own AI service?**
A: Yes! Modify `useGenerate.ts` to use different API.

**Q: Can I run offline?**
A: No, requires internet for OpenAI API.

**Q: Mobile support?**
A: Yes, responsive design. Best on tablets/desktop.

---

## ✅ Quick Checklist

Before starting:
- [ ] Node.js 18+ installed
- [ ] Dependencies installed (`npm install`)
- [ ] Dev server running (`npm run dev`)
- [ ] OpenAI API key ready
- [ ] Browser opened to localhost:3000

First project:
- [ ] API key entered
- [ ] Content created
- [ ] Slides added
- [ ] Content written
- [ ] Prompts previewed
- [ ] Images generated
- [ ] Results downloaded

---

## 🎉 You're Ready!

You now know:
- ✅ How to install and run
- ✅ How to use the interface
- ✅ How to create content
- ✅ How to generate images
- ✅ How to troubleshoot issues
- ✅ Where to find help

**Start creating amazing Instagram carousels!** 🚀

---

## 📊 Quick Commands Reference

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm start           # Start production server

# Docker
docker-compose up   # Run with Docker

# Deployment
vercel              # Deploy to Vercel
git push            # Auto-deploy (if configured)
```

---

*Happy generating! 🎨*

Made with ❤️ by Raho Premier AI Studio
