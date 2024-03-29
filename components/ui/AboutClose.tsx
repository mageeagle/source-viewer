import CloseButton from "./CloseButton";
import { setUser, useUser } from "../../hooks/useZustand";

function AboutClose() {
  return (
    <button
      className="h-12 w-12 m-4 fill-current text-gray-400 active:text-gray-800 focus:outline-none hover:text-gray-600"
      id="close"
      onClick={() => {
        setUser("about", false);
      }}
      type="button"
    >
      <CloseButton />
    </button>
  );
}

export default AboutClose;
