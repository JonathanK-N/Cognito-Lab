"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@cognitolab/ui";

const stats = [
  { label: "Utilisateurs Actifs", value: "10,000+", icon: "👥" },
  { label: "Projets Créés", value: "50,000+", icon: "🚀" },
  { label: "Cours Disponibles", value: "100+", icon: "📚" },
  { label: "Pays Couverts", value: "50+", icon: "🌍" }
];

const team = [
  { name: "Équipe Pédagogique", description: "Experts en électronique et robotique", icon: "🎓" },
  { name: "Développeurs", description: "Créateurs d'outils innovants", icon: "💻" },
  { name: "Communauté", description: "Des milliers d'apprenants passionnés", icon: "🤝" }
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 py-20">
        <div className="absolute inset-0 bg-grid-white/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center mb-8"
            >
              <div className="relative w-24 h-24">
                <Image
                  src="/logo.svg"
                  alt="CognitoLab"
                  width={96}
                  height={96}
                  className="drop-shadow-2xl"
                />
              </div>
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              À Propos de CognitoLab
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              La plateforme d&apos;apprentissage électronique et robotique nouvelle génération
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div>
            <h2 className="text-4xl font-bold mb-6 text-gray-900">
              Notre Mission
            </h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              CognitoLab a pour mission de démocratiser l&apos;accès à l&apos;apprentissage de l&apos;électronique
              et de la robotique en offrant des outils professionnels, intuitifs et accessibles à tous.
            </p>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Nous croyons que chacun devrait avoir la possibilité d&apos;apprendre, de créer et d&apos;innover
              dans le domaine de l&apos;électronique, que ce soit pour l&apos;éducation, les loisirs ou
              le développement professionnel.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Notre plateforme combine simulation en temps réel, outils de conception professionnels
              et contenu pédagogique de qualité pour offrir une expérience d&apos;apprentissage complète.
            </p>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-8 shadow-2xl">
              <div className="text-white space-y-6">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">🎯</div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Vision</h3>
                    <p className="opacity-90">Devenir la référence mondiale pour l&apos;apprentissage électronique interactif</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="text-4xl">💡</div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Innovation</h3>
                    <p className="opacity-90">Développer des outils à la pointe de la technologie</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="text-4xl">🌟</div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Excellence</h3>
                    <p className="opacity-90">Offrir une expérience d&apos;apprentissage de qualité supérieure</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              CognitoLab en Chiffres
            </h2>
            <p className="text-xl text-gray-600">
              Une communauté grandissante de passionnés
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-5xl mb-4">{stat.icon}</div>
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-gray-900">
            Notre Équipe
          </h2>
          <p className="text-xl text-gray-600">
            Des experts passionnés au service de votre apprentissage
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all text-center"
            >
              <div className="text-6xl mb-4">{member.icon}</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">
                {member.name}
              </h3>
              <p className="text-gray-600">
                {member.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center text-white mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              Ce Qui Nous Rend Uniques
            </h2>
            <p className="text-xl opacity-90">
              Des fonctionnalités pensées pour votre réussite
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Simulation Temps Réel", description: "Testez vos circuits instantanément", icon: "⚡" },
              { title: "Outils Professionnels", description: "Les mêmes outils utilisés en industrie", icon: "🛠️" },
              { title: "Apprentissage Interactif", description: "Cours pratiques et engageants", icon: "🎮" },
              { title: "Collaboration", description: "Partagez et travaillez en équipe", icon: "👥" },
              { title: "Support Multi-plateformes", description: "Accessible partout, tout le temps", icon: "📱" },
              { title: "Communauté Active", description: "Entraide et partage d'expérience", icon: "💬" }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="opacity-90">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-12 text-center text-white shadow-2xl"
        >
          <h2 className="text-4xl font-bold mb-6">
            Rejoignez CognitoLab Aujourd&apos;hui
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Commencez votre voyage dans l&apos;électronique et la robotique
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/courses">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-xl">
                Explorer les Cours
              </Button>
            </Link>
            <Link href="/">
              <Button className="bg-transparent border-2 border-white hover:bg-white/10 px-8 py-4 text-lg font-semibold">
                Retour à l&apos;Accueil
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}

