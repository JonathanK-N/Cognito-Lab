import { create } from "zustand";
import { Component, Connection, generateId } from "@cognitolab/common";

interface CircuitState {
  components: Component[];
  connections: Connection[];
  addComponent: (component: Omit<Component, "id">) => void;
  removeComponent: (id: string) => void;
  updateComponent: (id: string, updates: Partial<Component>) => void;
  addConnection: (connection: Omit<Connection, "id">) => void;
  removeConnection: (id: string) => void;
  clear: () => void;
  setCircuit: (circuit: { components: Component[]; connections: Connection[] }) => void;
}

export const useCircuitStore = create<CircuitState>((set) => ({
  components: [],
  connections: [],

  addComponent: (component) =>
    set((state) => ({
      components: [...state.components, { ...component, id: generateId() }],
    })),

  removeComponent: (id) =>
    set((state) => ({
      components: state.components.filter((c) => c.id !== id),
      connections: state.connections.filter(
        (conn) => conn.from !== id && conn.to !== id
      ),
    })),

  updateComponent: (id, updates) =>
    set((state) => ({
      components: state.components.map((c) =>
        c.id === id ? { ...c, ...updates } : c
      ),
    })),

  addConnection: (connection) =>
    set((state) => ({
      connections: [...state.connections, { ...connection, id: generateId() }],
    })),

  removeConnection: (id) =>
    set((state) => ({
      connections: state.connections.filter((c) => c.id !== id),
    })),

  clear: () =>
    set({
      components: [],
      connections: [],
    }),

  setCircuit: (circuit) =>
    set({
      components: circuit.components,
      connections: circuit.connections,
    }),
}));

