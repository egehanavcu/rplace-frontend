"use client";

import { useEffect, useState } from "react";

function NotFoundPage() {
  const [game, setGame] = useState();

  useEffect(() => {
    async function initPhaser() {
      const Phaser = await import("phaser");
      const { default: NotFoundScene } = await import("./_scenes/404");
      const PhaserGame = new Phaser.Game({
        type: Phaser.AUTO,
        parent: "app",
        width: window.innerWidth,
        height: window.innerHeight,
        scale: {
          autoCenter: Phaser.Scale.CENTER_BOTH,
        },
        transparent: true,
        scene: [NotFoundScene],
        physics: {
          default: "arcade",
          arcade: { gravity: { y: 200 } },
        },
      });
      setGame(PhaserGame);
    }
    initPhaser();
  }, []);

  return <div id="app"></div>;
}

export default NotFoundPage;
