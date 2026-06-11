import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="text-center py-10 px-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="flex justify-end mb-4 px-6">
        <ThemeToggle />
      </div>
      <div className="inline-flex items-center gap-2 bg-accent/10 dark:bg-accent/20 rounded-full px-4 py-1.5 text-xs font-medium tracking-wide uppercase text-accent dark:text-accent-light mb-4">
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        Raho Premier AI Studio
      </div>
      <h1 className="font-display font-bold text-4xl md:text-5xl text-gradient leading-tight mb-3">
        Instagram Carousel Generator
      </h1>
      <p className="text-slate-500 dark:text-slate-400 text-sm max-w-lg mx-auto">
        Kelola banyak konten dengan mudah — setiap konten dapat memiliki multiple slides
      </p>
    </header>
  );
}