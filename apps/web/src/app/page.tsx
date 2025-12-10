import Link from "next/link";
import { Button } from "@cognitolab/ui";

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">CognitoLab</h1>
        <p className="text-xl mb-8">
          Plateforme complète d&apos;apprentissage électronique et robotique
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link href="/circuit-editor">
            <Button>Éditeur de Circuits</Button>
          </Link>
          <Link href="/schematic-editor">
            <Button>Éditeur de Schémas</Button>
          </Link>
          <Link href="/pcb-editor">
            <Button>Éditeur PCB</Button>
          </Link>
          <Link href="/microcontroller-sim">
            <Button>Simulateur Microcontrôleur</Button>
          </Link>
          <Link href="/robot-sim">
            <Button>Simulateur Robotique</Button>
          </Link>
          <Link href="/courses">
            <Button>Cours LMS</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}

