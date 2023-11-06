import { create, UseBoundStore } from "zustand";
import { immer } from "zustand/middleware/immer";
import { produce } from "immer";
// import { shallow } from 'zustand/shallow'
import OSC from "osc-js";
import { MutableRefObject } from "react";

// Spread an array of keys into shallow: Depreciated, use useShallow
// export const sprArr = (arr: Array<any>) => {
//   return (state: { [x: string | number]: any; }) => ({ ...arr.reduce((acc, id) => ({ ...acc, [id]: state[id] }), 0) })
// }

// Subscribe here updates values to a useRef which prevents rerendering every time a value updates
export const subKey = (
  hook: UseBoundStore<any>,
  key1: MutableRefObject<any>,
  key2: string | number
) => {
  hook.subscribe(
    (state: { [x: string | number]: any }) => (key1.current = state[key2])
  );
};

export const subNestedKey = (
  hook: UseBoundStore<any>,
  key1: MutableRefObject<any>,
  key2: string | number,
  key3: string | number
) => {
  hook.subscribe(
    (state: { [x: string | number]: { [x: string | number]: any } }) =>
      (key1.current = state[key2][key3])
  );
};

// Set type for store / Only for typescript
interface StoreState {
  bgColor: string;
  sourceColor: {
    [index: number]: { r: number; g: number; b: number; a: number };
  };
  speakerColor: {
    [index: number]: { r: number; g: number; b: number; a: number };
  };
  osc: OSC | null;
  initialized: boolean;
  started: boolean;
  about: boolean;
  ip: string;
  port: number;
  pos: Array<number>;
  dir: Array<number>;
  sourceNo: number;
  speakerNo: number;
  god: boolean;
  free: boolean;
  connected: boolean;
  infoSection: number;
  sourceFade: boolean;
  start: () => void;
  reset: () => void;
  init: () => void;
  aboutToggle: () => void;
  setOsc: (osc: OSC) => void;
  setIp: (a: string) => void;
  setPort: (a: number) => void;
  setPos: (a: Array<number>) => void;
  setDir: (a: Array<number>) => void;
  setSourceNo: (a: number) => void;
  setSpeakerNo: (a: number) => void;
  setSourceColor: (color: {
    r: number;
    g: number;
    b: number;
    a: number;
  }) => void;
  setSpeakerColor: (color: {
    r: number;
    g: number;
    b: number;
    a: number;
  }) => void;
  setBgColor: (color: string) => void;
  toggleSourceFade: () => void;
  setZus: (key: string | number, hi: any) => void;
  setNestedZus: (key1: string | number, key2: string | number, hi: any) => void;
}

// Initial Values
const user = {
  osc: null,
  god: true,
  free: true,
  initialized: false,
  started: false,
  about: false,
  sourceFade: true,
  connected: false,
  infoSection: 1,
  ip: "localhost",
  port: 8080,
  pos: [0, 0, 0],
  dir: [0, 0, 0],
  sourceNo: 1,
  speakerNo: 0,
  sourceColor: {},
  speakerColor: {},
  bgColor: "Black",
};

// Create the hook, with set functions
export const useUser = create<StoreState>()(
  immer((set) => ({
    ...user,
    start: () => set(() => ({ started: true })),
    reset: () => set(() => ({ started: false, initialized: false })),
    init: () => set(() => ({ initialized: true })),
    aboutToggle: () => set((state) => ({ about: !state.about })),
    setOsc: (osc) => set(() => ({ osc: osc })),
    setIp: (ip) => set(() => ({ ip: ip })),
    setPort: (port) => set(() => ({ port: port })),
    setPos: (pos) => set(() => ({ pos: pos })),
    setDir: (dir) => set(() => ({ dir: dir })),
    setSourceNo: (sourceNo) => set(() => ({ sourceNo: sourceNo })),
    setSpeakerNo: (speakerNo) => set(() => ({ speakerNo: speakerNo })),
    setZus: (key, hi) => set(() => ({ [key]: hi })),
    setNestedZus: (key1, key2, hi) =>
      set(
        produce((state) => {
          state[key1][key2] = hi;
        })
      ),
    setSpeakerColor: (color) => set(() => ({ speakerColor: color })),
    setSourceColor: (color) => set(() => ({ sourceColor: color })),
    setBgColor: (color) => set(() => ({ bgColor: color })),
    toggleSourceFade: () => set((state) => ({ sourceFade: !state.sourceFade })),
  }))
);

// Depreciated: Use useShallow
// export const useUserData = (selector) => useUser(selector, shallow)
// export const useShallow = (hook, selector) => hook(selector, shallow)
