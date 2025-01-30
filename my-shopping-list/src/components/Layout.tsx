import React from "react";
import Header from "./template/Header";
import Footer from "./template/Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    
    <div className="min-h-screen flex flex-col bg-base-gradient text-gray-900">
      <Header />
      <main className="flex-grow flex flex-col items-start p-4 overflow-y">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
