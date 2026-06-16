import { SITE_NAME, HOME_OG_IMAGE_URL } from '@/lib/constants';
import type { Metadata } from 'next';
import { Raleway } from 'next/font/google';
import cn from 'classnames';
import Link from 'next/link';
import AnimatedLink from '@/app/_components/animated-link';

import './globals.css';

const raleway = Raleway({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: SITE_NAME,
  description: `The personal portfolio of Justin Smith, a Louisiana-based front-end developer.`,
  openGraph: {
    images: [HOME_OG_IMAGE_URL],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#000000"
        />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta
          name="msapplication-config"
          content="/favicon/browserconfig.xml"
        />
        <meta name="theme-color" content="#000" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      </head>
      <body className={cn(raleway.className)}>
        <div className="min-h-screen flex">
          <aside
            className="w-full md:w-48 md:h-screen bg-repeat py-4 px-8 md:p-4 fixed top-0 left-0 z-10 text-white shadow-lg"
            style={{
              backgroundImage: "url('/assets/stardust.png')",
              boxShadow: '8px 0 24px -10px rgba(0, 0, 0, 0.5)',
            }}
          >
            <Link href="/" className="group block">
              <img
                src="/assets/jts-logo.svg"
                alt="Justin is a Maker Logo"
                className="hidden md:block w-full bg-white transition-colors duration-200 group-hover:bg-blue-100"
              />
              <h2 className="uppercase text-xl leading-tight mt-2 text-white group-hover:text-blue-300 transition-colors duration-200">
                Justin Smith
              </h2>
            </Link>
            <div className="hidden md:block absolute md:bottom-4 text-sm md:pr-4">
              <h6>
                Front-end software, open hardware, and human-centered design.
              </h6>
              <hr className="my-4 border-white" />
              <AnimatedLink href="/assets/justin-smith-resume.html/">
                Resume
              </AnimatedLink>
              <br />
              <AnimatedLink href="https://www.linkedin.com/in/justinisamaker/">
                LinkedIn
              </AnimatedLink>
              <br />
              <AnimatedLink href="https://github.com/justinisamaker">
                GitHub
              </AnimatedLink>
            </div>
          </aside>
          <div className="flex-1 md:ml-48 py-12 px-8 md:px-16">{children}</div>
        </div>
      </body>
    </html>
  );
}
