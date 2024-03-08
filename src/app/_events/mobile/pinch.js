import { CanvasHeight, CanvasWidth } from "@/app/_utils/constants";

export const pinch = function (pointer) {
  if (!this.sys.game.device.os.desktop && pointer.event.touches.length === 2) {
    const dx =
      pointer.event.touches[0].clientX - pointer.event.touches[1].clientX;
    const dy =
      pointer.event.touches[0].clientY - pointer.event.touches[1].clientY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (this.lastDistance && !this.isLoading) {
      const UIHeight = document.querySelector("#ui").clientHeight;
      const delta = distance - this.lastDistance;
      this.cameras.main.zoom = Phaser.Math.Clamp(
        this.cameras.main.zoom + delta / 500,
        Math.min(
          (this.game.config.width - 30) / CanvasWidth,
          (this.game.config.height - 2 * UIHeight - 30 - 45) / CanvasHeight
        ) / 2,
        5
      );
    }
    this.lastDistance = distance;
  } else {
    this.lastDistance = 0;
  }
};
