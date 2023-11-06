import { useUser } from "@/hooks/useZustand";
import { HexColorPicker } from "react-colorful";

export default function ColorPicker({ addClass }: { addClass?: string }) {
  const [bgColor, setBgColor] = useUser((s) => [s.bgColor, s.setBgColor]);
  return (
    <div className={"max-lg:mt-4 " + addClass}>
      <div className="my-2 font-semibold">Background Color</div>
      <HexColorPicker color={bgColor} onChange={setBgColor} />
    </div>
  );
}
