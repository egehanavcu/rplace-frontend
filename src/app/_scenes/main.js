import { Scene } from "phaser";
import { COLORS, DEBUG_MODE } from "../_utils/constants";
import { initialDraw } from "../_utils/initialDraw";
import { wheel } from "../_events/computer/wheel";
import { pinch } from "../_events/mobile/pinch";
import { confirmPlacement } from "../_events/cross/pixel/confirmPlacement";
import { cancelPlacement } from "../_events/cross/pixel/cancelPlacement";
import { getPixelUpdate } from "../_socket/getPixelUpdate";
import { reconnectDraw } from "../_utils/reconnectDraw";
import { createBatchPixels } from "../_utils/createBatchPixels";

export default class MainScene extends Scene {
  constructor() {
    super("MainScene");
    this.socket;
    this.stompClient;
    this.lastHeartbeatAt;

    this.renderTexture;
    this.batchPixels = {};
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
    this.lastTween = null;
  }

  preload() {
    this.load.image("edge", "edge.png");
    this.load.audio("select-pixel", ["sounds/select-pixel.mp3"]);
    this.load.audio("place-pixel", ["sounds/place-pixel.mp3"]);
    this.load.audio("can-modify", ["sounds/can-modify.mp3"]);
    this.load.audio("cant-modify", ["sounds/cant-modify.mp3"]);
    this.load.audio("cancel", ["sounds/cancel.mp3"]);
    this.load.audio("choose-color", ["sounds/choose-color.mp3"]);
  }

  update() {
    if (DEBUG_MODE) {
      document.querySelector("#fpsCounter").textContent = Math.ceil(
        this.sys.game.loop.actualFps
      );
    }

    if (this.isPan && this.lastDistance === 0) {
      if (
        !this.sys.game.device.os.desktop &&
        this.input.pointer1.isDown &&
        this.input.pointer2.isDown
      ) {
        return;
      }
      this.cameras.main.scrollX -=
        (this.input.activePointer.position.x - this.lastPositionPan.x) /
        this.cameras.main.zoom;
      this.cameras.main.scrollY -=
        (this.input.activePointer.position.y - this.lastPositionPan.y) /
        this.cameras.main.zoom;

      this.lastPositionPan = {
        x: this.input.activePointer.x,
        y: this.input.activePointer.y,
      };
    }
  }

  create() {
    this.stompClient = Stomp.over(function () {
      return new SockJS("https://yildizplace-backend.onrender.com/rplace");
    });

    this.stompClient.heartbeat.outgoing = 5000;
    this.stompClient.heartbeat.incoming = 5000;
    this.stompClient.reconnect_delay = 3000;

    createBatchPixels.bind(this)();

    this.stompClient.connect(
      {},
      (frame) => {
        // Connected
        getPixelUpdate.bind(this)();
        if (this.lastHeartbeatAt) {
          reconnectDraw.bind(this)();

          this.lastHeartbeatAt = null;
          document.querySelector("#connectionError").classList.remove("flex");
          document.querySelector("#connectionError").classList.add("hidden");
        }
      },
      () => {},
      () => {
        // Disconnected
        if (!this.lastHeartbeatAt)
          this.lastHeartbeatAt = Math.floor(Date.now() / 1000);
        document.querySelector("#connectionError").classList.remove("hidden");
        document.querySelector("#connectionError").classList.add("flex");
      }
    );

    window.addEventListener("resize", () => {
      const UIHeight = document.querySelector("#ui").clientHeight;
      this.scale.resize(window.innerWidth, window.innerHeight - UIHeight);
    });

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
  }
}
