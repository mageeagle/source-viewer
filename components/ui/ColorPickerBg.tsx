import { useUser } from "@/hooks/useZustand";
import { RgbColorPicker } from "react-colorful";
import { useShallow } from "zustand/react/shallow";

export default function ColorPicker({ addClass }: { addClass?: string }) {
  const [bgColor, setBgColor] = useUser(
    useShallow((s) => [s.bgColor, s.setBgColor])
  );

  return (
    <div className={"max-lg:mt-4 " + addClass}>
      <div className="my-2 font-semibold">Background Color</div>
      <RgbColorPicker color={bgColor} onChange={setBgColor} />
    </div>
  );
}
