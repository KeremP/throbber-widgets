# throbber-widgets

Lightweight React throbber/spinner components using Unicode characters. Tree-shakeable, zero dependencies (peer: React 18+).

## Install

```bash
npm install throbber-widgets
```

## Usage

### React (Web)

```tsx
import { BrailleSixDouble, FallingSand, Arrow } from 'throbber-widgets';

<BrailleSixDouble pulse color="#10b981" speed={80} />
<FallingSand color="cyan" speed={60} />
<Arrow />
```

### Props

Every throbber accepts the same props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `pulse` | `boolean` | `false` | Sinusoidal opacity pulsing |
| `color` | `string` | `'currentColor'` | Any CSS color |
| `speed` | `number` | `100` | Frame interval in ms (clamped 50–500) |
| `className` | `string` | — | Class on the wrapping `<span>` |
| `style` | `CSSProperties` | — | Inline style overrides |

### Custom Throbbers

Use `ThrobberBase` with your own frames:

```tsx
import { ThrobberBase } from 'throbber-widgets';

const FRAMES = ['◐', '◓', '◑', '◒'] as const;

const MySpinner = (props) => <ThrobberBase frames={FRAMES} {...props} />;
```

Or use the `useThrobber` hook directly:

```tsx
import { useThrobber } from 'throbber-widgets';

function MySpinner() {
  const { frame, opacity } = useThrobber(['⠋', '⠙', '⠹'], 80, true);
  return <span style={{ opacity }}>{frame}</span>;
}
```

## Using Outside React (TUI, Ink, Terminal, Vue, Svelte, etc.)

All frame arrays are exported as constants — use them in **any** context:

```ts
import { FALLING_SAND, BRAILLE_WORM, SHADE } from 'throbber-widgets';

// Raw terminal (Node.js)
let i = 0;
setInterval(() => {
  process.stdout.write(`\r  ${FALLING_SAND[i++ % FALLING_SAND.length]}`);
}, 80);
```

```tsx
// Ink (React for terminals)
import { Text } from 'ink';
import { useThrobber } from 'throbber-widgets';
import { BRAILLE_EIGHT } from 'throbber-widgets';

function Spinner() {
  const { frame } = useThrobber(BRAILLE_EIGHT, 80);
  return <Text color="green">{frame}</Text>;
}
```

The `useThrobber` hook works in any React environment (web or Ink). The `ThrobberBase` component renders a `<span>` so it's web-only — for Ink, use the hook + `<Text>`.

## Available Throbbers

### Arrows & Directions

| Component | Frames | Preview |
|-----------|--------|---------|
| `Arrow` | `↑ ↗ → ↘ ↓ ↙ ← ↖` | ↑↗→↘↓↙←↖ |
| `DoubleArrow` | `⇑ ⇗ ⇒ ⇘ ⇓ ⇙ ⇐ ⇖` | ⇑⇗⇒⇘⇓⇙⇐⇖ |
| `FoldingOver` | `- ≻ › ⟩ \| ⟨ ‹ ≺` | -≻›⟩\|⟨‹≺ |

### ASCII & Box Drawing

| Component | Frames | Preview |
|-----------|--------|---------|
| `Ascii` | `\| / - \` | \|/-\ |
| `BoxDrawing` | `│ ╱ ─ ╲` | │╱─╲ |
| `PipeSpinner` | `┤ ┘ ┴ └ ├ ┌ ┬ ┐` | ┤┘┴└├┌┬┐ |
| `PipeSpinnerBold` | `┫ ┛ ┻ ┗ ┣ ┏ ┳ ┓` | ┫┛┻┗┣┏┳┓ |
| `HalfLine` | `╷ ╴ ╵ ╶` | ╷╴╵╶ |
| `HalfLineBold` | `╻ ╸ ╹ ╺` | ╻╸╹╺ |
| `Corners` | `⌞ ⌜ ⌝ ⌟` | ⌞⌜⌝⌟ |

### Blocks & Shapes

| Component | Frames | Preview |
|-----------|--------|---------|
| `HorizontalBlock` | `▏ ▎ ▍ ▌ ▋ ▊ ▉ █` | ▏▎▍▌▋▊▉█ |
| `VerticalBlock` | `▁ ▂ ▃ ▄ ▅ ▆ ▇ █` | ▁▂▃▄▅▆▇█ |
| `HalfBlock` | `▄ ▌ ▀ ▐` | ▄▌▀▐ |
| `QuadrantBlock` | `▝ ▗ ▖ ▘` | ▝▗▖▘ |
| `QuadrantBlockCrack` | `▙ ▛ ▜ ▟` | ▙▛▜▟ |
| `QuarterBlockWorm` | `▘ ▀ ▝ ▐ ▗ ▄ ▖ ▌` | ▘▀▝▐▗▄▖▌ |
| `Shade` | `░ ▒ ▓ █ ▓ ▒` | ░▒▓█▓▒ |
| `Triangle` | `◣ ◤ ◥ ◢` | ◣◤◥◢ |
| `Diamond` | `◇ ◈ ◆ ◈` | ◇◈◆◈ |

### Circles & Dots

| Component | Frames | Preview |
|-----------|--------|---------|
| `BlackCircle` | `◑ ◒ ◐ ◓` | ◑◒◐◓ |
| `WhiteCircle` | `◷ ◶ ◵ ◴` | ◷◶◵◴ |
| `WhiteSquare` | `◳ ◲ ◱ ◰` | ◳◲◱◰ |
| `PulsingDot` | `⋅ ∙ ● ∙` | ⋅∙●∙ |
| `PulsingCircle` | `◌ ○ ⊙ ● ⊙ ○` | ◌○⊙●⊙○ |

### Braille

| Component | Frames | Preview |
|-----------|--------|---------|
| `BrailleOne` | `⠈ ⠐ ⠠ ⠄ ⠂ ⠁` | ⠈⠐⠠⠄⠂⠁ |
| `BrailleDouble` | `⠘ ⠰ ⠤ ⠆ ⠃ ⠉` | ⠘⠰⠤⠆⠃⠉ |
| `BrailleSix` | `⠷ ⠯ ⠟ ⠻ ⠽ ⠾` | ⠷⠯⠟⠻⠽⠾ |
| `BrailleSixDouble` | `⠧ ⠏ ⠛ ⠹ ⠼ ⠶` | ⠧⠏⠛⠹⠼⠶ |
| `BrailleEight` | `⣷ ⣯ ⣟ ⡿ ⢿ ⣻ ⣽ ⣾` | ⣷⣯⣟⡿⢿⣻⣽⣾ |
| `BrailleEightDouble` | `⣧ ⣏ ⡟ ⠿ ⢻ ⣹ ⣼ ⣶` | ⣧⣏⡟⠿⢻⣹⣼⣶ |
| `BrailleCircle` | `⡀ ⠄ ⠂ ⠁ ⠈ ⠐ ⠠ ⢀` | ⡀⠄⠂⠁⠈⠐⠠⢀ |
| `BrailleWorm` | `⠋ ⠙ ⠹ ⠸ ⢰ ⣰ ⣠ ⣄ ⣆ ⡆ ⠇ ⠏` | ⠋⠙⠹⠸⢰⣰⣠⣄⣆⡆⠇⠏ |
| `BrailleZigzag` | `⠋ ⠙ ⠚ ⠞ ⠖ ⠦ ⠴ ⠲ ⠳ ⠓` | ⠋⠙⠚⠞⠖⠦⠴⠲⠳⠓ |
| `BrailleBounce` | `⣤ ⠶ ⠛ ⠛ ⠶` | ⣤⠶⠛⠛⠶ |
| `BrailleLeapfrog` | `⣀ ⢄ ⢂ ⢁ ⡈ ⡐ ⡠` | ⣀⢄⢂⢁⡈⡐⡠ |
| `BrailleConveyor` | `⢸ ⣸ ⢼ ⢺ ⢹ ⡏ ⡗ ⡧ ⣇ ⡇` | ⢸⣸⢼⢺⢹⡏⡗⡧⣇⡇ |
| `BrailleClimber` | `⣀ ⡠ ⠤ ⠢ ⠒ ⠊ ⠉ ⠑ ⠒ ⠔ ⠤ ⢄` | ⣀⡠⠤⠢⠒⠊⠉⠑⠒⠔⠤⢄ |
| `FallingSand` | 35 frames — braille hourglass effect | ⠁⠂⠄⡀...⣿⡿⠿...⢁ |

### Toggles & Minimal

| Component | Frames | Preview |
|-----------|--------|---------|
| `Squish` | `╫ ╪` | ╫╪ |
| `ToggleLine` | `⊶ ⊷` | ⊶⊷ |
| `ToggleBox` | `□ ■` | □■ |
| `Dqpb` | `d q p b` | dqpb |

### Scripts & Exotic

| Component | Frames | Preview |
|-----------|--------|---------|
| `Canadian` | `ᔐ ᯇ ᔑ ᯇ` | ᔐᯇᔑᯇ |
| `OghamA` | `  ᚐ ᚑ ᚒ ᚓ ᚔ` | ᚐᚑᚒᚓᚔ |
| `OghamB` | `  ᚁ ᚂ ᚃ ᚄ ᚅ` | ᚁᚂᚃᚄᚅ |
| `OghamC` | `  ᚆ ᚇ ᚈ ᚉ ᚊ` | ᚆᚇᚈᚉᚊ |
| `Parenthesis` | `⎛ ⎜ ⎝ ⎞ ⎟ ⎠` | ⎛⎜⎝⎞⎟⎠ |

### Braille Grid Spinners

Multi-cell braille animations. Frames are pre-computed from the grid generators in [gunnargray-dev/unicode-animations](https://github.com/gunnargray-dev/unicode-animations).

| Component | Cells | Frames |
|-----------|-------|--------|
| `Braille` | 1 | 10 — classic rotating braille cycle |
| `BrailleWave` | 4 | 8 — single dot surfing across cells |
| `Dna` | 4 | 12 — double-strand slide |
| `Orbit` | 1 | 8 — two-dot orbit around a 2×4 cell |
| `Breathe` | 1 | 17 — fill / empty cycle |
| `Snake` | 2 | 16 — snake tracing a path |
| `FillSweep` | 2 | 11 — vertical fill pulse |
| `Pulse` | 3 | 5 — expanding ring |
| `Columns` | 3 | 26 — columns filling in sequence |
| `Checkerboard` | 3 | 4 — alternating check pattern |
| `Scan` | 4 | 10 — scanning bar |
| `ScanLine` | 3 | 6 — horizontal scan line |
| `Rain` | 4 | 12 — falling rain dots |
| `Cascade` | 4 | 14 — diagonal cascade |
| `Sparkle` | 4 | 6 — random sparkle pattern |
| `WaveRows` | 4 | 16 — sinusoidal wave |
| `Helix` | 4 | 16 — two-strand helix |
| `DiagonalSwipe` | 2 | 16 — diagonal fill / empty |

## Frame Constants

Every throbber's frame array is also exported as a `SCREAMING_SNAKE_CASE` constant:

```ts
import {
  ARROW, ASCII, BRAILLE_WORM, FALLING_SAND, SHADE,
  // ... 65 total
} from 'throbber-widgets';
```

These are plain `readonly string[]` tuples — no React dependency. Use them with Ink, blessed, raw `process.stdout`, or any UI framework.

## License

MIT
