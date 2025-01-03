import React from "react";
import { os } from "@neutralinojs/lib";
import { useState } from "react";

export default function Playground() {
  const [rangeValue, setRangeValue] = useState(25);

  const showNotification = () => {
    os.showNotification("This is title", "This is message");
  };

  const showMessageBox = () => {
    os.showMessageBox(
      "This is title",
      "This is message",
    );
  };

  const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRangeValue(Number(event.target.value));
  };

  return (
    <>
      <div className="flex items-center gap-5 p-5">
        <div>
          <input
            type="range"
            min={0}
            max="100"
            value={rangeValue}
            className="range min-w-[40vw]"
            step="25"
            onChange={handleRangeChange}
          />
          <div className="flex w-full justify-between px-2 text-xs">
            <span>|</span>
            <span>|</span>
            <span>|</span>
            <span>|</span>
            <span>|</span>
          </div>
        </div>
        <div
          className="radial-progress text-primary"
          style={{
            "--value": rangeValue,
            "--thickness": "3px",
          } as React.CSSProperties}
          role="progressbar"
        >
          {rangeValue}
        </div>
      </div>
      <div>
        <button
          className="btn btn-primary mb-2 mr-2"
          onClick={() => {
            const modal = document.getElementById("my_modal_1");
            if (modal) {
              (modal as HTMLDialogElement).showModal();
            }
          }}
        >
          Show Modal
        </button>
        <button
          className="btn btn-secondary mb-2 mr-2"
          onClick={showNotification}
          type="button"
        >
          Show Notification
        </button>
        <button
          className="btn btn-accent mb-2 mr-2"
          onClick={showMessageBox}
          type="button"
        >
          Show Message Box
        </button>
      </div>

      <dialog id="my_modal_1" className="modal overflow-hidden">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
