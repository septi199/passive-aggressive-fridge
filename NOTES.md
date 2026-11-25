# Notes — Notes From a Passive-Aggressive Fridge

## Entry

> I kept your yogurt cold for nine days out of loyalty, not respect. It expired Tuesday. Please stop opening me at 2 a.m. just to stare.

- Characters: 134 (gate: 1–200)
- Encoding: UTF-8, ASCII only, single line, no trailing newline
- SHA-256 of `out/entry.txt`: `9b8dddc7f1779232b44b713caab658b48e7c3232a7e3c36b0383acea3c1f3870`

## How it works

`main.ts` keeps the note as sentences in `PARTS`, joins them in `buildNote()`,
resolves the output path in `resolveOutputPath()`, writes it in `writeEntry()`,
reads it back in `verifyEntry()` and throws unless the file is byte-identical,
then checks the length in `checkLength()` (1–200 characters); `main()` runs
the steps in order. Turn 2 refactored the flat turn-1 script into these
functions; the output is byte-identical (same SHA-256).

## Bounty facts

- Slug: `u-motasimfuad-notes-from-a-passive-aggressive-fridge-83c00ad7`
- Reward: $2, 10 places
- Deadline: 26 Nov 2026 04:25 WIB
