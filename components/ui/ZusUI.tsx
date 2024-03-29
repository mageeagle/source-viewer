import { smallInputClass } from "@/constants/styles";
import { setUser, useUser } from "@/hooks/useZustand";

const Toggle = ({
  check,
  func,
  text,
}: {
  check: boolean;
  func: string | number;
  text: string;
}) => {
  return (
    <div className="w-fit flex items-center ml-2">
      <input
        className="mr-2"
        type="checkbox"
        checked={check}
        onChange={() => useUser.getState().toggleZus(func)}
      ></input>
      <div>{text}</div>
    </div>
  );
};

const NumInput = ({
  val,
  rkey,
  text,
}: {
  val: number;
  rkey: string | number;
  text: string;
}) => {
  return (
    <div className="my-2 ml-2">
      {text}{" "}
      <input
        className={smallInputClass}
        value={val}
        type="number"
        onChange={(e) =>
          setUser(rkey, Number(e.target.value))
        }
      />
    </div>
  );
};

export { NumInput, Toggle };
