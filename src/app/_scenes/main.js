import { Scene } from "phaser";
import { COLORS } from "../_utils/constants";
import { initialDraw } from "../_utils/initialDraw";
import { wheel } from "../_events/computer/wheel";
import { pinch } from "../_events/mobile/pinch";
import { confirmPlacement } from "../_events/cross/pixel/confirmPlacement";
import { cancelPlacement } from "../_events/cross/pixel/cancelPlacement";
import { getPixelUpdate } from "../_socket/getPixelUpdate";

export default class MainScene extends Scene {
  constructor() {
    super("MainScene");
    this.socket;
    this.stompClient;

    this.canPlacePixel = true;
    this.selectedPixel = {
      row: null,
      col: null,
      element: null,
      color: 0x000000,
    };
    this.color = 0x000000;
    this.isPan = false;
    this.lastPositionPan = { x: null, y: null };
    this.lastDistance = 0;
    this.lastMousePixel = { row: null, col: null, shadow: null };
  }

  preload() {
    this.load.audio("select-pixel", ["sounds/select-pixel.mp3"]);
    this.load.audio("place-pixel", ["sounds/place-pixel.mp3"]);
    this.load.audio("can-modify", ["sounds/can-modify.mp3"]);
    this.load.audio("cant-modify", ["sounds/cant-modify.mp3"]);
    this.load.audio("cancel", ["sounds/cancel.mp3"]);
    this.load.audio("choose-color", ["sounds/choose-color.mp3"]);
  }

  update() {
    if (this.isPan && this.lastDistance === 0) {
      if (
        !this.sys.game.device.os.desktop &&
        this.input.pointer1.isDown &&
        this.input.pointer2.isDown
      ) {
        return;
      }
      this.cameras.main.scrollX -=
        this.input.activePointer.position.x - this.lastPositionPan.x;
      this.cameras.main.scrollY -=
        this.input.activePointer.position.y - this.lastPositionPan.y;

      this.lastPositionPan = {
        x: this.input.activePointer.x,
        y: this.input.activePointer.y,
      };
    }
  }

  create() {
    this.socket = new SockJS("http://192.168.1.6:8080/rplace");
    this.stompClient = Stomp.over(this.socket);

    document.querySelectorAll("[id^='color-']").forEach((button) => {
      button.addEventListener("click", () => {
        this.sound.add("choose-color").play();
        this.color = COLORS[button.id.split("-")[1]];
      });
    });

    document
      .querySelector("#confirmPlacement")
      .addEventListener("click", () => {
        confirmPlacement.bind(this)();
      });

    document.querySelector("#cancelPlacement").addEventListener("click", () => {
      this.sound.add("cancel").play();
      cancelPlacement.bind(this)();
    });

    this.input.addPointer(2);
    this.input.on("wheel", wheel.bind(this), this);

    this.input.on(
      "pointermove",
      (pointer) => {
        /* PINCH */
        if (
          !this.sys.game.device.os.desktop &&
          pointer.event.touches.length === 2
        ) {
          pinch.bind(this)(pointer);
          return;
        } else {
          this.lastDistance = 0;
        }
        /* PINCH */
      },
      this
    );

    this.input.on("pointerdown", (pointer) => {
      if (
        !this.sys.game.device.os.desktop &&
        pointer.event.touches.length === 2
      ) {
        return;
      }

      if (this.lastDistance === 0) {
        this.isPan = true;
        this.lastPositionPan = { x: pointer.x, y: pointer.y };
      }
    });

    this.input.on("pointerup", (pointer) => {
      this.isPan = false;
      this.lastPositionPan = { x: null, y: null };
      this.lastDistance = 0;
    });

    initialDraw.bind(this)();
    getPixelUpdate.bind(this)();
  }
}
