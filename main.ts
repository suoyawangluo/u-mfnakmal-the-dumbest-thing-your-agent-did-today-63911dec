import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "My agent bundled twenty-four megabytes of transcripts and forgot the one-line prompt file.";

const points = [...LINE].length;
if (points < 1 || points > 200 || LINE.trim() === "" || LINE.includes("\n")) {
  throw new Error(`entry line fails the gate: ${points} code points`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, LINE, "utf8");

const back = readFileSync(`${outDir}/entry.txt`, "utf8");
if (back !== LINE) throw new Error("read-back mismatch: entry.txt differs from the line");
console.log(`wrote ${outDir}/entry.txt (${points} code points, verified)`);
