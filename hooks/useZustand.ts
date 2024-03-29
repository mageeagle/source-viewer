import { create, UseBoundStore } from "zustand";
import { immer } from "zustand/middleware/immer";
import { produce } from "immer";
// import { shallow } from 'zustand/shallow'
import OSC from "osc-js";
import { MutableRefObject } from "react";
import { Color, InstancedMesh, Vector, Vector3 } from "three";

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
    [index: number]: Color;
  };
  speakerColor: {
    [index: number]: Color;
  };
  speakerAlpha: { [index: number]: Vector3 };
  sourceAlpha: { [index: number]: Vector3 };
  osc: OSC | null;
  sourceRef: InstancedMesh | null;
  speakerRef: InstancedMesh | null;
  initialized: boolean;
  started: boolean;
  about: boolean;
  ip: string;
  port: number;
  pos: Array<number>;
  dir: Array<number>;
  speakerPos: { [index: number]: Vector3 };
  sourcePos: { [index: number]: Vector3 };
  sourceNo: number;
  speakerNo: number;
  god: boolean;
  free: boolean;
  connected: boolean;
  displayInterface: boolean;
  infoSection: number;
  sourceFade: boolean;
  axisToggle: boolean;
  gridXToggle: boolean;
  gridYToggle: boolean;
  gridZToggle: boolean;
  gridXInf: boolean;
  gridYInf: boolean;
  gridZInf: boolean;
  gridPosX: [number, number, number];
  gridPosY: [number, number, number];
  gridPosZ: [number, number, number];
  gridSize: number;
  sectionSize:number
  subGridSize: number;
  gridColor: string;
  subGridColor: string;
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
  toggleZus: (key: string | number) => void;
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
  displayInterface: true,
  infoSection: 1,
  ip: "localhost",
  port: 8080,
  pos: [0, 0, 0],
  dir: [0, 0, 0],
  axisToggle: true,
  gridXToggle: false,
  gridYToggle: false,
  gridZToggle: false,
  gridXInf: false,
  gridYInf: false,
  gridZInf: false,
  gridPosX: [0, 0, 0] as [number, number, number],
  gridPosY: [0, 0, 0] as [number, number, number],
  gridPosZ: [0, 0, 0] as [number, number, number],
  gridSize: 10,
  sectionSize: 1,
  subGridSize: 0.5,
  gridColor: 'White',
  subGridColor: 'Grey',
  sourceNo: 1,
  speakerNo: 0,
  sourcePos: {},
  speakerPos: {},
  sourceColor: {},
  speakerColor: {},
  sourceAlpha: {},
  speakerAlpha: {},
  sourceRef: null,
  speakerRef: null,
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
    toggleZus: (key) => set((s) => ({ [key]: !s[key as keyof typeof user] })),
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
