import { CanvasHeight, CanvasWidth } from "./constants";

export const updateDevelopers = function () {
  for (const developer of Object.values(this.developers)) {
    if (this.developers[developer?.alias]?.character) {
      if (
        ((developer.facingRight &&
          this.developers[developer.alias].character.x > CanvasWidth) ||
          (!developer.facingRight &&
            this.developers[developer.alias].character.x < 0)) &&
        !this.developers[developer.alias].hasJumped
      ) {
        this.developers[developer.alias].hasJumped = true;
        this.developers[developer.alias].character.anims.stop();
        this.developers[developer.alias].character.anims.play(
          `${developer.alias}_jump`,
          true
        );
        this.developers[developer.alias].character.setVelocityX(
          developer.facingRight ? 100 : -100
        );
        this.developers[developer.alias].character.setVelocityY(-300);
      }

      if (
        this.developers[developer.alias].character.y > CanvasHeight &&
        !this.developers[developer.alias].isDead
      ) {
        this.developers[developer.alias].isDead = true;
        this.developers[developer.alias].character.body.moves = false;
        this.developers[developer.alias].character.anims.stop();
        this.developers[developer.alias].character.anims.play(
          `${developer.alias}_death`,
          true
        );
        this.add
          .text(
            this.developers[developer.alias].character.x,
            this.developers[developer.alias].character.y - 190,
            developer.position,
            {
              fontSize: 64,
              color: "#ffffff",
            }
          )
          .setOrigin(0.5);
      }

      if (this.developers[developer.alias].text) {
        this.developers[developer.alias].text.setPosition(
          this.developers[developer.alias].character.x,
          this.developers[developer.alias].character.y - 250
        );
      }
    }
  }
};
