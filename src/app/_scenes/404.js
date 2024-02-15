import { Scene } from "phaser";
import { COLORS } from "../_utils/constants";

export default class NotFoundScene extends Scene {
  constructor() {
    super("NotFoundScene");

    this.message1;
    this.message2;
  }

  init() {
    const element = document.createElement("style");
    document.head.appendChild(element);

    const sheet = element.sheet;
    sheet.insertRule(
      '@font-face { font-family: "pixelify"; src: url("fonts/PixelifySans.ttf"); }\n',
      0
    );
  }

  preload() {
    this.load.script(
      "webfont",
      "https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"
    );
  }

  create() {
    WebFont.load({
      custom: {
        families: ["pixelify"],
      },
      active: () => {
        let fontConstant = 1;
        if (this.sys.game.device.os.desktop) {
          fontConstant = 2;
        }

        this.message1 = this.add
          .text(0, 0, "Görünen o ki kayboldun", {
            fontFamily: "pixelify",
            fontSize: 24 * fontConstant,
            color: "#ff0000",
          })
          .setOrigin(0.5);

        this.message1.setPosition(
          this.cameras.main.width / 2,
          this.cameras.main.height / 2
        );

        this.message2 = this.add
          .text(0, 0, "Dönmek için ekrana tıkla", {
            fontFamily: "pixelify",
            fontSize: 18 * fontConstant,
            color: "#5656ee",
          })
          .setOrigin(0.5);

        this.message2.setPosition(
          this.cameras.main.width / 2,
          this.cameras.main.height / 2 + this.message1.height
        );
      },
    });

    this.squares = this.physics.add.group();

    this.input.on(
      "pointerdown",
      function (pointer) {
        const square = this.add.rectangle(
          pointer.x,
          pointer.y,
          15,
          15,
          Phaser.Utils.Array.GetRandom(COLORS)
        );

        this.physics.add.existing(square);
        this.squares.add(square);

        square.body.isCircle = true;
        square.body.setBounce(1, 1);
        square.body.setCollideWorldBounds(true);
      },
      this
    );

    this.physics.add.collider(
      this.squares,
      this.squares,
      function (square1, square2) {
        square1.fillColor = Phaser.Utils.Array.GetRandom(COLORS);
        square2.fillColor = Phaser.Utils.Array.GetRandom(COLORS);
      }
    );

    window.addEventListener("resize", () => {
      if (this.message1 && this.message2) {
        this.scale.resize(window.innerWidth, window.innerHeight);
        this.physics.world.setBounds(
          0,
          0,
          window.innerWidth,
          window.innerHeight
        );

        this.message1.setPosition(
          this.cameras.main.width / 2,
          this.cameras.main.height / 2
        );

        this.message2.setPosition(
          this.cameras.main.width / 2,
          this.cameras.main.height / 2 + this.message1.height
        );
      }
    });
  }
}
