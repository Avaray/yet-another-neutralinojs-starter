import { Icon } from "@iconify/react";
// import { app, events, os, computer } from "@neutralinojs/lib";
import { useTranslation } from "react-i18next";

export default function Info() {
  const { t } = useTranslation();

  const modeElement = (mode: string) => {
    const url = `https://neutralino.js.org/docs/configuration/modes#${mode}`;
    const paragraph = (
      <p className="flex flex-row">
        {t("mode")}:
        <a href={url} target="_blank" rel="noreferrer">
          <span className="capitalize font-bold">{mode}</span>
          <Icon icon="arcticons:url-checker" className="h-7 w-7" />
        </a>
      </p>
    );
    return paragraph;
  };

  return (
    <>
      <div className="flex flex-grow p-3 m-3 flex-col whitespace-nowrap">
        <p>
          {t("os")}: <span className="font-bold">{NL_OS} {NL_ARCH}</span>
        </p>
        <p>
          {t("frameworkVersion")}:{" "}
          <span className="font-bold">{NL_VERSION}</span>
        </p>
        <p>
          {t("clientVersion")}: <span className="font-bold">{NL_CVERSION}</span>
        </p>
        {modeElement(NL_MODE)}
      </div>
      <div className="flex-grow p-4">
        <Icon
          icon="simple-icons:neutralinojs"
          className="h-full w-full opacity-10"
        />
      </div>
    </>
  );
}
