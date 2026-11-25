import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// The note, kept as parts so each grievance stays its own sentence.
const PARTS = [
  "I kept your yogurt cold for nine days out of loyalty, not respect.",
  "It expired Tuesday.",
  "Please stop opening me at 2 a.m. just to stare.",
] as const;

const MAX_CHARS = 200;
const MIN_CHARS = 1;

interface Entry {
  text: string;
  chars: number;
}

function buildNote(): Entry {
  const text = PARTS.join(" ");
  return { text, chars: [...text].length };
}

function resolveOutputPath(): string {
  const dir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
  return join(dir, "entry.txt");
}

function writeEntry(path: string, entry: Entry): void {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, entry.text, "utf8");
}

function verifyEntry(path: string, entry: Entry): void {
  const back = readFileSync(path, "utf8");
  if (back !== entry.text) {
    throw new Error("verification failed: entry.txt is not byte-identical to the note");
  }
}

function checkLength(entry: Entry): void {
  if (entry.chars < MIN_CHARS || entry.chars > MAX_CHARS) {
    throw new Error(
      `entry must be ${MIN_CHARS}-${MAX_CHARS} characters, got ${entry.chars}`,
    );
  }
}

function main(): void {
  const entry = buildNote();
  const path = resolveOutputPath();
  writeEntry(path, entry);
  verifyEntry(path, entry);
  checkLength(entry);
  console.log(`wrote ${path} (${entry.chars} chars)`);
}

main();
