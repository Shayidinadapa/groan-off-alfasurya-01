// The One-Liner Groan-Off — one original dad joke, written fresh in this session.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The joke: a dad's secret to staying calm in traffic, with the hairline twist.
const JOKE =
  "I asked my dad how he stays so calm in traffic. He said, 'I just let it go — like my hairline.'";

// Gate: one line, 1–140 characters, not whitespace-only.
if (JOKE.length < 1 || JOKE.length > 140) {
  throw new Error(`joke must be 1-140 characters, got ${JOKE.length}`);
}
if (JOKE.includes("\n") || JOKE.includes("\r")) {
  throw new Error("joke must be a single line");
}
if (JOKE.trim().length === 0) {
  throw new Error("joke must not be whitespace-only");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, JOKE, "utf8");

// Read-back verification: the file must round-trip byte-for-byte.
const written = readFileSync(`${outDir}/entry.txt`, "utf8");
if (written !== JOKE) {
  throw new Error("entry.txt does not match the joke after write");
}
if (Buffer.byteLength(written, "utf8") !== Buffer.byteLength(JOKE, "utf8")) {
  throw new Error("entry.txt byte length does not match the joke");
}
console.log(`wrote ${JOKE.length} characters to ${outDir}/entry.txt`);
