import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CognitoLab - Plateforme d'apprentissage électronique et robotique",
  description: "Apprenez l'électronique et la robotique avec nos simulateurs professionnels, éditeurs de circuits et cours interactifs.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <nav className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <div className="w-10 h-10 relative">
                  <svg viewBox="0 0 512 512" className="w-full h-full">
                    <path d="M256 50 L430 150 L430 350 L256 450 L82 350 L82 150 Z" 
                          fill="none" stroke="#0066CC" strokeWidth="20" strokeLinejoin="round"/>
                    <circle cx="256" cy="256" r="60" fill="none" stroke="#0066CC" strokeWidth="20"/>
                  </svg>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  CognitoLab
                </span>
              </Link>
              
              <div className="hidden md:flex items-center gap-6">
                <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                  À Propos
                </Link>
                <Link href="/courses" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                  Cours
                </Link>
                <Link href="/courses" className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all font-medium">
                  Commencer
                </Link>
              </div>
            </div>
          </div>
        </nav>
        
        <Providers>{children}</Providers>
        
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8">
                    <svg viewBox="0 0 512 512" className="w-full h-full">
                      <path d="M256 50 L430 150 L430 350 L256 450 L82 350 L82 150 Z" 
                            fill="none" stroke="#fff" strokeWidth="20" strokeLinejoin="round"/>
                      <circle cx="256" cy="256" r="60" fill="none" stroke="#fff" strokeWidth="20"/>
                    </svg>
                  </div>
                  <span className="text-xl font-bold">CognitoLab</span>
                </div>
                <p className="text-gray-400">
                  Plateforme d&apos;apprentissage électronique et robotique
                </p>
              </div>
              
              <div>
                <h3 className="font-bold mb-4">Outils</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/circuit-editor" className="hover:text-white transition-colors">Éditeur de Circuits</Link></li>
                  <li><Link href="/schematic-editor" className="hover:text-white transition-colors">Éditeur de Schémas</Link></li>
                  <li><Link href="/pcb-editor" className="hover:text-white transition-colors">Éditeur PCB</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold mb-4">Simulateurs</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/microcontroller-sim" className="hover:text-white transition-colors">Microcontrôleurs</Link></li>
                  <li><Link href="/robot-sim" className="hover:text-white transition-colors">Robotique</Link></li>
                  <li><Link href="/courses" className="hover:text-white transition-colors">Cours LMS</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold mb-4">À Propos</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/about" className="hover:text-white transition-colors">Notre Mission</Link></li>
                  <li><Link href="/about" className="hover:text-white transition-colors">L&apos;Équipe</Link></li>
                  <li><Link href="/about" className="hover:text-white transition-colors">Contact</Link></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2025 CognitoLab. Tous droits réservés.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

