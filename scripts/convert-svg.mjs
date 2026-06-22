import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const svgPath = resolve(
  __dirname,
  '../public/images/decorations/universe_elements/sistem.svg',
);
const outputPath = resolve(__dirname, '../src/atoms/SistemaUnified.tsx');

let svg = readFileSync(svgPath, 'utf-8');

const attrMap = [
  [/stroke-linecap/g, 'strokeLinecap'],
  [/stroke-linejoin/g, 'strokeLinejoin'],
  [/stroke-width/g, 'strokeWidth'],
  [/fill-rule/g, 'fillRule'],
  [/clip-path/g, 'clipPath'],
  [/clip-rule/g, 'clipRule'],
  [/stroke-dasharray/g, 'strokeDasharray'],
  [/stroke-dashoffset/g, 'strokeDashoffset'],
  [/stroke-miterlimit/g, 'strokeMiterlimit'],
  [/fill-opacity/g, 'fillOpacity'],
  [/stroke-opacity/g, 'strokeOpacity'],
];

for (const [pattern, replacement] of attrMap) {
  svg = svg.replace(pattern, replacement);
}

const refMap = {
  stars: 'starsRef',
  saturn: 'saturnRef',
  asteroid: 'asteroidRef',
  saturn_line1: 'saturnLine1Ref',
  saturn_line2: 'saturnLine2Ref',
  particules_1: 'particules1Ref',
  partciules_2: 'particules2Ref',
  particules_3: 'particules3Ref',
  speed: 'speedRef',
  ovni: 'ovniRef',
  ovni_weapon: 'weaponRef',
  alien: 'alienRef',
  ovni_light_color: 'lightColorRef',
  saturn_planet: 'planetRef',
};

for (const [id, refName] of Object.entries(refMap)) {
  const refAttr = ` ref={${refName}}`;
  const pattern = new RegExp(`id="${id}"`);
  svg = svg.replace(pattern, `id="${id}"${refAttr}`);
}

// Pretty-print: add newlines at natural break points
svg = svg
  .replace(/><g /g, '>\n  <g ')
  .replace(/><path /g, '>\n    <path ')
  .replace(/><circle /g, '>\n    <circle ')
  .replace(/<\/g>/g, '\n  </g>')
  .replace(/<\/svg>/g, '\n</svg>')
  .replace(/<svg/, '\n  <svg')
  .replace(/^\s*\n/, '');

const component = `import * as React from 'react';
import type { SVGProps } from 'react';

interface SistemaUnifiedProps extends SVGProps<SVGSVGElement> {
  starsRef?: React.Ref<SVGGElement>;
  saturnRef?: React.Ref<SVGGElement>;
  asteroidRef?: React.Ref<SVGGElement>;
  saturnLine1Ref?: React.Ref<SVGGElement>;
  saturnLine2Ref?: React.Ref<SVGGElement>;
  particules1Ref?: React.Ref<SVGGElement>;
  particules2Ref?: React.Ref<SVGGElement>;
  particules3Ref?: React.Ref<SVGGElement>;
  speedRef?: React.Ref<SVGGElement>;
  ovniRef?: React.Ref<SVGGElement>;
  weaponRef?: React.Ref<SVGGElement>;
  alienRef?: React.Ref<SVGGElement>;
  lightColorRef?: React.Ref<SVGGElement>;
  planetRef?: React.Ref<SVGGElement>;
}

export default function SistemaUnified({
  starsRef,
  saturnRef,
  asteroidRef,
  saturnLine1Ref,
  saturnLine2Ref,
  particules1Ref,
  particules2Ref,
  particules3Ref,
  speedRef,
  ovniRef,
  weaponRef,
  alienRef,
  lightColorRef,
  planetRef,
  ...props
}: SistemaUnifiedProps) {
  return (${svg});
}
`;

writeFileSync(outputPath, component, 'utf-8');
console.log(
  `Generated ${outputPath} (${(component.length / 1024).toFixed(1)} KB)`,
);
