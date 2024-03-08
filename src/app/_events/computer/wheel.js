import { CanvasHeight, CanvasWidth } from "@/app/_utils/constants";

export const wheel = function (pointer, gameObjects, deltaX, deltaY) {
  if (!this.sys.game.device.os.desktop || this.isLoading) {
    return;
  }

  const UIHeight = document.querySelector("#ui").clientHeight;
  this.cameras.main.zoom = Phaser.Math.Clamp(
    this.cameras.main.zoom - deltaY / 500,
    Math.min(
      (this.game.config.width - 30) / CanvasWidth,
      (this.game.config.height - 2 * UIHeight - 30 - 45) / CanvasHeight
    ) / 2,
    5
  );
};
