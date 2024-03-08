import { CanvasWidth } from "./constants";

export const drawDevelopers = function () {
  this.developers = {
    egehan: {
      name: "Egehan Avcu",
      alias: "egehan",
      position: "Frontend Developer",
      socialMedia: "https://www.instagram.com/egehanavcu",
      character: null,
      text: null,
      facingRight: false,
      hasJumped: false,
      isDead: false,
      hasBeenClicked: false,
    },
    yusuf: {
      name: "Yusuf Açmacı",
      alias: "yusuf",
      position: "Backend Developer",
      socialMedia: "https://www.instagram.com/ysfacmc/",
      character: null,
      text: null,
      facingRight: false,
      hasJumped: false,
      isDead: false,
      hasBeenClicked: false,
    },
  };

  this.developers[
    ["egehan", "yusuf"][Math.round(Math.random())]
  ].facingRight = true;

  const platforms = this.physics.add.staticGroup();
  platforms
    .create(0, 0, "ground")
    .setOrigin(0, 0.5)
    .setScale(117.5, 0.2)
    .setAlpha(0)
    .refreshBody();

  for (const developer of Object.values(this.developers)) {
    this.developers[developer.alias].character = this.physics.add
      .sprite(
        developer.facingRight ? 0 : CanvasWidth,
        -8,
        `${developer.alias}_run`
      )
      .setOrigin(developer.facingRight ? 0.4 : 0.7, 1)
      .setDepth(10)
      .setScale(6)
      .setFlipX(!developer.facingRight)
      .setInteractive();

    this.developers[developer.alias].text = this.add
      .text(
        0,
        this.developers[developer.alias].character.y - 250,
        developer.name,
        {
          fontSize: 64,
          color: "#ffffff",
        }
      )
      .setOrigin(0.5);

    this.physics.add.collider(
      this.developers[developer.alias].character,
      platforms
    );

    this.anims.create({
      key: `${developer.alias}_run`,
      frames: this.anims.generateFrameNumbers(`${developer.alias}_run`),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: `${developer.alias}_jump`,
      frames: this.anims.generateFrameNumbers(`${developer.alias}_jump`),
      frameRate: 10,
    });

    this.anims.create({
      key: `${developer.alias}_death`,
      frames: this.anims.generateFrameNumbers(`${developer.alias}_death`),
      frameRate: 10,
    });

    this.developers[developer.alias].character.anims.play(
      `${developer.alias}_run`,
      true
    );
    this.developers[developer.alias].character.setVelocityX(
      developer.facingRight ? 400 : -400
    );

    this.input.on("pointerdown", (pointer) => {
      console.log(pointer.worldX, this.developers.egehan.character.x);
      for (const developer of Object.values(this.developers)) {
        const sprite = this.developers[developer.alias].character;
        const topLeftX = sprite.x - sprite.displayWidth / 2;
        const topRightX = sprite.x + sprite.displayWidth / 2;

        const topLeftY = sprite.y - sprite.displayHeight / 2;
        const bottomLeftY = sprite.y + sprite.displayHeight / 2;

        if (
          pointer.worldX >= Math.min(topLeftX, topRightX) &&
          pointer.worldX <= Math.max(topLeftX, topRightX) &&
          pointer.worldY >= Math.min(topLeftY, bottomLeftY) - 180 &&
          pointer.worldY <= Math.max(topLeftY, bottomLeftY) &&
          !this.developers[developer.alias].hasBeenClicked
        ) {
          this.developers[developer.alias].hasBeenClicked = true;
          this.isPan = false;
          this.lastPositionPan = { x: null, y: null };
          this.lastDistance = 0;
          window.open(developer.socialMedia, "_blank");
        }
      }
    });
  }
};
