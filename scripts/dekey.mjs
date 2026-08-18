import sharp from "sharp"
import { readFile, writeFile } from "node:fs/promises"

// Files that came out with a baked-in transparency-checkerboard pattern.
// The checkerboard is two grays (~#666 and ~#999) plus antialiased blends.
// We flood-fill from the four corners, removing any pixel that is a
// near-gray (low saturation, mid/high lightness) AND connected to the border.
// This preserves the character's own whites/grays in the interior.

const files = [
  "mascot-run",
  "mascot-cheer",
  "mascot-peek",
  "coin",
  "ticket",
  "globe",
  "domino",
]

const dir = "public/assets"

function isCheckerGray(r, g, b) {
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const sat = max - min
  // The checkerboard is composed of neutral (near-zero saturation) squares
  // ranging from near-black to near-white. Anything border-connected that is
  // essentially colorless is background; the mascot itself is saturated
  // orange/blue and stays protected.
  return sat <= 30
}

for (const name of files) {
  const path = `${dir}/${name}.png`
  let buf
  try {
    buf = await readFile(path)
  } catch {
    console.log(`[dekey] skip missing ${name}`)
    continue
  }

  const img = sharp(buf).ensureAlpha()
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true })
  const { width, height, channels } = info
  const px = (x, y) => (y * width + x) * channels

  const visited = new Uint8Array(width * height)
  const stack = []
  const pushEdge = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return
    stack.push(x, y)
  }
  for (let x = 0; x < width; x++) {
    pushEdge(x, 0)
    pushEdge(x, height - 1)
  }
  for (let y = 0; y < height; y++) {
    pushEdge(0, y)
    pushEdge(width - 1, y)
  }

  while (stack.length) {
    const y = stack.pop()
    const x = stack.pop()
    const id = y * width + x
    if (visited[id]) continue
    visited[id] = 1
    const i = px(x, y)
    if (!isCheckerGray(data[i], data[i + 1], data[i + 2])) continue
    data[i + 3] = 0 // make transparent
    pushEdge(x + 1, y)
    pushEdge(x - 1, y)
    pushEdge(x, y + 1)
    pushEdge(x, y - 1)
  }

  const out = await sharp(data, { raw: { width, height, channels } })
    .png()
    .toBuffer()
  await writeFile(path, out)
  console.log(`[dekey] cleaned ${name} (${width}x${height})`)
}
