## 3D Sound Source Visualizer for Spatial Audio

![](./docs/example.gif)

[Live Demo Here](https://source-viewer.vercel.app/)

Position Viewer in Browser for Object-Based Audio Spatialization via OSC, built with Next.js, Three.js (react-three-fiber) and osc-js.

The interface allows the viewing of sound sources and speaker position in a 3D Environment / First Person View in the browser, and allows viewing / controlling listener position / orientation across a network from a server through WebSockets.

An editor mode has been added to change positions of sources and speakers. Helpers such as grids, snapping and orientation changing have been added.

### Connection:
1) Open a WebSocket server for OSC on the host computer. (Please refer to Examples)
2) Open the Interface and enter the IP address and port number to connect. localhost in IP for local use on same computer.
3) Refer to the Info Button for Controls in the Interface

### Example
https://github.com/mageeagle/source-viewer-example

### Supported OSC Messages:
Position
```
/source/[index]/xyz [x y z]
/speaker/[index]/xyz [x y z]
/source/[index]/aed [a e d]
/speaker/[index]/aed [a e d]
```
Color
```
/source/[index]/color [r g b a] <Normalized Value 0-1>
/speaker/[index]/color [r g b a] <Normalized Value 0-1>
```
Number of Sources/Speakers displayed
```
/source/number <integer>
/speaker/number <integer>
```
Sources/Speakers Size
```
/source/number <number>
/speaker/number <number>
```
Sources/Speakers Display Channel Number
```
/source/numDisplay <Boolean: 0 or 1>
/speaker/numDisplay <Boolean: 0 or 1>
```
Sources fade when not moving
```
/source/fade <Boolean: 0 or 1>
```
Output AED instead of XYZ (Only for Sources/Speakers)
```
/output/aed <Boolean: 0 or 1>
```
Note: Coordinate and Quaternion formats follow the format in SPAT5.

Display Interface
```
/interface/display <Boolean: 0 or 1>
```
Disable Interface (Disables Input on Browser as well)
```
/interface/disable <Boolean: 0 or 1>
```
Axis Helper at Origin
```
/axis <Boolean: 0 or 1>
```
Planar Grid
```
/grid/xz/on <Boolean: 0 or 1>
/grid/xy/on <Boolean: 0 or 1>
/grid/yz/on <Boolean: 0 or 1>
```
Infinite Grid
```
/grid/xz/inf <Boolean: 0 or 1>
/grid/xy/inf <Boolean: 0 or 1>
/grid/yz/inf <Boolean: 0 or 1>
```
Grid Origin Position
```
/grid/xz/xyz [x y z]
/grid/xy/xyz [x y z]
/grid/yz/xyz [x y z]
```
Grid Size (Extent)
```
/grid/size <number>
```
Grid Section Size (Main Grid Size)
```
/grid/section/size <number>
```
Grid Division (Sub-Grid)
```
/grid/subdiv/num <number>
```

Grid/Sub-Grid Color
```
/grid/section/color [r g b] <Normalized Value 0-1>
/grid/subdiv/color [r g b] <Normalized Value 0-1>
```

Snap to Grid (Editor)
```
/grid/snap <Boolean: 0 or 1>
```

Background Color
```
/background/color [r g b] <Normalized Value 0-1>
```
#### Only From Viewer to Host
```
/listener/position [x y z]
```
```
/listener/orientation [z y x w] <Quaternion>
```
Note: Coordinate and Quaternion formats follow the format in SPAT5.

### Tips
#### Settings of Interface
You may change the settings of the interface via OSC instead of clicking on the interface. You may also send the settings of the current state of the interface via OSC, so you could save it and restore it afterwards. This also allows pre-configured settings to be set upon connection to the interface through the OSC bridge server. Please refer to the examples.

#### Performance Issues
The viewer may experience performance issues if there are more than a few hundred sources constantly updating, which is rarely the case. In this case, there is a Performance mode which uses InstancedMesh, which allows a large amount of source/speakers to be viewed at once without noticeable performance issues, at the cost of individual source opacity options and fading away if they are not moving.

#### Broadcasting to multiple devices
Source/Speaker Numbers and Colors are not saved across sessions and different devices. To keep consistancy, the data could be saved on the server and sent to new devices connected to the WebSocket server. This is out of scope of this Front-End Interface. Please refer to the examples.


### Future Plans
Add support for VR
