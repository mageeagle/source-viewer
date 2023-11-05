
function Keyboard ({ keyIn, extraClass, description, reverse }: { keyIn: string, extraClass?: string, description?: string, reverse?: boolean }) {
  return (
      <div className={"flex items-center" +  (reverse ? " flex-row-reverse" : "")}>
         <div className={'m-1 w-8 h-8 text-center border-2 rounded-sm border-gray-200 bg-gray-50 ' + extraClass}>
           {keyIn}
        </div>
        <p className={'ml-4 ' + extraClass}>
          {description}
        </p>
      </div>
  )
}

function KeyboardLong ({ keyIn, extraClass, description, reverse }: { keyIn: string, extraClass?: string, description?: string, reverse?: boolean }) {
  return (
      <li className={"flex items-center" +  (reverse ? " flex-row-reverse" : "")}>
         <div className={'m-1 w-12 h-8 text-center border-2 rounded-sm border-gray-200 bg-gray-50 ' + extraClass}>
           {keyIn}
        </div>
        <span className="ml-4">
          {description}
        </span>
      </li>
  )
}
function KeyboardVeryLong ({ keyIn, extraClass, description, reverse }: { keyIn: string, extraClass?: string, description?: string, reverse?: boolean }) {
  return (
      <li className={"flex items-center" +  (reverse ? " flex-row-reverse" : "")}>
         <div className={'m-1 px-2 h-8 text-center border-2 rounded-sm border-gray-200 bg-gray-50 ' + extraClass}>
           {keyIn}
        </div>
        <span className="ml-4">
          {description}
        </span>
      </li>
  )
}

export default function ControlsHelp ({ reverse }:{ reverse?: boolean }) {
  return (
    <>
  <div className="text-base leading-7">
    <div className="font-semibold my-2">
        Controls
    </div>
    <div className="items-center grid max-lg:block">
      <div className="max-md:hidden">
      <Keyboard reverse description="Up" keyIn="W" />
      <Keyboard reverse description="Down" keyIn="S" />
      <Keyboard reverse description="Left" keyIn="A" />
      <Keyboard reverse description="Right" keyIn="D" />
      <Keyboard reverse description="(Hold) Run Faster" keyIn="___" />
      <Keyboard reverse description="Open/Close Help and About" extraClass="font-bold" keyIn="H" />
      <Keyboard reverse description="Toggle First Person Perspective Mode" keyIn="E" />
      </div>
      <KeyboardLong reverse description="Pan in Bird Mode" keyIn="LClick" />
      <KeyboardLong reverse description="Rotate in Bird Mode" keyIn="RClick" />
      <KeyboardLong reverse description="Zoom in Bird Mode" keyIn="Scroll" />

    <KeyboardVeryLong reverse description="Rotate" keyIn="Hold and Slide" />
    <KeyboardVeryLong reverse description="Pan/Zoom" keyIn="Slide/Move with Two Fingers" />
    </div>
  </div>
</>
  )
}
