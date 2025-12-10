"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@cognitolab/ui";

const features = [
  {
    title: "Éditeur de Circuits",
    description: "Créez et simulez des circuits électroniques en temps réel",
    icon: "⚡",
    href: "/circuit-editor",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    title: "Éditeur de Schémas",
    description: "Concevez des schémas électroniques professionnels",
    icon: "📐",
    href: "/schematic-editor",
    gradient: "from-cyan-500 to-teal-500"
  },
  {
    title: "Éditeur PCB",
    description: "Créez des circuits imprimés multi-couches",
    icon: "🔧",
    href: "/pcb-editor",
    gradient: "from-teal-500 to-green-500"
  },
  {
    title: "Simulateur Microcontrôleur",
    description: "Programmez et testez vos microcontrôleurs",
    icon: "🖥️",
    href: "/microcontroller-sim",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    title: "Simulateur Robotique",
    description: "Simulez et programmez des robots en 3D",
    icon: "🤖",
    href: "/robot-sim",
    gradient: "from-emerald-500 to-blue-500"
  },
  {
    title: "Cours & LMS",
    description: "Apprenez avec nos cours interactifs",
    icon: "📚",
    href: "/courses",
    gradient: "from-blue-500 to-indigo-500"
  }
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-cyan-500/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center mb-8"
            >
              <div className="relative w-32 h-32 md:w-40 md:h-40">
                <Image
                  src="/logo.png"
                  alt="CognitoLab"
                  width={160}
                  height={160}
                  className="drop-shadow-2xl"
                  priority
                />
              </div>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent"
            >
              CognitoLab
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto"
            >
              Plateforme complète d&apos;apprentissage électronique et robotique
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto"
            >
              Concevez, simulez et apprenez avec nos outils professionnels intégrés
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <Link href="/courses">
                <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all">
                  Commencer Maintenant
                </Button>
              </Link>
              <Link href="/about">
                <Button className="bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600 px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all">
                  En Savoir Plus
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-gray-900">
            Nos Outils Professionnels
          </h2>
          <p className="text-xl text-gray-600">
            Tout ce dont vous avez besoin pour vos projets électroniques
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <Link href={feature.href}>
                <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                  
                  <div className="relative">
                    <div className="text-5xl mb-4">{feature.icon}</div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                    
                    <div className="mt-6 flex items-center text-blue-600 font-semibold group-hover:gap-2 transition-all">
                      <span>Découvrir</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white"
        >
          <h2 className="text-4xl font-bold mb-6">
            Prêt à Commencer Votre Projet ?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Rejoignez des milliers d&apos;étudiants et professionnels qui utilisent CognitoLab
          </p>
          <Link href="/courses">
            <Button className="bg-white text-blue-600 hover:bg-gray-100 px-10 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all">
              Démarrer Gratuitement
            </Button>
          </Link>
        </motion.div>
      </section>
    </main>
  );
}

