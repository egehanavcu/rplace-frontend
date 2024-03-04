import { cancelPlacement } from "./cancelPlacement";

export const toggleFill = function () {
  document.querySelector("#fillColor")?.addEventListener("click", () => {
    this.isFillingMode = !this.isFillingMode;
    if (this.canPlacePixel) {
      cancelPlacement.bind(this)();
    }

    if (this.isFillingMode) {
      document.querySelector("#fillColor").innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20" > <path d="M40-40v-240h80v-400H40v-240h240v80h400v-80h240v240h-80v400h80v240H680v-80H280v80H40Zm240-160h400v-80h80v-400h-80v-80H280v80h-80v400h80v80Zm32-120 136-360h64l136 360h-62l-32-92H408l-32 92h-64Zm114-144h108l-52-150h-4l-52 150ZM120-760h80v-80h-80v80Zm640 0h80v-80h-80v80Zm0 640h80v-80h-80v80Zm-640 0h80v-80h-80v80Zm80-640Zm560 0Zm0 560Zm-560 0Z" /> </svg>';
    } else {
      document.querySelector("#fillColor").innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="M320-640v320-320Zm-80 400v-480h480v480H240Zm80-80h320v-320H320v320Z"/></svg>';
    }
  });
};
