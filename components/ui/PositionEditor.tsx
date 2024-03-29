"use client";
import { useUser } from "../../hooks/useZustand";
import { selectClass, smallInputClass, topLeft } from "../../constants/styles";
import { useShallow } from "zustand/react/shallow";
import LocationChange from "./LocationChange";
import { useEffect } from "react";
import { Toggle } from "./ZusUI";

function PositionEditor() {
  const [activeID, activeObj, activeGroup, activeLoc, activeTrans, editSnap] =
    useUser(
      useShallow((s) => [
        s.activeID,
        s.activeObj,
        s.activeGroup,
        s.activeLoc,
        s.activeTrans,
        s.editSnap,
      ])
    );
  useEffect(() => {
    if (!activeObj) return;
    useUser.getState().setZus("activeLoc", activeObj.position.toArray());
  }, [activeObj]);
  useEffect(() => {
    if (!activeLoc || !activeObj || activeTrans) return;
    activeObj.position.fromArray(activeLoc);
  }, [activeLoc]);
  useEffect(() => {
    if (activeID === 0) useUser.getState().setZus("activeObj", null);
  }, [activeID]);
  return (
    <>
      {activeID !== 0 && (
        <div className={topLeft + " z-50"}>
          <div className="top-0 left-0 absolute grid grid-cols-1 text-gray-400 text-left">
            <div className="m-4 lg:w-max w-screen flex">
              <div className="w-fit">
                <div>
                  <select
                    className={selectClass + " " + smallInputClass + " w-24"}
                    value={activeGroup}
                    onChange={(e) => {
                      useUser.getState().setZus("activeGroup", e.target.value);
                    }}
                  >
                    <option key="source" value="source">
                      Source
                    </option>
                    <option key="speaker" value="speaker">
                      Speaker
                    </option>
                  </select>
                  <input
                    className={smallInputClass}
                    value={activeID}
                    type="number"
                    onChange={(e) =>
                      useUser
                        .getState()
                        .setZus("activeID", Math.round(Number(e.target.value)))
                    }
                  />
                  <Toggle
                    check={editSnap}
                    func={"editSnap"}
                    text={"Snap to Grid"}
                  />
                </div>
                <div>
                  <LocationChange loc={activeLoc} rkey={"activeLoc"} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PositionEditor;
