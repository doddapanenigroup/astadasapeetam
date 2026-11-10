import './globals.css';
import AppShell from '../components/AppShell';

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
                  // Fast favicon injection from stored branding
                  var raw = localStorage.getItem('astadasapeetam_branding');
                  if (raw) {
                    var b = JSON.parse(raw);
                    var iconUrl = '';
                    if (b.faviconType === 'image' && b.faviconUrl) {
                      iconUrl = b.faviconUrl;
                    } else if (b.faviconEmoji) {
                      var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="85">' + b.faviconEmoji + '</text></svg>';
                      iconUrl = 'data:image/svg+xml,' + encodeURIComponent(svg);
                    }
                    if (iconUrl) {
                      var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
                      link.rel = 'shortcut icon';
                      link.type = iconUrl.indexOf('data:image/svg') === 0 ? 'image/svg+xml' : 'image/x-icon';
                      link.href = iconUrl;
                      document.getElementsByTagName('head')[0].appendChild(link);
                    }
                  }

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
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
