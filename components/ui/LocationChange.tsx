import { smallInputClass } from "@/constants/styles";
import { setUser } from "@/hooks/useZustand";
export default function LocationChange({
  loc: [x, y, z],
  rkey,
}: {
  loc: [number, number, number];
  rkey: string | number;
}) {
  return (
    <div className="my-2">
      Origin{" "}
      <input
        className={smallInputClass}
        value={x}
        type="number"
        onChange={(e) => setUser(rkey, [Number(e.target.value), y, z])}
      />{" "}
      <input
        className={smallInputClass}
        value={y}
        type="number"
        onChange={(e) => setUser(rkey, [x, Number(e.target.value), z])}
      />{" "}
      <input
        className={smallInputClass}
        value={z}
        type="number"
        onChange={(e) => setUser(rkey, [x, y, Number(e.target.value)])}
      />{" "}
    </div>
  );
}
