"use client";

import { Game } from "../_components/game";

export default function AdminPage() {
  return <Game isLoggedIn={true} isAdmin={true} />;
}
