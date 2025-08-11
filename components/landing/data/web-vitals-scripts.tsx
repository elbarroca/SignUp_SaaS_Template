'use client';

import Script from 'next/script';
import { useReportWebVitals } from 'next/web-vitals';
import { sendToUmami } from '@/lib/web-vitals';

export function WebVitalsScripts() {
  useReportWebVitals(sendToUmami);

  return (
    <>
      {/* Google Tag Manager - Part 1 */}
      <Script id="gtm-script" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-P94LD5L2');`}
      </Script>
      {/* End Google Tag Manager */}
      <script
        defer
        data-website-id="9d3692b2-a771-4faa-9396-a8827181a305" // <<< REPLACE WITH YOUR UMAMI WEBSITE ID
        src="https://cloud.umami.is/script.js" // <<< REPLACE WITH YOUR UMAMI DOMAIN
      ></script>
    </>
  );
}
