import * as React from "react";


interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="min-h-screen w-full antialiased flex flex-col">
      {children}
    </div>
  );
}