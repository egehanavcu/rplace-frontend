export const pinch = function (pointer) {
  const dx =
    pointer.event.touches[0].clientX - pointer.event.touches[1].clientX;
  const dy =
    pointer.event.touches[0].clientY - pointer.event.touches[1].clientY;
  const distance = Math.sqrt(dx * dx + dy * dy);
  if (this.lastDistance) {
    const delta = distance - this.lastDistance;
    this.cameras.main.zoom = Phaser.Math.Clamp(
      this.cameras.main.zoom + delta / 500,
      0.1,
      5
    );
  }
  this.lastDistance = distance;
};
