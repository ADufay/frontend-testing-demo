import { createStore } from 'zustand/vanilla';
import { Dependencies } from './dependencies.model';
import { initDependencies } from './initDependencies';

type DependenciesStore = {
  dependencies: Dependencies;
  setDependencies: (dependencies: Dependencies) => void;
};

export const dependenciesStore = createStore<DependenciesStore>((set) => ({
  dependencies: initDependencies(),
  setDependencies: (dependencies: Dependencies) =>
    set((state) => {
      return { ...state, dependencies };
    })
}));
