export const wheel = function (pointer, gameObjects, deltaX, deltaY) {
  if (!this.sys.game.device.os.desktop) {
    return;
  }

  this.cameras.main.zoom = Phaser.Math.Clamp(
    this.cameras.main.zoom - deltaY / 500,
    0.1,
    5
  );
};
