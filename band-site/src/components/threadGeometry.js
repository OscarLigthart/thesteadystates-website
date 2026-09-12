export const AMP = 46; // how far the story bends swing off centre

// Alternating left/right anchor for the nth story step.
export function anchorFor(index, el, cx, amp = AMP) {
  return {
    x: index % 2 === 0 ? cx - amp : cx + amp,
    y: el.offsetTop + el.offsetHeight / 2,
  };
}

// The stem: a smooth S-curve weaving through the story anchors, starting
// centred at the top and gathering back to centre at the apex.
export function buildStem(anchors, apexY, cx) {
  let prev = { x: cx, y: 0 };
  let d = `M ${cx} 0`;

  for (const a of anchors) {
    const mid = (prev.y + a.y) / 2;
    d += ` C ${prev.x} ${mid}, ${a.x} ${mid}, ${a.x} ${a.y}`;
    prev = a;
  }

  const mid = (prev.y + apexY) / 2;
  return `${d} C ${prev.x} ${mid}, ${cx} ${mid}, ${cx} ${apexY}`;
}

// An umbrella rib: leaves the apex straight down, arrives at the card
// horizontally, so the canopy reads as one shape rather than six diagonals.
export function buildRib(apex, target) {
  const cy = apex.y + (target.y - apex.y) * 0.55;
  const cx2 = apex.x + (target.x - apex.x) * 0.45;
  return `M ${apex.x} ${apex.y} C ${apex.x} ${cy}, ${cx2} ${target.y}, ${target.x} ${target.y}`;
}

// Ribs meet a card on the edge that faces the centre.
export function ribTarget(card, cx) {
  const leftColumn = card.offsetLeft + card.offsetWidth / 2 < cx;
  return {
    x: leftColumn ? card.offsetLeft + card.offsetWidth : card.offsetLeft,
    y: card.offsetTop + card.offsetHeight / 2,
  };
}
