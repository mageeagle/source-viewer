import { sectionClass } from "@/constants/styles";
import { useUser } from "../../hooks/useZustand";

export default function SectionToggler({
  name,
  rkey,
}: {
  name: string;
  rkey: string | number;
}) {
  return (
    <div
      className={sectionClass}
      onClick={() => useUser.getState().toggleZus(rkey)}
    >
      {name}
    </div>
  );
}
