import type { Background } from "../App.types";

const importedBackgrounds: Record<string, { default: string }> =
  import.meta.glob("../assets/backgrounds/*.png", { eager: true });

const backgrounds = Object.fromEntries(
  Object.entries(importedBackgrounds).map(([key, value]) => {
    const fileName = key.split("/").pop()?.replace(".png", "");
    const path = value.default;
    return [fileName, path];
  })
);

export function getBackgroundPath(fileName: Background) {
  return backgrounds[fileName];
}
