# ⚡ Casio fx-991EX ClassWiz — Engineering Workstation & Scientific Calculator

<div align="center">

![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Web Audio](https://img.shields.io/badge/Web%20Audio%20API-00599C?style=for-the-badge)
![Zero Dependencies](https://img.shields.io/badge/Dependencies-Zero-success?style=for-the-badge)

**An authentic, high-precision simulation of the legendary Casio fx-991EX ClassWiz scientific and engineering calculator.**  
Featuring a **Natural-V.P.A.M. Dot-Matrix LCD**, **Replay D-Pad In-Line Cursor Navigation**, **$S \iff D$ Exact Fraction Toggling**, **3-Tier Key Hierarchy**, and a full-screen **Desktop Engineering Workstation Console** with live variable inspectors and calculation paper tape.

---

### ✦ Developed with Pride by **Atharv** ✦

</div>

---

## 📑 Table of Contents

- [✨ Key Highlights](#-key-highlights)
- [🖥️ Dual Experience: Handheld & Desktop Workstation](#️-dual-experience-handheld--desktop-workstation)
- [🧮 Hardware Emulation & Feature Matrix](#-hardware-emulation--feature-matrix)
  - [1. Natural-V.P.A.M. LCD Display](#1-natural-vpam-lcd-display)
  - [2. Replay D-Pad with Active Cursor](#2-replay-d-pad-with-active-cursor)
  - [3. 3-Tier Legend Hierarchy (Shift & Alpha)](#3-3-tier-legend-hierarchy-shift--alpha)
  - [4. Casio-Exclusive Function Keys](#4-casio-exclusive-function-keys)
  - [5. Advanced Calculus & Number Theory](#5-advanced-calculus--number-theory)
  - [6. Desktop Engineering Docks](#6-desktop-engineering-docks)
- [🎨 Themes & Aesthetics](#-themes--aesthetics)
- [⌨️ Keyboard Shortcuts Reference](#️-keyboard-shortcuts-reference)
- [🚀 Quick Start & Installation](#-quick-start--installation)
- [📁 Project Structure](#-project-structure)
- [🔬 Mathematical Verification & Accuracy](#-mathematical-verification--accuracy)
- [📜 License](#-license)

---

## ✨ Key Highlights

- **🎯 Zero-Scroll Guarantee (`100dvh`)**: Fluidly scales across all screen dimensions (smartphones, tablets, laptops, 4K monitors) with **zero page scrollbars**.
- **🔋 Simulated Photovoltaic Solar Panel**: High-gloss solar cell strip with copper grid lines and `"TWO WAY POWER"` badging.
- **🔄 $S \iff D$ Fraction-to-Decimal Conversion**: Uses continued fraction approximations to toggle between exact fractions ($\frac{3}{4}$), decimals (`0.75`), and sexagesimal DMS (`12°30'0"`).
- **📝 Real-Time Cursor Editing**: Position the blinking text caret anywhere inside an expression with `◀` / `▶` to edit, insert, or delete without wiping the equation.
- **📊 9 Memory Registers ($A, B, C, D, E, F, x, y, M$)**: Hardware-accurate variable storage and recall (`STO` & `RCL`).
- **🔊 Web Audio API Haptic Feedback**: Pure synthesized tactile sound effects with zero external audio assets.
- **🛡️ 100% Vanilla Codebase**: Zero frameworks, zero external dependencies, ultra-fast load times.

---

## 🖥️ Dual Experience: Handheld & Desktop Workstation

| Mobile & Tablet Handheld Mode (`< 1024px`) | Desktop Engineering Console (`≥ 1024px`) |
| :--- | :--- |
| **Ergonomic Handheld Casio Form Factor**: Proportional, tactile keypad designed for touch and click ergonomics. Side drawers slide in smoothly on demand. | **Full-Screen 3-Panel Benchtop Console**: Main Casio unit centered between a **Live Variable Inspector** (Left) and a **Continuous Calculation Tape** (Right). |

```
+--------------------------+------------------------------+--------------------------+
|  LEFT DOCK (Desktop)     |  CENTER STAGE (Casio Unit)   |  RIGHT DOCK (Desktop)    |
|  - Live Variable Chips   |  - Casio fx-991EX Chassis    |  - Continuous Paper Tape |
|    (A, B, C, D, E, F,    |  - Photovoltaic Solar Cell   |    (Timestamps & History)|
|     x, y, M values)      |  - Natural-V.P.A.M. Screen   |  - 1-Click Physical      |
|  - Instant Unit          |  - Silver Replay D-Pad       |    Constants Palette     |
|    Converter Suite       |  - 3-Tier Legend Keypad      |    (Speed of light, etc.)|
+--------------------------+------------------------------+--------------------------+
```

> **Tip**: Desktop users can click the **🖥️ Console** button on the top rim to toggle between the 3-panel Workstation and a focused Single-Calculator Handheld mode.

---

## 🧮 Hardware Emulation & Feature Matrix

### 1. Natural-V.P.A.M. LCD Display
- **Status Annunciator Bar**:
  - `[S]` : Gold **SHIFT** active.
  - `[A]` : Magenta **ALPHA** active.
  - `[M]` : Memory register $M \neq 0$.
  - `[STO]` : Store variable mode waiting for target register ($A$–$F, x, y, M$).
  - `[D]` / `[R]` / `[G]` : Active angular unit (Degree / Radian / Gradian).
  - `[Math ▲▼]` : Multi-line equation scroll indicators.
- **Optical Lens Glare**: Protective angled plastic glass reflection sheen.
- **Two-Line Natural Text View**: Upper line displays the active formula with an in-line cursor; lower line displays right-aligned large results.

### 2. Replay D-Pad with Active Cursor
- **Concentric Spun-Metal Aluminum Disc**: Radial metallic texture with polished chrome border.
- **`◀` / `▶` In-Line Cursor Navigation**: Move the blinking `|` caret to insert parentheses, modify coefficients, or fix typos without clearing.
- **`▲` / `▼` History Playback**: Step backward and forward through prior expressions in the calculation stack.

### 3. 3-Tier Legend Hierarchy (Shift & Alpha)
Every physical keycap features Casio's classic 3-layer architecture:
1. **Top-Left Gold Print**: Activated by pressing `SHIFT` (auto-resets after execution).
2. **Top-Right Magenta Print**: Activated by pressing `ALPHA` for variable assignment.
3. **Keycap Center Print**: Primary standard operation.

### 4. Casio-Exclusive Function Keys
- **`S<=>D`**: Toggles result between **Exact Fraction** ($\frac{a}{b}$), **Decimal** (`0.xxx`), and **DMS** ($D^\circ M' S''$).
- **`Ans`**: Recalls the previous calculation's answer; typing an operator (`+`, `−`, `×`, `÷`) at the start of a formula automatically chains from `Ans`.
- **`×10^x`**: Directly inserts scientific exponential multipliers (e.g., $3 \times 10^8$).
- **`STO` / `RCL`**: Saves answers into named registers ($A, B, C, D, E, F, x, y, M$) persisted in `localStorage`.
- **`° ' "` (DMS)**: Converts and evaluates sexagesimal angles ($12^\circ 30' 0'' = 12.5^\circ$).

### 5. Advanced Calculus & Number Theory
- **Numerical Derivative**: $\frac{d}{dx}f(x)\Big|_{x=a}$ via central finite difference approximation:
  $$\frac{f(a+h) - f(a-h)}{2h}, \quad h = 10^{-6}$$
- **Numerical Definite Integral**: $\int_{a}^{b} f(x)\,dx$ evaluated via adaptive **Simpson's 1/3 Rule** ($N=1000$ intervals).
- **Combinatorics**: Permutations ($nPr$) and Combinations ($nCr$).
- **Number Theory**: Modulo ($\text{mod}$), Greatest Common Divisor ($\text{GCD}$), and Least Common Multiple ($\text{LCM}$).
- **Hyperbolics**: $\sinh, \cosh, \tanh, \sinh^{-1}, \cosh^{-1}, \tanh^{-1}$.

### 6. Desktop Engineering Docks
- **Variable Inspector**: Live visual chips showing active values of $A, B, C, D, E, F, x, y, M$ with 1-click insertion and reset.
- **Calculation Paper Tape**: Chronological stream of past equations with equation IDs (`#1, #2...`), timestamps, and 1-click restore.
- **Engineering Unit Converter**: Covers 8 domains:
  - *Length* (m, km, cm, mm, in, ft, yd, mi)
  - *Mass* (kg, g, mg, lb, oz)
  - *Temperature* (°C, °F, K)
  - *Pressure* (Pa, kPa, bar, psi, atm, torr)
  - *Energy* (J, kJ, cal, kcal, kWh)
  - *Power* (W, kW, hp)
  - *Speed* (m/s, km/h, mph)
  - *Digital Storage* (B, KB, MB, GB, TB)
- **Physical Constants Palette**: Fundamental CODATA constants ($c, h, \hbar, G, g, e, m_e, m_p, N_A, k_B, R, \varepsilon_0, \mu_0, \text{atm}$) with 1-click insertion.

---

## 🎨 Themes & Aesthetics

Switch between themes using the **🌓 LCD/OLED** toggle:

| Classic Casio LCD (Default) | High-Contrast Modern OLED |
| :--- | :--- |
| Authentic greenish-gray liquid crystal background (`#c7d5bf`), deep ink-black matrix segments (`#121c12`), and subtle inner shadow bevels. | Deep obsidian background (`#070a10`) with luminous ice-cyan active characters (`#38bdf8`) and glowing annunciators. |

---

## ⌨️ Keyboard Shortcuts Reference

| Key / Shortcut | Calculator Action |
| :--- | :--- |
| `0` – `9` | Digit input |
| `.` | Decimal point |
| `+` / `-` / `*` / `/` | Basic arithmetic operators ($+$, $-$, $\times$, $\div$) |
| `Enter` or `=` | Execute calculation (`=`) |
| `Backspace` | Delete character before cursor (`DEL`) |
| `Escape` | All Clear (`AC`) |
| `ArrowLeft` (`◀`) | Move cursor left in equation |
| `ArrowRight` (`▶`) | Move cursor right in equation |
| `ArrowUp` (`▲`) | Scroll backward in history |
| `ArrowDown` (`▼`) | Scroll forward in history |
| `Shift` | Toggle **SHIFT** mode |
| `s` / `c` / `t` | $\sin$, $\cos$, $\tan$ functions |
| `p` / `e` | $\pi$ and $e$ mathematical constants |

---

## 🚀 Quick Start & Installation

No build steps, compilers, or package managers required. Simply clone and run:

```bash
# 1. Clone the repository
git clone https://github.com/your-username/CalculatorPRO.git

# 2. Open index.html in any modern browser
cd CalculatorPRO
start index.html   # On Windows
# or open index.html on macOS / Linux
```

### Local Static Server (Optional)
```bash
npx serve .
# or
python -m http.server 8000
```

---

## 📁 Project Structure

```
CalculatorPRO/
├── index.html       # Semantic markup for Casio chassis, LCD, D-Pad, and desktop docks
├── style.css        # Industrial design tokens, 3D key bevels, glassmorphism, and responsive clamp rules
├── script.js        # Casio evaluation engine, continued fractions, cursor manager, & Web Audio
└── README.md        # Comprehensive documentation
```

---

## 🔬 Mathematical Verification & Accuracy

The underlying engine has been rigorously validated with automated test suites covering:
- **Floating-point precision**: Eliminates IEEE 754 artifacts ($0.1 + 0.2 = 0.3$).
- **$S \iff D$ continued fractions**: Accurately simplifies $\frac{1}{2} + \frac{1}{4} = \frac{3}{4}$, $-0.6 = -\frac{3}{5}$.
- **Numerical calculus**:
  - $\frac{d}{dx}(x^2)\Big|_{x=3} = 6.0000$
  - $\int_{0}^{1} 3x^2\,dx = 1.0000$
- **Combinatorics**: $5\,nPr\,3 = 60$, $5\,nCr\,3 = 10$.
- **Error containment**: Division by zero and domain violations gracefully trigger `Math ERROR`.

---

## 📜 License

Distributed under the **MIT License**.

<div align="center">

---

**Designed & Engineered by [Atharv](https://github.com/)**  
*Inspired by the Casio fx-991EX ClassWiz hardware calculator.*

</div>
