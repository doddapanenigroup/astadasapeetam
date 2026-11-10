import './globals.css';
import AppShell from '../components/AppShell';

export const metadata = {
  title: 'Astadasapeetam.com - Devotion • Faith • Dharma | Daily Panchangam, Astrology & Temples',
  description: 'Your sacred daily portal for Devotional News, Daily Panchangam, Hindu Festivals, Temple Guides, Astrology Consultations, and Sacred Products.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' }
    ],
    shortcut: '/favicon.ico',
    apple: '/icon.png'
  }
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
                    } else {
                      var emoji = b.faviconEmoji || '🕉️';
                      try {
                        var canvas = document.createElement('canvas');
                        canvas.width = 64;
                        canvas.height = 64;
                        var ctx = canvas.getContext('2d');
                        if (ctx) {
                          var grad = ctx.createLinearGradient(0, 0, 64, 64);
                          grad.addColorStop(0, '#78131e');
                          grad.addColorStop(1, '#9e1c2a');
                          ctx.fillStyle = grad;
                          ctx.beginPath();
                          ctx.arc(32, 32, 29, 0, Math.PI * 2);
                          ctx.fill();
                          ctx.lineWidth = 3;
                          ctx.strokeStyle = '#f59e0b';
                          ctx.stroke();
                          ctx.font = '34px sans-serif';
                          ctx.textAlign = 'center';
                          ctx.textBaseline = 'middle';
                          ctx.fillText(emoji, 32, 34);
                          iconUrl = canvas.toDataURL('image/png');
                        }
                      } catch(e) {}
                    }
                    if (iconUrl) {
                      var existing = document.querySelectorAll("link[rel*='icon']");
                      existing.forEach(function(el) { if (el.parentNode) el.parentNode.removeChild(el); });
                      var link = document.createElement('link');
                      link.id = 'dynamic-sanctuary-favicon';
                      link.rel = 'icon';
                      link.type = 'image/png';
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
