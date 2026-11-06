import './globals.css';
import TopUtilityBar from '../components/TopUtilityBar';
import HeaderNav from '../components/HeaderNav';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Astadasapeetam.com - Devotion • Faith • Dharma | Daily Panchangam, Astrology & Temples',
  description: 'Your sacred daily portal for Devotional News, Daily Panchangam, Hindu Festivals, Temple Guides, Astrology Consultations, and Sacred Products.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const cleanExtAttrs = () => {
                    document.querySelectorAll('[fdprocessedid]').forEach(function(el) {
                      el.removeAttribute('fdprocessedid');
                    });
                  };
                  cleanExtAttrs();
                  if (typeof MutationObserver !== 'undefined') {
                    var observer = new MutationObserver(function(mutations) {
                      for (var i = 0; i < mutations.length; i++) {
                        if (mutations[i].type === 'attributes' && mutations[i].attributeName === 'fdprocessedid') {
                          mutations[i].target.removeAttribute('fdprocessedid');
                        }
                      }
                    });
                    observer.observe(document.documentElement, { 
                      attributes: true, 
                      subtree: true, 
                      attributeFilter: ['fdprocessedid'] 
                    });
                  }
                  window.addEventListener('DOMContentLoaded', cleanExtAttrs);
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#fcf9f2] text-stone-900 antialiased selection:bg-amber-200 selection:text-amber-950" suppressHydrationWarning>
        <TopUtilityBar />
        <HeaderNav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
