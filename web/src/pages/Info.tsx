import { Icon } from "@iconify/react";
// import { app, events, os, computer } from "@neutralinojs/lib";

export default function Info() {
  return (
    <>
        <p>Operating System: <span className='font-bold'>{NL_OS} {NL_ARCH}</span></p>
        <p>Framework version: <span className='font-bold'>{NL_VERSION}</span></p>
        <p>Client version: <span className='font-bold'>{NL_CVERSION}</span></p>
        <p>Mode: <span className='capitalize font-bold'>{NL_MODE}</span></p>
      <div className="flex flex-grow p-3 m-3 flex-col">
      </div>
      <div className="flex-grow p-4 mr-3vw">
        <Icon
          icon="simple-icons:neutralinojs"
          className="h-full w-full opacity-10"
        />
      </div>
    </>
  );
}
