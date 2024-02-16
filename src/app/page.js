"use client";

import { Game } from "./_components/game";

export default function HomePage() {
  return <Game isLoggedIn={true} isAdmin={false} />;
}
