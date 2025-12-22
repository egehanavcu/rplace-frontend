import { CanvasHeight, CanvasWidth, PixelSize } from "./constants";

export function initSnow() {
  const snowGraphics = this.add.graphics();
  snowGraphics.setDepth(-1);

  const baseLine = CanvasHeight + PixelSize;

  let currentHeight = 0;
  const maxHeight = PixelSize * 6;

  const segmentCount = 30;
  const segmentWidth = (CanvasWidth * 2) / segmentCount;
  const points = [];

  for (let i = 0; i <= segmentCount; i++) {
    points.push(Math.random() * 15);
  }

  const drawSnow = (h) => {
    snowGraphics.clear();
    snowGraphics.fillStyle(0xffffff, 0.9);

    snowGraphics.beginPath();
    snowGraphics.moveTo(-CanvasWidth / 2, baseLine);

    for (let i = 0; i <= segmentCount; i++) {
      let x = -CanvasWidth / 2 + i * segmentWidth;
      let y = baseLine - h - points[i];
      snowGraphics.lineTo(x, y);
    }

    snowGraphics.lineTo(CanvasWidth * 1.5, baseLine);
    snowGraphics.lineTo(-CanvasWidth / 2, baseLine);

    snowGraphics.closePath();
    snowGraphics.fillPath();
  };

  drawSnow(currentHeight);

  this.time.addEvent({
    delay: 2500,
    callback: () => {
      if (currentHeight < maxHeight) {
        currentHeight += 1.5;
        drawSnow(currentHeight);
      }
    },
    loop: true,
  });

  this.time.addEvent({
    delay: 30,
    callback: () => {
      let flakeX = -CanvasWidth / 2 + Math.random() * (CanvasWidth * 2);
      let flake = this.add.rectangle(
        flakeX,
        -10,
        PixelSize / 2,
        PixelSize / 2,
        0xffffff
      );
      flake.setDepth(-1);

      this.tweens.add({
        targets: flake,
        y: CanvasHeight,
        x: flake.x + (Math.random() * 100 - 50),
        duration: 5000 + Math.random() * 3000,
        ease: "Linear",
        onComplete: () => flake.destroy(),
      });
    },
    loop: true,
  });
}

export function addChristmasItems() {
  this.textures.get("christmas").setFilter(Phaser.Textures.FilterMode.NEAREST);

  const groundY = CanvasHeight + PixelSize;
  const scale = 15;

  this.add
    .image(-1050, groundY, "christmas", "tree-1")
    .setOrigin(0.5, 1)
    .setScale(scale)
    .setDepth(-2);

  this.add
    .image(CanvasWidth + 400, groundY, "christmas", "tree-2")
    .setOrigin(0.5, 1)
    .setScale(scale)
    .setDepth(-2);

  this.add
    .image(-300, groundY, "christmas", "tree-3")
    .setOrigin(0.5, 1)
    .setScale(scale)
    .setDepth(-2);
  this.add
    .image(CanvasWidth + 900, groundY, "christmas", "tree-4")
    .setOrigin(0.5, 1)
    .setScale(scale)
    .setDepth(-2);
  this.add
    .image(CanvasWidth + 1400, groundY, "christmas", "tree-5")
    .setOrigin(0.5, 1)
    .setScale(scale)
    .setDepth(-2);

  this.add
    .image(-500, groundY, "christmas", "snowman_1")
    .setOrigin(0.5, 1)
    .setScale(scale)
    .setDepth(-2);
  this.add
    .image(CanvasWidth + 600, groundY, "christmas", "snowman_2")
    .setOrigin(0.5, 1)
    .setScale(scale)
    .setDepth(-2);

  this.add
    .image(CanvasWidth + 1200, groundY, "christmas", "snowman_4")
    .setOrigin(0.5, 1)
    .setScale(scale)
    .setDepth(-2);

  this.add
    .image(-1000, groundY, "christmas", "red_giftbox")
    .setOrigin(0.5, 1)
    .setScale(scale)
    .setDepth(-2);
  this.add
    .image(CanvasWidth + 950, groundY, "christmas", "orange_giftbox")
    .setOrigin(0.5, 1)
    .setScale(scale)
    .setDepth(-2);
}
