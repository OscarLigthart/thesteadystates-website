// Self-check for the about-thread geometry:
//   node src/components/threadGeometry.test.mjs
import assert from "node:assert/strict";
import { AMP, anchorFor, buildStem, buildRib, ribTarget } from "./threadGeometry.js";

const W = 1000;
const cx = W / 2;

// --- story anchors alternate sides, centred on each step -------------------
const steps = [
  { offsetTop: 0, offsetHeight: 300 },
  { offsetTop: 340, offsetHeight: 420 },
  { offsetTop: 800, offsetHeight: 300 },
];
const dots = steps.map((el, i) => anchorFor(i, el, cx));
assert.deepEqual(dots.map((a) => a.x), [cx - AMP, cx + AMP, cx - AMP]);
assert.deepEqual(dots.map((a) => a.y), [150, 550, 950]);

// --- the stem starts and ends centred, one curve per step plus the gather ---
const apexY = 1200;
const stem = buildStem(dots, apexY, cx);
assert.ok(stem.startsWith(`M ${cx} 0`), "stem must start centred");
assert.ok(stem.endsWith(`${cx} ${apexY}`), "stem must gather back to centre at the apex");
assert.equal(stem.split("C").length - 1, dots.length + 1);

// --- ribs meet the edge of the card that faces the centre ------------------
const leftCard = { offsetLeft: 0, offsetWidth: 420, offsetTop: 1300, offsetHeight: 160 };
const rightCard = { offsetLeft: 580, offsetWidth: 420, offsetTop: 1300, offsetHeight: 160 };
assert.deepEqual(ribTarget(leftCard, cx), { x: 420, y: 1380 }, "left card: right edge");
assert.deepEqual(ribTarget(rightCard, cx), { x: 580, y: 1380 }, "right card: left edge");

// --- a rib leaves the apex vertically and arrives horizontally -------------
const apex = { x: cx, y: apexY };
const rib = buildRib(apex, ribTarget(rightCard, cx));
const [mx, my, p1x, p1y, , p2y, ex, ey] = rib.match(/-?\d+\.?\d*/g).map(Number);

assert.equal(mx, apex.x, "rib starts at the apex");
assert.equal(my, apex.y);
assert.equal(p1x, apex.x, "first control point shares the apex x -> leaves vertically");
assert.equal(p2y, ey, "second control point shares the target y -> arrives horizontally");
assert.equal(ex, 580, "rib lands on the card edge");
assert.ok(p1y > my && p1y < ey, "control point sits between apex and target");

// --- no steps: a straight centred stem, no crash ---------------------------
assert.equal(buildStem([], 400, cx), `M ${cx} 0 C ${cx} 200, ${cx} 200, ${cx} 400`);

console.log("threadGeometry: all checks passed");
