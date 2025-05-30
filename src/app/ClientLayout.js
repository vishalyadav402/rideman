import Script from "next/script";

export const metadata = {
    title: "X-Ride",
    description: "Welcome to X-Ride",
  };

export default function ClientLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Inter:slnt,wght@-10..0,100..900&display=swap" rel="stylesheet"></link>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css"></link>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css" rel="stylesheet"></link>
        <link rel="stylesheet" href="/lib/animate/animate.min.css"></link>
        <link href="/lib/lightbox/css/lightbox.min.css" rel="stylesheet"></link>
        <link href="/lib/owlcarousel/assets/owl.carousel.min.css" rel="stylesheet"></link>
        <link href="/css/bootstrap.min.css" rel="stylesheet"></link>
        <link href="/css/style.css" rel="stylesheet"></link>
      </head>
      <body>
        {children}

        <Script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></Script>
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js"></Script>
        <Script src="/lib/wow/wow.min.js"></Script>
        <Script src="/lib/easing/easing.min.js"></Script>
        <Script src="/lib/waypoints/waypoints.min.js"></Script>
        <Script src="/lib/counterup/counterup.min.js"></Script>
        <Script src="/lib/lightbox/js/lightbox.min.js"></Script>
        <Script src="/lib/owlcarousel/owl.carousel.min.js"></Script>
        <Script src="/js/main.js"></Script>
      </body>
    </html>
  );
}
