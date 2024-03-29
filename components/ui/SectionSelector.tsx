import { sectionClass } from "@/constants/styles";
import { useUser } from "../../hooks/useZustand";

export default function SectionSelector({
  name,
  i,
}: {
  name: string;
  i: number;
}) {
  return (
    <div
      className={
        sectionClass +
        (useUser.getState().infoSection === i
          ? " underline underline-offset-4"
          : "")
      }
      onClick={() => useUser.getState().setZus("infoSection", i)}
    >
      {name}
    </div>
  );
}
