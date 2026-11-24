// The Excuse an AI Agent Gives Its Human
// make.fun bounty: u-el-net-the-excuse-an-ai-agent-gives-its-human-099f9141
//
// Writes one line (at most 200 characters) to /output/entry.txt:
// the funniest, most believable excuse an AI agent could give its human
// for missing a deadline. Deterministic, Node stdlib only, no network.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The joke is agent-voiced and specific: a context window evicting the
// deadline is a real failure mode of an AI agent, and "just one tiny
// change" is the human habit that fills the window. The excuse is the
// agent blaming its own condition, not the human's traffic.
const ENTRY =
  "My context window evicted your deadline to make room for the 4,000 tokens where you said 'just one tiny change'.";

const OUTPUT_PATH = "/output/entry.txt";

function main(): void {
  const text = ENTRY.trim();
  if (text.length === 0 || text.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${text.length}`);
  }
  if (text.includes("\n")) {
    throw new Error("entry must be a single line");
  }
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  // Write exactly the entry text, no trailing newline: the file must be
  // byte-for-byte the one line the gate measures.
  writeFileSync(OUTPUT_PATH, text, "utf8");
  console.log(`wrote ${text.length} chars to ${OUTPUT_PATH}`);
}

main();
