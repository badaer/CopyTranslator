import {
  BrowserWindow,
  Rectangle,
  screen,
  nativeImage,
  remote
} from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import { envConfig } from "../envConfig";
import { RouteName } from "../action";
import { Controller } from "../../core/controller";

export function loadRoute(
  window: BrowserWindow,
  routeName: RouteName,
  main: boolean = false
) {
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    window.loadURL(envConfig.publicUrl + `/#/${routeName}`);
    if (!process.env.IS_TEST && main) window.webContents.openDevTools();
  } else {
    // Load the index.html when not in development
    if (main) {
      createProtocol("app");
    }
    const url = `${envConfig.publicUrl}/index.html#${routeName}`;
    window.loadURL(url);
  }
}

export function showSettings() {
  const width = 320,
    height = 640;
  const controller = <Controller>(<any>global).controller;
  const current_win = controller.win;
  const bound = current_win.getBound();
  const {
    x: xBound,
    x: yBound,
    width: screenWidth,
    height: screenHeight
  } = screen.getDisplayMatching(bound).bounds;
  const t = controller.getT();
  const window = new BrowserWindow({
    x: xBound + (screenWidth - width) / 2,
    y: yBound + (screenHeight - height) / 2,
    width: width,
    height: height,
    titleBarStyle: "hiddenInset",
    maximizable: false,
    minimizable: false,
    title: t("settings"),
    parent: current_win.window,
    show: true,
    icon: nativeImage.createFromPath(envConfig.iconPath)
  });
  loadRoute(window, RouteName.Settings);
}

export function showOCRConfig() {
  const width = 354,
    height = 510;
  const controller = <Controller>(<any>global).controller;
  const current_win = controller.win;
  const bound = current_win.getBound();
  const {
    x: xBound,
    x: yBound,
    width: screenWidth,
    height: screenHeight
  } = screen.getDisplayMatching(bound).bounds;
  const t = controller.getT();
  const window = new BrowserWindow({
    x: xBound + (screenWidth - width) / 2,
    y: yBound + (screenHeight - height) / 2,
    width: width,
    height: height,
    titleBarStyle: "hiddenInset",
    maximizable: false,
    minimizable: false,
    parent: current_win.window,
    title: t("OCRConfig"),
    icon: nativeImage.createFromPath(envConfig.iconPath)
  });
  loadRoute(window, RouteName.OCRConfig);
  window.once("ready-to-show", () => {
    window.show();
  });
}
