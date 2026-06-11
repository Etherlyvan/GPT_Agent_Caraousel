# 🎨 Design System Reference

Quick reference untuk design tokens, components, dan utilities yang digunakan di Raho Carousel Agent.

---

## 🎯 Color Palette

### Primary Colors
```css
/* Purple to Blue Gradient */
accent:        #8b5cf6  /* Vibrant Purple */
accent-light:  #a78bfa  /* Light Purple */
accent-dark:   #7c3aed  /* Deep Purple */

primary-500:   #0ea5e9  /* Sky Blue */
primary-600:   #0284c7  /* Blue */
primary-700:   #0369a1  /* Deep Blue */
```

### Neutral Colors
```css
slate-50:      #f8fafc  /* Background */
slate-100:     #f1f5f9  /* Card background */
slate-200:     #e2e8f0  /* Borders */
slate-400:     #94a3b8  /* Disabled text */
slate-600:     #475569  /* Secondary text */
slate-700:     #334155  /* Primary text */
slate-900:     #0f172a  /* Headings */

white:         #ffffff
black:         #000000
```

### Status Colors
```css
success:       #10b981  /* Green */
warning:       #f59e0b  /* Amber */
error:         #ef4444  /* Red */
info:          #3b82f6  /* Blue */
```

---

## 📐 Spacing Scale

```css
0    → 0px
px   → 1px
0.5  → 2px    (0.125rem)
1    → 4px    (0.25rem)
2    → 8px    (0.5rem)
3    → 12px   (0.75rem)
4    → 16px   (1rem)     ⭐ Base unit
5    → 20px   (1.25rem)
6    → 24px   (1.5rem)
8    → 32px   (2rem)
10   → 40px   (2.5rem)
12   → 48px   (3rem)
```

### Common Patterns
```css
/* Padding */
px-4 py-3    /* Standard button/input */
p-4          /* Card padding */
p-6          /* Section padding */

/* Gap */
gap-2        /* Tight spacing */
gap-3        /* Normal spacing */
gap-4        /* Loose spacing */

/* Margin */
mb-4         /* Bottom margin */
mb-6         /* Section bottom margin */
mt-8         /* Large top margin */
```

---

## 📝 Typography

### Font Families
```css
font-sans:    'Inter', sans-serif          /* Body text */
font-display: 'Cormorant Garamond', serif  /* Headings */
```

### Font Sizes
```css
text-xs:      0.75rem   (12px)   /* Small labels */
text-sm:      0.875rem  (14px)   /* Body small */
text-base:    1rem      (16px)   /* Body */
text-lg:      1.125rem  (18px)   /* Subtitle */
text-xl:      1.25rem   (20px)   /* Heading 3 */
text-2xl:     1.5rem    (24px)   /* Heading 2 */
text-4xl:     2.25rem   (36px)   /* Heading 1 */
text-5xl:     3rem      (48px)   /* Display */
```

### Font Weights
```css
font-normal:     400
font-medium:     500
font-semibold:   600
font-bold:       700
```

### Usage Examples
```tsx
/* Headings */
<h1 className="font-display text-4xl font-bold text-slate-900">

/* Body */
<p className="text-sm text-slate-600">

/* Labels */
<span className="text-xs font-medium text-slate-500 uppercase">
```

---

## 🔘 Buttons

### Button Classes
```css
/* Base */
.btn {
  @apply px-4 py-2 rounded-lg font-medium 
         transition-all duration-200 
         focus:outline-none focus:ring-2 focus:ring-offset-2;
}

/* Variants */
.btn-primary {
  @apply bg-accent text-white 
         hover:bg-accent-dark 
         focus:ring-accent;
}

.btn-secondary {
  @apply bg-slate-100 text-slate-700 
         hover:bg-slate-200 
         focus:ring-slate-300;
}

.btn-ghost {
  @apply text-slate-600 
         hover:bg-slate-100 
         focus:ring-slate-300;
}
```

### Usage
```tsx
/* Primary action */
<button className="btn btn-primary">
  Generate
</button>

/* Secondary action */
<button className="btn btn-secondary">
  Cancel
</button>

/* Tertiary action */
<button className="btn btn-ghost">
  Preview
</button>

/* With icon */
<button className="btn btn-primary flex items-center gap-2">
  <Sparkles className="w-4 h-4" />
  Generate
</button>
```

---

## 📥 Inputs

### Input Class
```css
.input {
  @apply px-4 py-2 
         border border-slate-200 
         rounded-lg 
         focus:outline-none 
         focus:ring-2 focus:ring-accent/20 
         focus:border-accent 
         transition-all;
}
```

### Usage
```tsx
/* Text input */
<input 
  type="text"
  className="input text-sm"
  placeholder="Enter text..."
/>

/* Textarea */
<textarea 
  className="input text-sm leading-relaxed resize-y"
  rows={5}
/>

/* Large input */
<input 
  className="input text-lg font-semibold"
/>
```

---

## 🎴 Cards

### Card Patterns
```tsx
/* Basic card */
<div className="bg-white border border-slate-200 rounded-xl p-4 shadow-soft">

/* Hoverable card */
<div className="bg-white border border-slate-200 rounded-xl p-4 
                shadow-soft hover:shadow-medium hover:border-accent/30 
                transition-all card-hover cursor-pointer">

/* Active card */
<div className="bg-white border border-accent shadow-soft 
                rounded-xl p-4">

/* Card with header */
<div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
  <div className="px-4 py-3 bg-slate-50 border-b border-slate-200">
    Header
  </div>
  <div className="p-4">
    Body
  </div>
</div>
```

---

## 🎨 Gradients

### Text Gradients
```css
.text-gradient {
  background: linear-gradient(135deg, #8b5cf6, #6366f1, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### Background Gradients
```css
.bg-gradient-primary {
  background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 50%, #3b82f6 100%);
}

.bg-gradient-soft {
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
}
```

### Usage
```tsx
<h1 className="text-gradient">Title</h1>
<div className="bg-gradient-primary text-white p-4">Content</div>
```

---

## 🌟 Shadows

### Shadow Scale
```css
shadow-soft:    0 2px 8px rgba(0,0,0,0.08)    /* Subtle */
shadow-medium:  0 4px 16px rgba(0,0,0,0.12)   /* Normal */
shadow-large:   0 8px 32px rgba(0,0,0,0.16)   /* Prominent */
```

### Usage
```tsx
<div className="shadow-soft">Soft shadow</div>
<div className="shadow-medium">Medium shadow</div>
<div className="shadow-large">Large shadow</div>
```

---

## 🔲 Border Radius

```css
rounded:      0.25rem   (4px)    /* Small */
rounded-md:   0.375rem  (6px)    /* Medium */
rounded-lg:   0.5rem    (8px)    /* Large (default) */
rounded-xl:   0.75rem   (12px)   /* Extra large */
rounded-full: 9999px             /* Circle/pill */
```

---

## ✨ Animations

### Keyframes
```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes pulseBorder {
  0%, 100% { border-color: rgba(139,92,246,0.3); }
  50% { border-color: rgba(139,92,246,0.8); }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

### Usage
```tsx
<div className="animate-fadeIn">Fades in</div>
<div className="animate-pulseBorder">Pulsing border</div>
<div className="animate-spin">Spinning</div>
```

---

## 🎯 Status Indicators

### Dot Indicators
```tsx
/* Idle */
<span className="w-1.5 h-1.5 rounded-full bg-slate-300" />

/* Generating */
<span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />

/* Done */
<span className="w-1.5 h-1.5 rounded-full bg-success" />

/* Error */
<span className="w-1.5 h-1.5 rounded-full bg-error" />
```

### Badge Indicators
```tsx
/* Success badge */
<div className="inline-flex items-center gap-2 px-3 py-1.5 
                rounded-full text-xs font-medium 
                bg-success/10 border border-success/20 text-success">
  <CheckCircle2 className="w-3.5 h-3.5" />
  Success
</div>

/* Error badge */
<div className="inline-flex items-center gap-2 px-3 py-1.5 
                rounded-full text-xs font-medium 
                bg-error/10 border border-error/20 text-error">
  <AlertCircle className="w-3.5 h-3.5" />
  Error
</div>

/* Loading badge */
<div className="inline-flex items-center gap-2 px-3 py-1.5 
                rounded-full text-xs font-medium 
                bg-accent/10 border border-accent/20 text-accent">
  <Loader2 className="w-3.5 h-3.5 animate-spin" />
  Loading...
</div>
```

---

## 🎨 Icon Usage

### Icon Sizes
```tsx
/* Small */
<Icon className="w-3 h-3" />       /* 12px */
<Icon className="w-3.5 h-3.5" />   /* 14px */
<Icon className="w-4 h-4" />       /* 16px (default) */

/* Medium */
<Icon className="w-5 h-5" />       /* 20px */
<Icon className="w-6 h-6" />       /* 24px */

/* Large */
<Icon className="w-8 h-8" />       /* 32px */
<Icon className="w-12 h-12" />     /* 48px */
```

### Common Icons
```tsx
import { 
  Plus, Trash2, Eye, Download, 
  Sparkles, Play, Loader2,
  CheckCircle2, AlertCircle, Info,
  FolderOpen, Images, Activity,
  Key, FileText, X
} from 'lucide-react';
```

---

## 📱 Responsive Design

### Breakpoints
```css
sm:   640px   /* Small devices */
md:   768px   /* Tablets */
lg:   1024px  /* Desktops */
xl:   1280px  /* Large desktops */
2xl:  1536px  /* Extra large */
```

### Usage
```tsx
/* Hide on mobile, show on desktop */
<div className="hidden md:block">

/* Stack on mobile, row on desktop */
<div className="flex flex-col md:flex-row">

/* Full width on mobile, constrained on desktop */
<div className="w-full md:max-w-md">
```

---

## 🎨 Layout Patterns

### Flex Layouts
```tsx
/* Horizontal spacing */
<div className="flex items-center gap-2">

/* Vertical stack */
<div className="flex flex-col gap-4">

/* Space between */
<div className="flex items-center justify-between">

/* Centered */
<div className="flex items-center justify-center">
```

### Grid Layouts
```tsx
/* Auto-fill responsive grid */
<div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">

/* Fixed columns */
<div className="grid grid-cols-2 md:grid-cols-4 gap-3">
```

---

## 🎯 Common Patterns

### Empty States
```tsx
<div className="flex flex-col items-center gap-4 text-slate-400 text-center">
  <Icon className="w-16 h-16 opacity-20" />
  <div>
    <p className="text-base font-medium mb-1">No items yet</p>
    <p className="text-sm">Click "Add" to get started</p>
  </div>
</div>
```

### Loading States
```tsx
<div className="flex items-center gap-2 text-accent">
  <Loader2 className="w-4 h-4 animate-spin" />
  <span className="text-sm">Loading...</span>
</div>
```

### Progress Bars
```tsx
<div className="h-1 bg-slate-200 rounded-full overflow-hidden">
  <div 
    className="h-full bg-gradient-primary transition-all duration-300"
    style={{ width: `${progress}%` }}
  />
</div>
```

---

## 🎨 Hover Effects

### Card Hover
```tsx
<div className="card-hover transition-all hover:-translate-y-0.5 
                hover:shadow-medium">
```

### Button Hover
```tsx
<button className="hover:brightness-110 hover:scale-105 
                   transition-transform">
```

### Image Overlay
```tsx
<div className="group relative">
  <img src="..." />
  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 
                  transition-all flex items-center justify-center 
                  opacity-0 group-hover:opacity-100">
    <Eye className="w-8 h-8 text-white" />
  </div>
</div>
```

---

## 📏 Consistent Spacing

### Component Spacing
```tsx
/* Header */
<header className="py-10 px-6">

/* TopBar */
<div className="px-6 py-4">

/* Sidebar */
<aside className="p-3">

/* Main content */
<main className="p-6">

/* Cards */
<div className="p-4">        /* Normal */
<div className="p-5">        /* Spacious */
<div className="px-4 py-3">  /* Compact */
```

---

## 🎯 Z-Index Scale

```css
z-0:     0       /* Base */
z-10:    10      /* Dropdowns */
z-20:    20      /* Sticky headers */
z-30:    30      /* Modals */
z-40:    40      /* Notifications */
z-50:    50      /* Tooltips */
z-9999:  9999    /* Lightbox/Overlay */
```

---

## 📚 Quick Copy Snippets

### Primary Button with Icon
```tsx
<button className="btn btn-primary flex items-center gap-2 shadow-soft">
  <Sparkles className="w-4 h-4" />
  Generate
</button>
```

### Card with Header
```tsx
<div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-soft">
  <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-200">
    <h3 className="text-sm font-semibold text-slate-700">Title</h3>
    <button className="btn btn-ghost text-xs py-1 px-2">Action</button>
  </div>
  <div className="p-4">Content here</div>
</div>
```

### Status Badge
```tsx
<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full 
                text-xs font-medium bg-success/10 border border-success/20 
                text-success">
  <CheckCircle2 className="w-3.5 h-3.5" />
  Completed
</div>
```

---

## 🎉 That's it!

Dengan design system ini, Anda bisa dengan cepat membuat UI yang konsisten dan profesional di seluruh aplikasi.

**Pro tip**: Bookmark halaman ini untuk quick reference! 📌
