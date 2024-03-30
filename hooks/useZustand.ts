import { create, UseBoundStore } from "zustand";
import { immer } from "zustand/middleware/immer";
import { produce } from "immer";
// import { shallow } from 'zustand/shallow'
import OSC from "osc-js";
import { MutableRefObject } from "react";
import { Color, InstancedMesh, Mesh, Object3D, Vector, Vector3 } from "three";

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
  // Speaker/Source Control
  bgColor: { r: number; g: number; b: number };
  sourceColor: {
    [index: number]: Color;
  };
  speakerColor: {
    [index: number]: Color;
  };
  speakerAlpha: { [index: number]: Vector3 };
  sourceAlpha: { [index: number]: Vector3 };
  speakerSize: number;
  sourceSize: number;
  sourceNumDisplay: boolean;
  speakerNumDisplay: boolean;
  speakerPos: { [index: number]: Vector3 };
  sourcePos: { [index: number]: Vector3 };
  sourceNo: number;
  speakerNo: number;
  sourceRef: InstancedMesh | null;
  speakerRef: InstancedMesh | null;
  sourceFade: boolean;

  // OSC
  osc: OSC | null;
  ip: string;
  port: number;
  connected: boolean;
  sendOsc: boolean;
  sendAed: boolean;

  // Interface
  initialized: boolean;
  started: boolean;
  about: boolean;
  displayInterface: boolean;
  infoSection: number;
  disableInterface: boolean;

  // First Person
  pos: Array<number>;
  dir: Array<number>;
  god: boolean;
  free: boolean;

  // Grid
  axisToggle: boolean;
  gridXZToggle: boolean;
  gridYZToggle: boolean;
  gridXYToggle: boolean;
  gridXZInf: boolean;
  gridYZInf: boolean;
  gridXYInf: boolean;
  gridPosXZ: [number, number, number];
  gridPosYZ: [number, number, number];
  gridPosXY: [number, number, number];
  gridSize: number;
  sectionSize: number;
  subGridDiv: number;
  gridColor: { r: number; g: number; b: number };
  subGridColor: { r: number; g: number; b: number };

  // Editor
  activeID: number;
  activeObj: Object3D | null;
  activeGroup: string;
  activeLoc: [number, number, number];
  activeTrans: boolean;
  editSnap: boolean;

  // Interface
  start: () => void;
  reset: () => void;
  init: () => void;
  aboutToggle: () => void;

  // OSC
  setOsc: (osc: OSC) => void;
  setIp: (a: string) => void;
  setPort: (a: number) => void;

  // Player Position
  setPos: (a: Array<number>) => void;
  setDir: (a: Array<number>) => void;

  // Source/Source Control
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
  setBgColor: (color: { r: number; g: number; b: number }) => void;
  toggleSourceFade: () => void;

  // All in One State Changer
  setZus: (key: string | number, hi: any) => void;
  toggleZus: (key: string | number) => void;
  setNestedZus: (key1: string | number, key2: string | number, hi: any) => void;
}

// Initial Values
const user = {
  // First Person State
  god: true,
  free: true,
  pos: [0, 0, 0],
  dir: [0, 0, 0],

  // Interface
  initialized: false,
  started: false,
  about: false,
  displayInterface: true,
  infoSection: 1,
  disableInterface: false,

  // OSC
  osc: null,
  ip: "localhost",
  port: 8080,
  connected: false,
  sendOsc: false,
  sendAed: false,
  
  // Grid
  axisToggle: true,
  gridXZToggle: false,
  gridYZToggle: false,
  gridXYToggle: false,
  gridXZInf: false,
  gridYZInf: false,
  gridXYInf: false,
  gridPosXZ: [0, 0, 0] as [number, number, number],
  gridPosYZ: [0, 0, 0] as [number, number, number],
  gridPosXY: [0, 0, 0] as [number, number, number],
  gridSize: 10,
  sectionSize: 1,
  subGridDiv: 2,
  gridColor: { r: 255, g: 255, b: 255 },
  subGridColor: { r: 127, g: 127, b: 127 },

  // Source/Speaker Control
  bgColor: { r: 0, g: 0, b: 0 },
  sourceNo: 1,
  speakerNo: 0,
  sourcePos: {},
  speakerPos: {},
  sourceColor: {},
  speakerColor: {},
  sourceAlpha: {},
  speakerAlpha: {},
  speakerSize: 100,
  sourceSize: 50,
  sourceNumDisplay: false,
  speakerNumDisplay: false,
  sourceRef: null,
  speakerRef: null,
  sourceFade: true,

  // Editor
  activeID: 0,
  activeObj: null,
  activeGroup: "source",
  activeLoc: [0, 0, 0] as [number, number, number],
  activeTrans: false,
  editSnap: false,
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

export const setUser = (key: string | number, val: any) =>
  useUser.getState().setZus(key, val);
// Depreciated: Use useShallow
// export const useUserData = (selector) => useUser(selector, shallow)
// export const useShallow = (hook, selector) => hook(selector, shallow)
