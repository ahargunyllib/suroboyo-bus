import { PortalHost } from "@rn-primitives/portal";
import "../global.css";

import { Stack } from "expo-router";

export default function Layout() {
  return (
    <>
      <Stack />
      <PortalHost />
    </>
  );
}
