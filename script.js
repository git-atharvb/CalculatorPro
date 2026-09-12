/**
 * Casio fx-991EX ClassWiz Simulation & Responsive Workstation Engine
 * Zero-Scroll Responsive Layout, Desktop Engineering Docks (Live Registers & Paper Tape),
 * In-Line Cursor Navigation, S<=>D Fraction-to-Decimal Toggling, & Ans Memory.
 */

(function () {
  'use strict';

  // --- SCIENTIFIC CONSTANTS DATA ---
  const CONSTANTS_DATA = [
    { symbol: 'c', name: 'Speed of Light in Vacuum', value: 299792458, unit: 'm/s' },
    { symbol: 'h', name: 'Planck Constant', value: 6.62607015e-34, unit: 'J·s' },
    { symbol: 'ħ', name: 'Reduced Planck Constant', value: 1.054571817e-34, unit: 'J·s' },
    { symbol: 'G', name: 'Gravitational Constant', value: 6.67430e-11, unit: 'm³/(kg·s²)' },
    { symbol: 'g', name: 'Standard Acceleration of Gravity', value: 9.80665, unit: 'm/s²' },
    { symbol: 'e', name: 'Elementary Charge', value: 1.602176634e-19, unit: 'C' },
    { symbol: 'm_e', name: 'Electron Rest Mass', value: 9.1093837015e-31, unit: 'kg' },
    { symbol: 'm_p', name: 'Proton Rest Mass', value: 1.67262192369e-27, unit: 'kg' },
    { symbol: 'N_A', name: 'Avogadro Constant', value: 6.02214076e23, unit: 'mol⁻¹' },
    { symbol: 'k_B', name: 'Boltzmann Constant', value: 1.380649e-23, unit: 'J/K' },
    { symbol: 'R', name: 'Molar Gas Constant', value: 8.314462618, unit: 'J/(mol·K)' },
    { symbol: 'ε_0', name: 'Vacuum Permittivity', value: 8.8541878128e-12, unit: 'F/m' },
    { symbol: 'μ_0', name: 'Vacuum Permeability', value: 1.25663706212e-6, unit: 'N/A²' },
    { symbol: 'atm', name: 'Standard Atmosphere', value: 101325, unit: 'Pa' }
  ];

  // --- UNIT CONVERTER CONFIGURATION ---
  const CONVERTER_UNITS = {
    length: {
      m: { name: 'Meter (m)', factor: 1 },
      km: { name: 'Kilometer (km)', factor: 1000 },
      cm: { name: 'Centimeter (cm)', factor: 0.01 },
      mm: { name: 'Millimeter (mm)', factor: 0.001 },
      in: { name: 'Inch (in)', factor: 0.0254 },
      ft: { name: 'Foot (ft)', factor: 0.3048 },
      yd: { name: 'Yard (yd)', factor: 0.9144 },
      mi: { name: 'Mile (mi)', factor: 1609.344 }
    },
    mass: {
      kg: { name: 'Kilogram (kg)', factor: 1 },
      g: { name: 'Gram (g)', factor: 0.001 },
      mg: { name: 'Milligram (mg)', factor: 1e-6 },
      lb: { name: 'Pound (lb)', factor: 0.45359237 },
      oz: { name: 'Ounce (oz)', factor: 0.028349523125 }
    },
    temperature: {
      C: { name: 'Celsius (°C)', isTemp: true },
      F: { name: 'Fahrenheit (°F)', isTemp: true },
      K: { name: 'Kelvin (K)', isTemp: true }
    },
    pressure: {
      Pa: { name: 'Pascal (Pa)', factor: 1 },
      kPa: { name: 'Kilopascal (kPa)', factor: 1000 },
      bar: { name: 'Bar', factor: 100000 },
      psi: { name: 'PSI', factor: 6894.757 },
      atm: { name: 'Atmosphere (atm)', factor: 101325 },
      torr: { name: 'Torr (mmHg)', factor: 133.322 }
    },
    energy: {
      J: { name: 'Joule (J)', factor: 1 },
      kJ: { name: 'Kilojoule (kJ)', factor: 1000 },
      cal: { name: 'Calorie (cal)', factor: 4.184 },
      kcal: { name: 'Kilocalorie (kcal)', factor: 4184 },
      kWh: { name: 'Kilowatt-hour (kWh)', factor: 3.6e6 }
    },
    power: {
      W: { name: 'Watt (W)', factor: 1 },
      kW: { name: 'Kilowatt (kW)', factor: 1000 },
      hp: { name: 'Horsepower (hp)', factor: 745.69987 }
    },
    speed: {
      mps: { name: 'Meters/sec (m/s)', factor: 1 },
      kph: { name: 'Kilometers/hour (km/h)', factor: 0.27777778 },
      mph: { name: 'Miles/hour (mph)', factor: 0.44704 }
    },
    data: {
      B: { name: 'Byte (B)', factor: 1 },
      KB: { name: 'Kilobyte (KB)', factor: 1024 },
      MB: { name: 'Megabyte (MB)', factor: 1048576 },
      GB: { name: 'Gigabyte (GB)', factor: 1073741824 },
      TB: { name: 'Terabyte (TB)', factor: 1099511627776 }
    }
  };

  // --- HARDWARE SOUND SYNTHESIZER ---
  class SoundFeedback {
    constructor() {
      this.enabled = localStorage.getItem('casio_sound') !== 'false';
      this.ctx = null;
    }

    initCtx() {
      if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioCtx();
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    playClick(freq = 640, duration = 0.025, vol = 0.05) {
      if (!this.enabled) return;
      try {
        this.initCtx();
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        gain.gain.setValueAtTime(vol, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + duration);
      } catch (e) {}
    }

    playShift() { this.playClick(960, 0.035, 0.07); }
    playAlpha() { this.playClick(820, 0.035, 0.07); }
    playBeep() { this.playClick(1050, 0.06, 0.08); }
    playError() { this.playClick(220, 0.12, 0.09); }

    toggle() {
      this.enabled = !this.enabled;
      localStorage.setItem('casio_sound', this.enabled);
      return this.enabled;
    }
  }

  // --- CASIO MATHEMATICAL ENGINE & CONTINUED FRACTION PARSER ---
  class CasioMathEvaluator {
    constructor() {
      this.angleMode = 'DEG'; // 'DEG', 'RAD', 'GRAD'
      this.lastAnswer = 0;
      this.variables = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0, x: 0, y: 0, M: 0 };
      this.loadVariables();
    }

    loadVariables() {
      const saved = localStorage.getItem('casio_vars');
      if (saved) {
        try { Object.assign(this.variables, JSON.parse(saved)); } catch (e) {}
      }
    }

    saveVariables() {
      localStorage.setItem('casio_vars', JSON.stringify(this.variables));
    }

    setAngleMode(mode) {
      this.angleMode = mode;
    }

    cycleAngleMode() {
      const modes = ['DEG', 'RAD', 'GRAD'];
      const nextIdx = (modes.indexOf(this.angleMode) + 1) % modes.length;
      this.angleMode = modes[nextIdx];
      return this.angleMode;
    }

    factorial(n) {
      if (n < 0 || !Number.isInteger(n)) return NaN;
      if (n === 0 || n === 1) return 1;
      if (n > 170) return Infinity;
      let res = 1;
      for (let i = 2; i <= n; i++) res *= i;
      return res;
    }

    nPr(n, r) {
      if (n < 0 || r < 0 || r > n || !Number.isInteger(n) || !Number.isInteger(r)) return NaN;
      return this.factorial(n) / this.factorial(n - r);
    }

    nCr(n, r) {
      if (n < 0 || r < 0 || r > n || !Number.isInteger(n) || !Number.isInteger(r)) return NaN;
      return this.factorial(n) / (this.factorial(r) * this.factorial(n - r));
    }

    gcd(a, b) {
      a = Math.abs(Math.round(a));
      b = Math.abs(Math.round(b));
      while (b) { const t = b; b = a % b; a = t; }
      return a;
    }

    lcm(a, b) {
      if (a === 0 || b === 0) return 0;
      return Math.abs(Math.round(a * b)) / this.gcd(a, b);
    }

    decimalToFraction(val, maxDenominator = 10000) {
      if (!Number.isFinite(val) || Number.isNaN(val)) return null;
      if (Number.isInteger(val)) return `${val}`;

      const sign = val < 0 ? -1 : 1;
      const x = Math.abs(val);

      let h1 = 1, h2 = 0, k1 = 0, k2 = 1;
      let b = x;

      do {
        const a = Math.floor(b);
        let aux = h1;
        h1 = a * h1 + h2;
        h2 = aux;
        aux = k1;
        k1 = a * k1 + k2;
        k2 = aux;
        b = 1 / (b - a);
      } while (Math.abs(x - h1 / k1) > x * 1e-9 && k1 < maxDenominator);

      if (k1 <= maxDenominator && Math.abs(x - h1 / k1) < 1e-6) {
        const num = sign * h1;
        const den = k1;
        if (den === 1) return `${num}`;
        return `${num}/${den}`;
      }
      return null;
    }

    decimalToDMS(val) {
      if (!Number.isFinite(val)) return null;
      const sign = val < 0 ? '-' : '';
      const absVal = Math.abs(val);
      const degrees = Math.floor(absVal);
      const minutesFloat = (absVal - degrees) * 60;
      const minutes = Math.floor(minutesFloat);
      const seconds = Math.round((minutesFloat - minutes) * 60 * 100) / 100;
      return `${sign}${degrees}°${minutes}'${seconds}"`;
    }

    numericalDerivative(fnStr, xVal) {
      const h = 1e-6;
      const f = (x) => {
        const expr = fnStr.replace(/\bx\b/g, `(${x})`);
        const res = this.evaluate(expr);
        return res.success ? res.result : NaN;
      };
      const d = (f(xVal + h) - f(xVal - h)) / (2 * h);
      return Math.round(d * 1e8) / 1e8;
    }

    numericalIntegral(fnStr, a, b) {
      const n = 1000;
      const h = (b - a) / n;
      const f = (x) => {
        const expr = fnStr.replace(/\bx\b/g, `(${x})`);
        const res = this.evaluate(expr);
        return res.success ? res.result : NaN;
      };
      let sum = f(a) + f(b);
      for (let i = 1; i < n; i++) {
        const x = a + i * h;
        sum += (i % 2 === 0 ? 2 : 4) * f(x);
      }
      return Math.round(((h / 3) * sum) * 1e8) / 1e8;
    }

    formatNumber(num) {
      if (!Number.isFinite(num)) {
        if (Number.isNaN(num)) return 'Math ERROR';
        return num > 0 ? 'Infinity' : '-Infinity';
      }
      const cleanNum = Number(Math.round(num + 'e+12') + 'e-12');
      if (Math.abs(cleanNum) >= 1e12 || (Math.abs(cleanNum) < 1e-6 && cleanNum !== 0)) {
        return cleanNum.toExponential(7).replace(/\.?0+e/, 'e');
      }
      return cleanNum.toString();
    }

    evaluate(rawExpr) {
      if (!rawExpr || rawExpr.trim() === '') return { success: false, error: 'Syntax ERROR' };

      try {
        let expr = rawExpr;

        // Replace Ans
        expr = expr.replace(/\bAns\b/g, `(${this.lastAnswer})`);

        // Replace named variables A, B, C, D, E, F, M
        ['A', 'B', 'C', 'D', 'E', 'F', 'M'].forEach((v) => {
          const regex = new RegExp(`(?<![a-zA-Z0-9_])${v}(?![a-zA-Z0-9_])`, 'g');
          expr = expr.replace(regex, `(${this.variables[v] || 0})`);
        });

        // Numerical Calculus
        expr = expr.replace(/diff\(([^,]+),\s*([^)]+)\)/g, (m, f, x) => {
          const xVal = this.evaluate(x).result;
          return this.numericalDerivative(f, xVal);
        });
        expr = expr.replace(/integral\(([^,]+),\s*([^,]+),\s*([^)]+)\)/g, (m, f, a, b) => {
          const aVal = this.evaluate(a).result;
          const bVal = this.evaluate(b).result;
          return this.numericalIntegral(f, aVal, bVal);
        });

        // Scientific Notation multiplier ×10^(...)
        expr = expr.replace(/×10\^\(([^)]+)\)/g, '* (10**($1))');

        // Casio standard symbols
        expr = expr.replace(/×/g, '*')
                   .replace(/÷/g, '/')
                   .replace(/−/g, '-')
                   .replace(/π/g, `(${Math.PI})`)
                   .replace(/\be\b/g, `(${Math.E})`);

        // DMS parsing
        expr = expr.replace(/(\d+(\.\d+)?)°(\d+(\.\d+)?)'(\d+(\.\d+)?)"/g, (m, d, _, mi, __, s) => {
          return `(${d} + ${mi}/60 + ${s}/3600)`;
        });
        expr = expr.replace(/(\d+(\.\d+)?)°(\d+(\.\d+)?)'/g, (m, d, _, mi) => `(${d} + ${mi}/60)`);
        expr = expr.replace(/(\d+(\.\d+)?)°/g, '$1');

        // Percentage & Factorial
        expr = expr.replace(/(\d+(\.\d+)?)%/g, '($1/100)');
        expr = expr.replace(/(\d+)!/g, (m, n) => `(${this.factorial(parseInt(n, 10))})`);

        // Combinatorics
        expr = expr.replace(/(\d+)\s*nPr\s*(\d+)/g, (m, n, r) => `(${this.nPr(parseInt(n,10), parseInt(r,10))})`);
        expr = expr.replace(/(\d+)\s*nCr\s*(\d+)/g, (m, n, r) => `(${this.nCr(parseInt(n,10), parseInt(r,10))})`);

        // Powers: x^y
        while (expr.includes('^')) {
          const powRegex = /([0-9.]+|\([0-9.+\-*/^ ]+\))\^([0-9.]+|\([0-9.+\-*/^ ]+\))/;
          if (!powRegex.test(expr)) break;
          expr = expr.replace(powRegex, 'Math.pow($1,$2)');
        }

        // Parentheses balancing
        const openCount = (expr.match(/\(/g) || []).length;
        const closeCount = (expr.match(/\)/g) || []).length;
        if (openCount > closeCount) {
          expr += ')'.repeat(openCount - closeCount);
        }

        // Trigonometry
        if (this.angleMode === 'DEG') {
          expr = expr.replace(/sin\(([^)]+)\)/g, (m, a) => `Math.sin((${a}) * Math.PI / 180)`);
          expr = expr.replace(/cos\(([^)]+)\)/g, (m, a) => `Math.cos((${a}) * Math.PI / 180)`);
          expr = expr.replace(/tan\(([^)]+)\)/g, (m, a) => `(Math.abs(Math.cos((${a}) * Math.PI / 180)) < 1e-15 ? NaN : Math.tan((${a}) * Math.PI / 180))`);
          expr = expr.replace(/asin\(([^)]+)\)/g, (m, a) => `(Math.asin(${a}) * 180 / Math.PI)`);
          expr = expr.replace(/acos\(([^)]+)\)/g, (m, a) => `(Math.acos(${a}) * 180 / Math.PI)`);
          expr = expr.replace(/atan\(([^)]+)\)/g, (m, a) => `(Math.atan(${a}) * 180 / Math.PI)`);
        } else if (this.angleMode === 'GRAD') {
          expr = expr.replace(/sin\(([^)]+)\)/g, (m, a) => `Math.sin((${a}) * Math.PI / 200)`);
          expr = expr.replace(/cos\(([^)]+)\)/g, (m, a) => `Math.cos((${a}) * Math.PI / 200)`);
          expr = expr.replace(/tan\(([^)]+)\)/g, (m, a) => `Math.tan((${a}) * Math.PI / 200)`);
          expr = expr.replace(/asin\(([^)]+)\)/g, (m, a) => `(Math.asin(${a}) * 200 / Math.PI)`);
          expr = expr.replace(/acos\(([^)]+)\)/g, (m, a) => `(Math.acos(${a}) * 200 / Math.PI)`);
          expr = expr.replace(/atan\(([^)]+)\)/g, (m, a) => `(Math.atan(${a}) * 200 / Math.PI)`);
        } else {
          expr = expr.replace(/sin\(/g, 'Math.sin(')
                     .replace(/cos\(/g, 'Math.cos(')
                     .replace(/tan\(/g, 'Math.tan(');
        }

        // Hyperbolics
        expr = expr.replace(/sinh\(/g, 'Math.sinh(')
                   .replace(/cosh\(/g, 'Math.cosh(')
                   .replace(/tanh\(/g, 'Math.tanh(')
                   .replace(/asinh\(/g, 'Math.asinh(')
                   .replace(/acosh\(/g, 'Math.acosh(')
                   .replace(/atanh\(/g, 'Math.atanh(');

        // Powers, Roots, Logs
        expr = expr.replace(/sqrt\(/g, 'Math.sqrt(')
                   .replace(/cbrt\(/g, 'Math.cbrt(')
                   .replace(/nthRoot\(([^,]+),\s*([^)]+)\)/g, 'Math.pow($2, 1/($1))')
                   .replace(/exp\(/g, 'Math.exp(')
                   .replace(/pow10\(/g, 'Math.pow(10,')
                   .replace(/ln\(/g, 'Math.log(')
                   .replace(/log\(/g, 'Math.log10(')
                   .replace(/abs\(/g, 'Math.abs(')
                   .replace(/rand\(\)/g, 'Math.random()');

        // GCD and LCM
        expr = expr.replace(/gcd\(([^,]+),\s*([^)]+)\)/g, (m, a, b) => `${this.gcd(eval(a), eval(b))}`);
        expr = expr.replace(/lcm\(([^,]+),\s*([^)]+)\)/g, (m, a, b) => `${this.lcm(eval(a), eval(b))}`);

        // Division by zero check
        if (/\/\s*0(?![0-9.])/.test(expr)) {
          return { success: false, error: 'Math ERROR' };
        }

        // Safe Function Execution
        // eslint-disable-next-line no-new-func
        const fn = new Function(`"use strict"; return (${expr});`);
        const result = fn();

        if (result === undefined || isNaN(result)) {
          return { success: false, error: 'Math ERROR' };
        }

        const fraction = this.decimalToFraction(result);
        const dms = this.decimalToDMS(result);

        return {
          success: true,
          result: result,
          formatted: this.formatNumber(result),
          fraction: fraction,
          dms: dms
        };
      } catch (e) {
        return { success: false, error: 'Syntax ERROR' };
      }
    }
  }

  // --- WORKSTATION & CASIO CONTROLLER ---
  class CasioCalculatorController {
    constructor() {
      this.sound = new SoundFeedback();
      this.evaluator = new CasioMathEvaluator();

      // State
      this.expression = '';
      this.cursorPos = 0;
      this.currentResult = '0';
      this.hasCalculated = false;

      this.isShift = false;
      this.isAlpha = false;
      this.isStore = false;

      this.sdState = 0;
      this.lastResultObj = null;

      this.history = JSON.parse(localStorage.getItem('casio_history') || '[]');
      this.historyIdx = -1;

      // DOM Elements
      this.dom = {
        viewport: document.getElementById('workstation-viewport'),
        container: document.getElementById('workstation-container'),
        calculator: document.getElementById('calculator'),
        exprBefore: document.getElementById('expr-before'),
        lcdCursor: document.getElementById('lcd-cursor'),
        exprAfter: document.getElementById('expr-after'),
        lcdPrevExpr: document.getElementById('lcd-prev-expression'),
        lcdResult: document.getElementById('lcd-result-line'),

        // Annunciators
        annShift: document.getElementById('ann-shift'),
        annAlpha: document.getElementById('ann-alpha'),
        annMem: document.getElementById('ann-mem'),
        annSto: document.getElementById('ann-sto'),
        annAngle: document.getElementById('ann-angle'),
        annEng: document.getElementById('ann-eng'),

        // Navigation Keys
        btnShift: document.getElementById('btn-shift'),
        btnAlpha: document.getElementById('btn-alpha'),
        btnOptn: document.getElementById('btn-optn'),
        btnOn: document.getElementById('btn-on'),

        // D-Pad
        dpadUp: document.getElementById('btn-dpad-up'),
        dpadDown: document.getElementById('btn-dpad-down'),
        dpadLeft: document.getElementById('btn-dpad-left'),
        dpadRight: document.getElementById('btn-dpad-right'),

        // Modals & Drawers
        optnModal: document.getElementById('optn-modal'),
        optnClose: document.getElementById('optn-close'),
        optnBackdrop: document.getElementById('optn-backdrop'),
        constantsDrawer: document.getElementById('constants-drawer'),
        converterDrawer: document.getElementById('converter-drawer'),
        historyDrawer: document.getElementById('history-drawer'),
        constantsList: document.getElementById('constants-list'),
        constantsSearch: document.getElementById('constants-search'),
        historyList: document.getElementById('history-list'),

        // Desktop Docks
        dockTapeStream: document.getElementById('dock-tape-stream'),
        dockConstList: document.getElementById('dock-const-list'),
        dockConstSearch: document.getElementById('dock-const-search'),
        dockClearTape: document.getElementById('dock-clear-tape'),
        dockClearVars: document.getElementById('dock-clear-vars'),
        dockConvCategory: document.getElementById('dock-conv-category'),
        dockConvFrom: document.getElementById('dock-conv-from'),
        dockConvTo: document.getElementById('dock-conv-to'),
        dockConvIn: document.getElementById('dock-conv-in'),
        dockConvOut: document.getElementById('dock-conv-out'),
        dockConvApply: document.getElementById('dock-conv-apply'),
        workstationModeToggle: document.getElementById('workstation-mode-toggle'),

        // Mobile Converter
        converterCategory: document.getElementById('converter-category'),
        converterFromUnit: document.getElementById('converter-from-unit'),
        converterToUnit: document.getElementById('converter-to-unit'),
        converterFromVal: document.getElementById('converter-from-val'),
        converterToVal: document.getElementById('converter-to-val'),
        btnSwapUnits: document.getElementById('btn-swap-units'),
        btnConverterApply: document.getElementById('btn-converter-apply'),

        // Toast
        toast: document.getElementById('toast'),
        toastMsg: document.getElementById('toast-msg'),
      };

      this.init();
    }

    init() {
      this.bindEvents();
      this.initTheme();
      this.initWorkstationMode();
      this.initConstants();
      this.initConverter();
      this.initDesktopConverter();
      this.updateHistoryList();
      this.updateDockTape();
      this.updateDockVariables();
      this.updateDisplay();
    }

    bindEvents() {
      // Keypad delegation
      document.addEventListener('click', (e) => {
        const btn = e.target.closest('button.casio-btn');
        if (!btn) return;

        const val = btn.dataset.val;
        const shiftVal = btn.dataset.shiftVal;
        const alphaVal = btn.dataset.alphaVal;
        const keyType = btn.dataset.key;

        if (keyType === 'shift') {
          this.toggleShift();
          return;
        }
        if (keyType === 'alpha') {
          this.toggleAlpha();
          return;
        }
        if (keyType === 'on') {
          this.resetAll();
          this.sound.playBeep();
          return;
        }
        if (keyType === 'optn') {
          this.openModal(this.dom.optnModal);
          this.sound.playClick();
          return;
        }

        this.handleKey(val, shiftVal, alphaVal, btn);
      });

      // D-Pad Replay Wheel
      this.dom.dpadLeft.addEventListener('click', () => this.moveCursorLeft());
      this.dom.dpadRight.addEventListener('click', () => this.moveCursorRight());
      this.dom.dpadUp.addEventListener('click', () => this.historyPrev());
      this.dom.dpadDown.addEventListener('click', () => this.historyNext());

      // Utility Bar
      document.getElementById('theme-lcd-toggle').addEventListener('click', () => this.toggleTheme());
      document.getElementById('sound-toggle').addEventListener('click', () => this.toggleSound());
      
      if (this.dom.workstationModeToggle) {
        this.dom.workstationModeToggle.addEventListener('click', () => this.toggleWorkstationFocus());
      }

      // Mobile Drawers
      const constToggle = document.getElementById('constants-toggle');
      if (constToggle) constToggle.addEventListener('click', () => this.openDrawer(this.dom.constantsDrawer));
      const convToggle = document.getElementById('converter-toggle');
      if (convToggle) convToggle.addEventListener('click', () => this.openDrawer(this.dom.converterDrawer));
      const histToggle = document.getElementById('history-toggle');
      if (histToggle) histToggle.addEventListener('click', () => this.openDrawer(this.dom.historyDrawer));

      // Drawers close
      document.getElementById('close-constants-btn').addEventListener('click', () => this.closeDrawer(this.dom.constantsDrawer));
      document.getElementById('constants-backdrop').addEventListener('click', () => this.closeDrawer(this.dom.constantsDrawer));
      document.getElementById('close-converter-btn').addEventListener('click', () => this.closeDrawer(this.dom.converterDrawer));
      document.getElementById('converter-backdrop').addEventListener('click', () => this.closeDrawer(this.dom.converterDrawer));
      document.getElementById('close-history-btn').addEventListener('click', () => this.closeDrawer(this.dom.historyDrawer));
      document.getElementById('history-backdrop').addEventListener('click', () => this.closeDrawer(this.dom.historyDrawer));
      document.getElementById('clear-history-btn').addEventListener('click', () => this.clearHistory());

      // Desktop Dock Actions
      this.dom.dockClearTape.addEventListener('click', () => this.clearHistory());
      this.dom.dockClearVars.addEventListener('click', () => {
        this.evaluator.variables = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0, x: 0, y: 0, M: 0 };
        this.evaluator.saveVariables();
        this.updateDockVariables();
        this.dom.annMem.classList.remove('active');
        this.showToast('Variables Reset');
      });

      // Variable card click in dock
      document.querySelectorAll('.var-card').forEach((card) => {
        card.addEventListener('click', () => {
          const varName = card.dataset.var;
          this.insertAtCursor(varName);
          this.sound.playClick();
        });
      });

      // Desktop Converter
      this.dom.dockConvCategory.addEventListener('change', () => this.populateDesktopConverterUnits());
      this.dom.dockConvFrom.addEventListener('change', () => this.executeDesktopConversion());
      this.dom.dockConvTo.addEventListener('change', () => this.executeDesktopConversion());
      this.dom.dockConvIn.addEventListener('input', () => this.executeDesktopConversion());
      this.dom.dockConvApply.addEventListener('click', () => {
        const val = this.dom.dockConvOut.value;
        if (val) {
          this.insertAtCursor(val);
          this.sound.playClick();
        }
      });

      // OPTN Modal
      this.dom.optnClose.addEventListener('click', () => this.closeModal(this.dom.optnModal));
      this.dom.optnBackdrop.addEventListener('click', () => this.closeModal(this.dom.optnModal));
      this.dom.optnModal.querySelectorAll('.optn-item').forEach((btn) => {
        btn.addEventListener('click', () => {
          const act = btn.dataset.action;
          const val = btn.dataset.val;
          this.closeModal(this.dom.optnModal);

          if (act === 'optn-func') {
            this.insertAtCursor(val);
          } else if (act === 'angle-cycle') {
            this.cycleAngleMode();
          } else if (act === 'open-const') {
            this.openDrawer(this.dom.constantsDrawer);
          } else if (act === 'open-conv') {
            this.openDrawer(this.dom.converterDrawer);
          }
        });
      });

      // Annunciator Angle Click
      this.dom.annAngle.addEventListener('click', () => this.cycleAngleMode());

      // Search Constants
      this.dom.constantsSearch.addEventListener('input', (e) => this.filterConstants(e.target.value));
      this.dom.dockConstSearch.addEventListener('input', (e) => this.filterDesktopConstants(e.target.value));

      // Mobile Unit Converter
      this.dom.converterCategory.addEventListener('change', () => this.populateConverterUnits());
      this.dom.converterFromUnit.addEventListener('change', () => this.executeConversion());
      this.dom.converterToUnit.addEventListener('change', () => this.executeConversion());
      this.dom.converterFromVal.addEventListener('input', () => this.executeConversion());
      this.dom.btnSwapUnits.addEventListener('click', () => this.swapConverterUnits());
      this.dom.btnConverterApply.addEventListener('click', () => this.applyConverterResult());

      // Physical Keyboard
      window.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }

    toggleWorkstationFocus() {
      const isFocus = this.dom.container.classList.toggle('focus-mode');
      localStorage.setItem('casio_focus_mode', isFocus ? 'true' : 'false');
      this.showToast(isFocus ? 'Focus Mode (Handheld Only)' : 'Console Workstation Mode');
      this.sound.playClick();
    }

    initWorkstationMode() {
      const isFocus = localStorage.getItem('casio_focus_mode') === 'true';
      this.dom.container.classList.toggle('focus-mode', isFocus);
    }

    toggleShift() {
      this.isShift = !this.isShift;
      this.isAlpha = false;
      this.dom.annShift.classList.toggle('active', this.isShift);
      this.dom.annAlpha.classList.remove('active');
      this.dom.btnShift.classList.toggle('active', this.isShift);
      this.dom.btnAlpha.classList.remove('active');
      this.sound.playShift();
    }

    toggleAlpha() {
      this.isAlpha = !this.isAlpha;
      this.isShift = false;
      this.dom.annAlpha.classList.toggle('active', this.isAlpha);
      this.dom.annShift.classList.remove('active');
      this.dom.btnAlpha.classList.toggle('active', this.isAlpha);
      this.dom.btnShift.classList.remove('active');
      this.sound.playAlpha();
    }

    clearAnnunciators() {
      this.isShift = false;
      this.isAlpha = false;
      this.dom.annShift.classList.remove('active');
      this.dom.annAlpha.classList.remove('active');
      this.dom.btnShift.classList.remove('active');
      this.dom.btnAlpha.classList.remove('active');
    }

    cycleAngleMode() {
      const mode = this.evaluator.cycleAngleMode();
      this.dom.annAngle.textContent = mode.charAt(0);
      this.showToast(`Angle: ${mode}`);
      this.sound.playClick();
      this.updateDisplay();
    }

    handleKey(val, shiftVal, alphaVal, btnElement) {
      if (btnElement) {
        btnElement.classList.add('key-pressed');
        setTimeout(() => btnElement.classList.remove('key-pressed'), 120);
      }

      let targetVal = val;
      if (this.isShift && shiftVal) {
        targetVal = shiftVal;
      } else if (this.isAlpha && alphaVal) {
        targetVal = alphaVal;
      }

      // If in STO variable mode:
      if (this.isStore) {
        if (alphaVal && ['A', 'B', 'C', 'D', 'E', 'F', 'x', 'y', 'M'].includes(alphaVal)) {
          this.evaluator.variables[alphaVal] = parseFloat(this.currentResult) || 0;
          this.evaluator.saveVariables();
          this.isStore = false;
          this.dom.annSto.classList.remove('active');
          this.updateDockVariables();
          this.showToast(`Stored to ${alphaVal} = ${this.evaluator.variables[alphaVal]}`);
          this.sound.playBeep();
          this.clearAnnunciators();
          return;
        }
      }

      this.clearAnnunciators();

      // Dispatch operations
      if (targetVal === 'del') {
        this.deleteAtCursor();
        this.sound.playClick(400);
        return;
      }
      if (targetVal === 'ac') {
        this.clearScreen();
        this.sound.playClick(360);
        return;
      }
      if (targetVal === '=') {
        this.executeCalculate();
        return;
      }
      if (targetVal === 'sd') {
        this.toggleSD();
        this.sound.playClick();
        return;
      }
      if (targetVal === 'sto') {
        this.isStore = true;
        this.dom.annSto.classList.add('active');
        this.showToast('Select Variable [A-F, x, y, M]');
        this.sound.playClick();
        return;
      }
      if (targetVal === 'rcl') {
        this.showToast('Select Variable to Recall');
        this.isAlpha = true;
        this.dom.annAlpha.classList.add('active');
        return;
      }
      if (targetVal === 'open-const') {
        this.openDrawer(this.dom.constantsDrawer);
        return;
      }
      if (targetVal === 'open-conv') {
        this.openDrawer(this.dom.converterDrawer);
        return;
      }
      if (targetVal === 'm-plus') {
        this.evaluator.variables.M += parseFloat(this.currentResult) || 0;
        this.evaluator.saveVariables();
        this.dom.annMem.classList.add('active');
        this.updateDockVariables();
        this.showToast(`M = ${this.evaluator.variables.M}`);
        this.sound.playBeep();
        return;
      }
      if (targetVal === 'm-minus') {
        this.evaluator.variables.M -= parseFloat(this.currentResult) || 0;
        this.evaluator.saveVariables();
        this.dom.annMem.classList.toggle('active', this.evaluator.variables.M !== 0);
        this.updateDockVariables();
        this.showToast(`M = ${this.evaluator.variables.M}`);
        this.sound.playBeep();
        return;
      }
      if (targetVal === 'dms') {
        this.insertAtCursor('°');
        this.sound.playClick();
        return;
      }
      if (targetVal === 'frac') {
        this.insertAtCursor('/');
        this.sound.playClick();
        return;
      }

      this.insertAtCursor(targetVal);
      this.sound.playClick();
    }

    insertAtCursor(text) {
      if (this.hasCalculated) {
        if (['+', '−', '×', '÷', '^'].includes(text)) {
          this.expression = 'Ans';
          this.cursorPos = 3;
        } else {
          this.expression = '';
          this.cursorPos = 0;
        }
        this.hasCalculated = false;
      }

      const before = this.expression.slice(0, this.cursorPos);
      const after = this.expression.slice(this.cursorPos);

      this.expression = before + text + after;
      this.cursorPos += text.length;

      this.updateDisplay();
    }

    deleteAtCursor() {
      if (this.hasCalculated) {
        this.clearScreen();
        return;
      }

      if (this.cursorPos <= 0) return;

      const before = this.expression.slice(0, this.cursorPos);
      const after = this.expression.slice(this.cursorPos);

      const multiToken = before.match(/(asin\(|acos\(|atan\(|asinh\(|acosh\(|atanh\(|sinh\(|cosh\(|tanh\(|sin\(|cos\(|tan\(|sqrt\(|cbrt\(|log\(|ln\(|abs\(|\^2|\^3|diff\(|integral\(|Ans|×10\^\()$/);
      if (multiToken) {
        const tokenLen = multiToken[0].length;
        this.expression = before.slice(0, -tokenLen) + after;
        this.cursorPos -= tokenLen;
      } else {
        this.expression = before.slice(0, -1) + after;
        this.cursorPos -= 1;
      }

      this.updateDisplay();
    }

    clearScreen() {
      this.expression = '';
      this.cursorPos = 0;
      this.currentResult = '0';
      this.hasCalculated = false;
      this.lastResultObj = null;
      this.sdState = 0;
      this.dom.lcdPrevExpr.textContent = '';
      this.dom.lcdResult.classList.remove('error');
      this.clearAnnunciators();
      this.updateDisplay();
    }

    resetAll() {
      this.clearScreen();
      this.evaluator.variables = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0, x: 0, y: 0, M: 0 };
      this.evaluator.saveVariables();
      this.updateDockVariables();
      this.dom.annMem.classList.remove('active');
      this.showToast('Casio Reset Complete');
    }

    moveCursorLeft() {
      if (this.cursorPos > 0) {
        this.cursorPos--;
        this.sound.playClick(750, 0.015);
        this.updateDisplay();
      }
    }

    moveCursorRight() {
      if (this.cursorPos < this.expression.length) {
        this.cursorPos++;
        this.sound.playClick(750, 0.015);
        this.updateDisplay();
      }
    }

    historyPrev() {
      if (this.history.length === 0) return;
      if (this.historyIdx < this.history.length - 1) {
        this.historyIdx++;
        const item = this.history[this.historyIdx];
        this.expression = item.expression;
        this.cursorPos = this.expression.length;
        this.hasCalculated = false;
        this.sound.playClick();
        this.updateDisplay();
      }
    }

    historyNext() {
      if (this.historyIdx > 0) {
        this.historyIdx--;
        const item = this.history[this.historyIdx];
        this.expression = item.expression;
        this.cursorPos = this.expression.length;
        this.hasCalculated = false;
        this.sound.playClick();
        this.updateDisplay();
      } else if (this.historyIdx === 0) {
        this.historyIdx = -1;
        this.expression = '';
        this.cursorPos = 0;
        this.hasCalculated = false;
        this.updateDisplay();
      }
    }

    executeCalculate() {
      if (this.expression === '') return;

      const res = this.evaluator.evaluate(this.expression);

      if (res.success) {
        this.sound.playBeep();
        this.evaluator.lastAnswer = res.result;
        this.currentResult = String(res.result);
        this.lastResultObj = res;
        this.sdState = 0;

        this.dom.lcdPrevExpr.textContent = `${this.expression} =`;

        if (res.fraction && res.fraction !== String(res.result) && !res.fraction.includes('.')) {
          this.dom.lcdResult.textContent = res.fraction;
        } else {
          this.dom.lcdResult.textContent = res.formatted;
        }

        this.dom.lcdResult.classList.remove('error');
        this.addHistory(this.expression, this.dom.lcdResult.textContent);

        this.hasCalculated = true;
        this.historyIdx = -1;
      } else {
        this.sound.playError();
        this.dom.lcdResult.textContent = res.error;
        this.dom.lcdResult.classList.add('error');
      }
    }

    toggleSD() {
      if (!this.lastResultObj) return;

      const obj = this.lastResultObj;
      this.sdState = (this.sdState + 1) % 3;

      if (this.sdState === 0) {
        this.dom.lcdResult.textContent = obj.fraction || obj.formatted;
      } else if (this.sdState === 1) {
        this.dom.lcdResult.textContent = obj.formatted;
      } else if (this.sdState === 2) {
        this.dom.lcdResult.textContent = obj.dms || obj.formatted;
      }
    }

    updateDisplay() {
      const before = this.expression.slice(0, this.cursorPos);
      const after = this.expression.slice(this.cursorPos);

      this.dom.exprBefore.textContent = before;
      this.dom.exprAfter.textContent = after;

      if (!this.hasCalculated) {
        this.dom.lcdResult.textContent = this.expression ? '' : '0';
        this.dom.lcdResult.classList.remove('error');
      }
    }

    // --- VARIABLES (DESKTOP DOCK) ---
    updateDockVariables() {
      const vars = this.evaluator.variables;
      Object.keys(vars).forEach((key) => {
        const el = document.getElementById(`dock-val-${key}`);
        if (el) el.textContent = vars[key];
      });
    }

    // --- HISTORY (DRAWER & DESKTOP TAPE) ---
    addHistory(expr, result) {
      const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      this.history.unshift({ expression: expr, result: result, time: time });
      if (this.history.length > 50) this.history.pop();
      localStorage.setItem('casio_history', JSON.stringify(this.history));
      this.updateHistoryList();
      this.updateDockTape();
    }

    updateHistoryList() {
      if (!this.dom.historyList) return;
      if (this.history.length === 0) {
        this.dom.historyList.innerHTML = '<p style="color:#94a3b8; text-align:center; padding:1.5rem;">No calculation history</p>';
        return;
      }
      this.dom.historyList.innerHTML = this.history.map((h, i) => `
        <div class="history-item" data-idx="${i}">
          <div class="history-item-expr">${h.expression} =</div>
          <div class="history-item-res">${h.result}</div>
        </div>
      `).join('');

      this.dom.historyList.querySelectorAll('.history-item').forEach((elem) => {
        elem.addEventListener('click', () => {
          const item = this.history[elem.dataset.idx];
          if (item) {
            this.expression = item.expression;
            this.cursorPos = this.expression.length;
            this.hasCalculated = false;
            this.updateDisplay();
            this.closeDrawer(this.dom.historyDrawer);
            this.showToast('Recalled calculation');
          }
        });
      });
    }

    updateDockTape() {
      if (!this.dom.dockTapeStream) return;
      if (this.history.length === 0) {
        this.dom.dockTapeStream.innerHTML = '<p style="color:#64748b; font-size:0.75rem; text-align:center; padding:1rem;">Ready for calculations...</p>';
        return;
      }
      this.dom.dockTapeStream.innerHTML = this.history.map((h, i) => `
        <div class="history-item" data-idx="${i}">
          <div style="display:flex; justify-content:space-between; font-size:0.65rem; color:#64748b;">
            <span>#${this.history.length - i}</span>
            <span>${h.time || ''}</span>
          </div>
          <div class="history-item-expr">${h.expression} =</div>
          <div class="history-item-res">${h.result}</div>
        </div>
      `).join('');

      this.dom.dockTapeStream.querySelectorAll('.history-item').forEach((elem) => {
        elem.addEventListener('click', () => {
          const item = this.history[elem.dataset.idx];
          if (item) {
            this.expression = item.expression;
            this.cursorPos = this.expression.length;
            this.hasCalculated = false;
            this.updateDisplay();
            this.showToast('Recalled calculation');
          }
        });
      });
    }

    clearHistory() {
      this.history = [];
      localStorage.removeItem('casio_history');
      this.updateHistoryList();
      this.updateDockTape();
      this.showToast('History Cleared');
    }

    // --- CONSTANTS ---
    initConstants() {
      this.renderConstants(CONSTANTS_DATA);
      this.renderDesktopConstants(CONSTANTS_DATA);
    }

    renderConstants(items) {
      if (!this.dom.constantsList) return;
      this.dom.constantsList.innerHTML = items.map((c) => `
        <div class="constant-card" data-val="${c.value}">
          <div>
            <span class="const-symbol">${c.symbol}</span>
            <span class="const-name">${c.name}</span>
            <div class="const-value-row">${c.value.toExponential(4).replace('e+', 'e')} ${c.unit}</div>
          </div>
          <button type="button" class="btn-use-result" style="width:auto; padding:0.35rem 0.65rem;">Insert</button>
        </div>
      `).join('');

      this.dom.constantsList.querySelectorAll('.constant-card').forEach((elem) => {
        elem.addEventListener('click', () => {
          const val = elem.dataset.val;
          this.insertAtCursor(val);
          this.closeDrawer(this.dom.constantsDrawer);
          this.showToast(`Inserted ${val}`);
        });
      });
    }

    renderDesktopConstants(items) {
      if (!this.dom.dockConstList) return;
      this.dom.dockConstList.innerHTML = items.map((c) => `
        <div class="constant-card" data-val="${c.value}">
          <div>
            <span class="const-symbol">${c.symbol}</span>
            <span class="const-name" style="font-size:0.75rem;">${c.name}</span>
            <div class="const-value-row" style="font-size:0.65rem;">${c.value.toExponential(4).replace('e+', 'e')} ${c.unit}</div>
          </div>
        </div>
      `).join('');

      this.dom.dockConstList.querySelectorAll('.constant-card').forEach((elem) => {
        elem.addEventListener('click', () => {
          const val = elem.dataset.val;
          this.insertAtCursor(val);
          this.showToast(`Inserted constant ${val}`);
          this.sound.playClick();
        });
      });
    }

    filterConstants(query) {
      const q = query.toLowerCase().trim();
      const filtered = CONSTANTS_DATA.filter(c => c.name.toLowerCase().includes(q) || c.symbol.toLowerCase().includes(q));
      this.renderConstants(filtered);
    }

    filterDesktopConstants(query) {
      const q = query.toLowerCase().trim();
      const filtered = CONSTANTS_DATA.filter(c => c.name.toLowerCase().includes(q) || c.symbol.toLowerCase().includes(q));
      this.renderDesktopConstants(filtered);
    }

    // --- CONVERTERS ---
    initConverter() {
      this.populateConverterUnits();
    }

    populateConverterUnits() {
      if (!this.dom.converterCategory) return;
      const cat = this.dom.converterCategory.value;
      const units = CONVERTER_UNITS[cat] || {};
      const keys = Object.keys(units);
      this.dom.converterFromUnit.innerHTML = keys.map(k => `<option value="${k}">${units[k].name}</option>`).join('');
      this.dom.converterToUnit.innerHTML = keys.map(k => `<option value="${k}">${units[k].name}</option>`).join('');
      if (keys.length > 1) this.dom.converterToUnit.selectedIndex = 1;
      this.executeConversion();
    }

    executeConversion() {
      if (!this.dom.converterCategory) return;
      const cat = this.dom.converterCategory.value;
      const from = this.dom.converterFromUnit.value;
      const to = this.dom.converterToUnit.value;
      const val = parseFloat(this.dom.converterFromVal.value) || 0;
      this.dom.converterToVal.value = this.computeConversion(cat, from, to, val);
    }

    swapConverterUnits() {
      const fromIdx = this.dom.converterFromUnit.selectedIndex;
      const toIdx = this.dom.converterToUnit.selectedIndex;
      this.dom.converterFromUnit.selectedIndex = toIdx;
      this.dom.converterToUnit.selectedIndex = fromIdx;
      this.executeConversion();
    }

    applyConverterResult() {
      const res = this.dom.converterToVal.value;
      if (res) {
        this.insertAtCursor(res);
        this.closeDrawer(this.dom.converterDrawer);
        this.showToast(`Inserted ${res}`);
      }
    }

    // Desktop Converter
    initDesktopConverter() {
      this.populateDesktopConverterUnits();
    }

    populateDesktopConverterUnits() {
      if (!this.dom.dockConvCategory) return;
      const cat = this.dom.dockConvCategory.value;
      const units = CONVERTER_UNITS[cat] || {};
      const keys = Object.keys(units);
      this.dom.dockConvFrom.innerHTML = keys.map(k => `<option value="${k}">${k}</option>`).join('');
      this.dom.dockConvTo.innerHTML = keys.map(k => `<option value="${k}">${k}</option>`).join('');
      if (keys.length > 1) this.dom.dockConvTo.selectedIndex = 1;
      this.executeDesktopConversion();
    }

    executeDesktopConversion() {
      if (!this.dom.dockConvCategory) return;
      const cat = this.dom.dockConvCategory.value;
      const from = this.dom.dockConvFrom.value;
      const to = this.dom.dockConvTo.value;
      const val = parseFloat(this.dom.dockConvIn.value) || 0;
      this.dom.dockConvOut.value = this.computeConversion(cat, from, to, val);
    }

    computeConversion(cat, from, to, val) {
      if (cat === 'temperature') {
        let c = val;
        if (from === 'F') c = (val - 32) * (5/9);
        else if (from === 'K') c = val - 273.15;
        let r = c;
        if (to === 'F') r = (c * (9/5)) + 32;
        else if (to === 'K') r = c + 273.15;
        return Number(Math.round(r + 'e+6') + 'e-6').toString();
      }
      const f1 = CONVERTER_UNITS[cat][from]?.factor || 1;
      const f2 = CONVERTER_UNITS[cat][to]?.factor || 1;
      const res = (val * f1) / f2;
      return Number(Math.round(res + 'e+8') + 'e-8').toString();
    }

    // --- MODAL & DRAWER HELPERS ---
    openDrawer(drawer) { drawer.classList.add('open'); this.sound.playClick(); }
    closeDrawer(drawer) { drawer.classList.remove('open'); }
    openModal(modal) { modal.classList.add('open'); this.sound.playClick(); }
    closeModal(modal) { modal.classList.remove('open'); }

    // --- THEME & SOUND ---
    initTheme() {
      const saved = localStorage.getItem('casio_theme') || 'casio-lcd';
      document.body.setAttribute('data-theme', saved);
    }

    toggleTheme() {
      const current = document.body.getAttribute('data-theme') || 'casio-lcd';
      const next = current === 'casio-lcd' ? 'casio-oled' : 'casio-lcd';
      document.body.setAttribute('data-theme', next);
      localStorage.setItem('casio_theme', next);
      this.showToast(next === 'casio-lcd' ? 'Classic Casio LCD' : 'High-Contrast OLED');
      this.sound.playClick();
    }

    toggleSound() {
      const enabled = this.sound.toggle();
      document.getElementById('sound-toggle').classList.toggle('active', enabled);
      this.showToast(enabled ? 'Sound On' : 'Sound Muted');
    }

    showToast(msg) {
      this.dom.toastMsg.textContent = msg;
      this.dom.toast.classList.add('show');
      clearTimeout(this.toastTimeout);
      this.toastTimeout = setTimeout(() => this.dom.toast.classList.remove('show'), 1800);
    }

    // --- KEYBOARD ---
    handleKeyboard(e) {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;

      const key = e.key;

      if (/[0-9]/.test(key)) {
        e.preventDefault();
        this.handleKey(key, null, null, document.getElementById(`btn-${key}`));
      } else if (key === '+') {
        e.preventDefault();
        this.handleKey('+', null, null, document.getElementById('btn-add'));
      } else if (key === '-') {
        e.preventDefault();
        this.handleKey('−', null, null, document.getElementById('btn-sub'));
      } else if (key === '*') {
        e.preventDefault();
        this.handleKey('×', null, null, document.getElementById('btn-mul'));
      } else if (key === '/') {
        e.preventDefault();
        this.handleKey('÷', null, null, document.getElementById('btn-div'));
      } else if (key === '.') {
        e.preventDefault();
        this.handleKey('.', null, null, document.getElementById('btn-dot'));
      } else if (key === 'Enter' || key === '=') {
        e.preventDefault();
        this.handleKey('=', null, null, document.getElementById('btn-equals'));
      } else if (key === 'Backspace') {
        e.preventDefault();
        this.handleKey('del', null, null, document.getElementById('btn-del'));
      } else if (key === 'Escape') {
        e.preventDefault();
        this.handleKey('ac', null, null, document.getElementById('btn-ac'));
      } else if (key === 'ArrowLeft') {
        e.preventDefault();
        this.moveCursorLeft();
      } else if (key === 'ArrowRight') {
        e.preventDefault();
        this.moveCursorRight();
      } else if (key === 'ArrowUp') {
        e.preventDefault();
        this.historyPrev();
      } else if (key === 'ArrowDown') {
        e.preventDefault();
        this.historyNext();
      } else if (key === 'Shift') {
        e.preventDefault();
        this.toggleShift();
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new CasioCalculatorController());
  } else {
    new CasioCalculatorController();
  }
})();
