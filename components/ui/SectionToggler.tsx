import { sectionClass } from "@/constants/styles";
import { useUser } from "../../hooks/useZustand";

export default function SectionToggler({
  name,
  nameTrue,
  check,
  rkey,
}: {
  name: string;
  nameTrue?: string;
  check?: boolean;
  rkey: string | number;
}) {
  return (
    <div
      className={sectionClass}
      onClick={() => useUser.getState().toggleZus(rkey)}
    >
      {check ? nameTrue : name}
    </div>
  );
}
