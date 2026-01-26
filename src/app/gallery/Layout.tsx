import React from 'react'

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`font-dmsans`}>
      <body>
        <main className="min-h-screen mt-16">{children}</main>
      </body>
    </html>
  );
}

