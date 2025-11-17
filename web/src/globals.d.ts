declare global {
  // Neutralino global variables
  var NL_OS: string; // Operating system name: Linux, Windows, or Darwin
  var NL_ARCH: string; // CPU architecture: x64, arm, itanium, ia32, or unknown
  var NL_APPID: string; // Application identifier
  var NL_APPVERSION: string; // Application version
  var NL_PORT: number; // Application port
  var NL_MODE: "window" | "browser" | "cloud" | "chrome"; // Mode of the application
  var NL_VERSION: string; // Neutralinojs framework version
  var NL_CVERSION: string; // Neutralinojs client version
  var NL_CWD: string; // Current working directory
  var NL_PATH: string; // Application path
  var NL_ARGS: string[]; // Command-line arguments
  var NL_PID: number; // Identifier of the current process
  var NL_RESMODE: "bundle" | "directory"; // Source of application resources
  var NL_EXTENABLED: boolean; // Returns true if extensions are enabled
  var NL_COMMIT: string; // Framework binary's release commit hash
  var NL_CCOMMIT: string; // Client library's release commit hash
  var NL_CMETHODS: string[]; // Custom method identifiers (Returns the same output that custom.getMethods returns)
  var NL_WSAVSTLOADED: boolean; // Returns true if the initial window state was loaded from the saved configuration
}

export {}; // Makes this a module to avoid conflicts
