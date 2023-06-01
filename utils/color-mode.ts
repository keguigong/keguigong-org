export const COLOR_MODE = {
  DARK: "dark",
  LIGHT: "light",
  AUTO: "auto"
}

export function setColorMode(mode: string) {
  let dataset = document.documentElement.dataset
  dataset.colorMode = mode
}
