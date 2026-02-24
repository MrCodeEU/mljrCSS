<script lang="ts">
  type DiffLineType = 'added' | 'removed' | 'unchanged';

  interface DiffLine {
    type: DiffLineType;
    content: string;
    lineNumBefore?: number;
    lineNumAfter?: number;
  }

  interface SideBySideRow {
    left?: { lineNum: number; content: string; type: 'unchanged' | 'removed' };
    right?: { lineNum: number; content: string; type: 'unchanged' | 'added' };
  }

  type SyntaxLang = 'none' | 'auto' | 'js' | 'ts' | 'css' | 'html' | 'json';

  interface Props {
    /** Original text/code */
    before: string;
    /** Modified text/code */
    after: string;
    /** Label for the before column */
    beforeLabel?: string;
    /** Label for the after column */
    afterLabel?: string;
    /** Display mode */
    mode?: 'unified' | 'split';
    /** Show line numbers in the gutter */
    showLineNumbers?: boolean;
    /** Optional title shown in the header */
    title?: string;
    /** Syntax highlighting language */
    language?: SyntaxLang;
    /** Additional CSS class */
    class?: string;
  }

  /* ── Syntax tokenizer ── */
  function escHtml(s: string) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  const JS_KEYWORDS = /\b(const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|new|this|typeof|instanceof|class|extends|import|export|from|default|async|await|try|catch|finally|throw|void|null|undefined|true|false|in|of|delete|yield|super|static|get|set|as)\b/g;
  const TS_KEYWORDS = /\b(interface|type|enum|implements|declare|abstract|readonly|namespace|module|keyof|infer|satisfies|override)\b/g;
  const CSS_KEYWORDS = /\b(px|em|rem|vh|vw|%|important)\b/g;

  type TokenType = 'comment' | 'string' | 'number' | 'keyword' | 'type' | 'function' | 'tag' | 'attr' | 'operator' | 'punct' | null;

  function tokenizeJs(line: string, isTs: boolean): string {
    // Build list of [start, end, type] segments from left to right
    type Seg = [number, number, TokenType];
    const segs: Seg[] = [];

    function addSeg(rx: RegExp, type: TokenType) {
      rx.lastIndex = 0;
      let m: RegExpExecArray | null;
      while ((m = rx.exec(line)) !== null) {
        segs.push([m.index, m.index + m[0].length, type]);
      }
    }

    // Order matters: comments and strings first (highest priority)
    addSeg(/\/\/[^\n]*/g, 'comment');
    addSeg(/\/\*[\s\S]*?\*\//g, 'comment');
    addSeg(/"(?:[^"\\]|\\.)*"/g, 'string');
    addSeg(/'(?:[^'\\]|\\.)*'/g, 'string');
    addSeg(/`(?:[^`\\]|\\.)*`/g, 'string');
    addSeg(/\b0x[0-9a-fA-F]+\b/g, 'number');
    addSeg(/\b\d+\.?\d*\b/g, 'number');

    const kwRx = new RegExp(JS_KEYWORDS.source, 'g');
    addSeg(kwRx, 'keyword');
    if (isTs) {
      const tsRx = new RegExp(TS_KEYWORDS.source, 'g');
      addSeg(tsRx, 'type');
      // TypeScript type annotations: word after ': '
      addSeg(/(?<=:\s*)\b[A-Z][A-Za-z0-9]*\b/g, 'type');
    }
    // Function calls
    addSeg(/\b([a-z_$][A-Za-z0-9_$]*)(?=\s*\()/g, 'function');

    // Sort by start, remove overlapping
    segs.sort((a, b) => a[0] - b[0]);
    const resolved: Seg[] = [];
    let pos = 0;
    for (const seg of segs) {
      if (seg[0] >= pos) {
        resolved.push(seg);
        pos = seg[1];
      }
    }

    // Build HTML
    let html = '';
    let cur = 0;
    for (const [start, end, type] of resolved) {
      if (cur < start) html += escHtml(line.slice(cur, start));
      html += `<span class="mljr-diff-token-${type}">${escHtml(line.slice(start, end))}</span>`;
      cur = end;
    }
    if (cur < line.length) html += escHtml(line.slice(cur));
    return html;
  }

  function tokenizeCss(line: string): string {
    type Seg = [number, number, TokenType];
    const segs: Seg[] = [];
    const addSeg = (rx: RegExp, type: TokenType) => {
      rx.lastIndex = 0;
      let m: RegExpExecArray | null;
      while ((m = rx.exec(line)) !== null) segs.push([m.index, m.index + m[0].length, type]);
    };
    addSeg(/\/\*[\s\S]*?\*\//g, 'comment');
    addSeg(/"[^"]*"|'[^']*'/g, 'string');
    addSeg(/#[0-9a-fA-F]{3,8}\b/g, 'number');
    addSeg(/\b\d+\.?\d*(?:px|em|rem|vh|vw|%|s|ms|deg)?\b/g, 'number');
    addSeg(/[{};:]/g, 'punct');
    addSeg(/\.[a-z_-][a-z0-9_-]*/gi, 'function'); // class selectors
    addSeg(/#[a-z_-][a-z0-9_-]*/gi, 'keyword');    // id selectors

    segs.sort((a, b) => a[0] - b[0]);
    const resolved: Seg[] = [];
    let pos = 0;
    for (const seg of segs) {
      if (seg[0] >= pos) { resolved.push(seg); pos = seg[1]; }
    }
    let html = ''; let cur = 0;
    for (const [start, end, type] of resolved) {
      if (cur < start) html += escHtml(line.slice(cur, start));
      html += `<span class="mljr-diff-token-${type}">${escHtml(line.slice(start, end))}</span>`;
      cur = end;
    }
    if (cur < line.length) html += escHtml(line.slice(cur));
    return html;
  }

  function tokenizeHtml(line: string): string {
    // Simple HTML tokenizer: tags, attributes, strings, comments
    type Seg = [number, number, TokenType];
    const segs: Seg[] = [];
    const addSeg = (rx: RegExp, type: TokenType) => {
      rx.lastIndex = 0;
      let m: RegExpExecArray | null;
      while ((m = rx.exec(line)) !== null) segs.push([m.index, m.index + m[0].length, type]);
    };
    addSeg(/<!--[\s\S]*?-->/g, 'comment');
    addSeg(/"[^"]*"|'[^']*'/g, 'string');
    addSeg(/<\/?[a-z][a-z0-9-]*/gi, 'tag');
    addSeg(/\b[a-z-]+=(?=["'])/gi, 'attr');

    segs.sort((a, b) => a[0] - b[0]);
    const resolved: Seg[] = [];
    let pos = 0;
    for (const seg of segs) {
      if (seg[0] >= pos) { resolved.push(seg); pos = seg[1]; }
    }
    let html = ''; let cur = 0;
    for (const [start, end, type] of resolved) {
      if (cur < start) html += escHtml(line.slice(cur, start));
      html += `<span class="mljr-diff-token-${type}">${escHtml(line.slice(start, end))}</span>`;
      cur = end;
    }
    if (cur < line.length) html += escHtml(line.slice(cur));
    return html;
  }

  function tokenizeJson(line: string): string {
    type Seg = [number, number, TokenType];
    const segs: Seg[] = [];
    const addSeg = (rx: RegExp, type: TokenType) => {
      rx.lastIndex = 0;
      let m: RegExpExecArray | null;
      while ((m = rx.exec(line)) !== null) segs.push([m.index, m.index + m[0].length, type]);
    };
    addSeg(/"[^"]*"(?=\s*:)/g, 'keyword');  // keys
    addSeg(/"[^"]*"/g, 'string');
    addSeg(/\b(true|false|null)\b/g, 'type');
    addSeg(/-?\b\d+\.?\d*\b/g, 'number');

    segs.sort((a, b) => a[0] - b[0]);
    const resolved: Seg[] = [];
    let pos = 0;
    for (const seg of segs) {
      if (seg[0] >= pos) { resolved.push(seg); pos = seg[1]; }
    }
    let html = ''; let cur = 0;
    for (const [start, end, type] of resolved) {
      if (cur < start) html += escHtml(line.slice(cur, start));
      html += `<span class="mljr-diff-token-${type}">${escHtml(line.slice(start, end))}</span>`;
      cur = end;
    }
    if (cur < line.length) html += escHtml(line.slice(cur));
    return html;
  }

  function detectLang(text: string): SyntaxLang {
    if (/<[a-z][a-z0-9-]*[\s/>]/i.test(text)) return 'html';
    if (/^\s*[{["]/m.test(text) && /"[^"]+"\s*:/m.test(text)) return 'json';
    if (/[{};]\s*$/m.test(text) && /:\s*[a-z-]+\s*;/m.test(text)) return 'css';
    if (/\binterface\b|\btype\s+\w+\s*=/m.test(text)) return 'ts';
    return 'js';
  }

  function highlight(content: string, lang: SyntaxLang, _before: string, _after: string): string {
    const resolved = lang === 'auto' ? detectLang(_before + '\n' + _after) : lang;
    if (resolved === 'none') return escHtml(content);
    if (resolved === 'css') return tokenizeCss(content);
    if (resolved === 'html') return tokenizeHtml(content);
    if (resolved === 'json') return tokenizeJson(content);
    return tokenizeJs(content, resolved === 'ts');
  }

  let {
    before,
    after,
    beforeLabel = 'Before',
    afterLabel = 'After',
    mode = $bindable<'unified' | 'split'>('unified'),
    showLineNumbers = true,
    title = '',
    language = 'none' as SyntaxLang,
    class: className = '',
  }: Props = $props();

  /* ── LCS-based line diff ── */
  function computeDiff(a: string, b: string): DiffLine[] {
    const aLines = a.length === 0 ? [] : a.split('\n');
    const bLines = b.length === 0 ? [] : b.split('\n');
    const m = aLines.length;
    const n = bLines.length;

    // Flat Uint32Array DP table for LCS
    const W = n + 1;
    const dp = new Uint32Array((m + 1) * W);

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (aLines[i - 1] === bLines[j - 1]) {
          dp[i * W + j] = dp[(i - 1) * W + (j - 1)] + 1;
        } else {
          const top  = dp[(i - 1) * W + j];
          const left = dp[i * W + (j - 1)];
          dp[i * W + j] = top > left ? top : left;
        }
      }
    }

    // Backtrack
    const result: DiffLine[] = [];
    let i = m, j = n;
    while (i > 0 || j > 0) {
      if (i > 0 && j > 0 && aLines[i - 1] === bLines[j - 1]) {
        result.unshift({ type: 'unchanged', content: aLines[i - 1], lineNumBefore: i, lineNumAfter: j });
        i--; j--;
      } else if (j > 0 && (i === 0 || dp[i * W + (j - 1)] >= dp[(i - 1) * W + j])) {
        result.unshift({ type: 'added', content: bLines[j - 1], lineNumAfter: j });
        j--;
      } else {
        result.unshift({ type: 'removed', content: aLines[i - 1], lineNumBefore: i });
        i--;
      }
    }
    return result;
  }

  /* ── Side-by-side pairing ── */
  function buildSideBySide(diff: DiffLine[]): SideBySideRow[] {
    const rows: SideBySideRow[] = [];
    let i = 0;
    while (i < diff.length) {
      const line = diff[i];
      if (line.type === 'unchanged') {
        rows.push({
          left:  { lineNum: line.lineNumBefore!, content: line.content, type: 'unchanged' },
          right: { lineNum: line.lineNumAfter!,  content: line.content, type: 'unchanged' },
        });
        i++;
      } else {
        // Collect a block of removed/added lines
        const removed: DiffLine[] = [];
        const added:   DiffLine[] = [];
        while (i < diff.length && diff[i].type !== 'unchanged') {
          if (diff[i].type === 'removed') removed.push(diff[i]);
          else                            added.push(diff[i]);
          i++;
        }
        const maxLen = Math.max(removed.length, added.length);
        for (let k = 0; k < maxLen; k++) {
          rows.push({
            left:  removed[k] ? { lineNum: removed[k].lineNumBefore!, content: removed[k].content, type: 'removed'  } : undefined,
            right: added[k]   ? { lineNum: added[k].lineNumAfter!,    content: added[k].content,   type: 'added'    } : undefined,
          });
        }
      }
    }
    return rows;
  }

  const diff       = $derived(computeDiff(before, after));
  const sideBySide = $derived(buildSideBySide(diff));
  const stats      = $derived({
    added:   diff.filter(l => l.type === 'added').length,
    removed: diff.filter(l => l.type === 'removed').length,
  });
  const identical  = $derived(stats.added === 0 && stats.removed === 0);
</script>

<div class="mljr-diff {className}">
  <!-- Header -->
  <div class="mljr-diff-header">
    <div style="display: flex; align-items: center; gap: 0.75rem;">
      {#if title}
        <span class="mljr-diff-title">{title}</span>
      {/if}
      <div class="mljr-diff-stats">
        {#if stats.added > 0}
          <span class="mljr-diff-stat-added">+{stats.added}</span>
        {/if}
        {#if stats.removed > 0}
          <span class="mljr-diff-stat-removed">-{stats.removed}</span>
        {/if}
        {#if identical}
          <span style="color: var(--mljr-text-muted);">No changes</span>
        {/if}
      </div>
    </div>

    <div class="mljr-diff-tabs" role="tablist" aria-label="Diff view mode">
      <button
        class="mljr-diff-tab {mode === 'unified' ? 'mljr-diff-tab-active' : ''}"
        role="tab"
        aria-selected={mode === 'unified'}
        onclick={() => (mode = 'unified')}
      >Unified</button>
      <button
        class="mljr-diff-tab {mode === 'split' ? 'mljr-diff-tab-active' : ''}"
        role="tab"
        aria-selected={mode === 'split'}
        onclick={() => (mode = 'split')}
      >Split</button>
    </div>
  </div>

  {#if identical}
    <div class="mljr-diff-empty">Files are identical</div>

  {:else if mode === 'unified'}
    <!-- Unified view -->
    <div class="mljr-diff-unified" role="table" aria-label="Unified diff">
      {#each diff as line}
        <div
          class="mljr-diff-line {line.type === 'added' ? 'mljr-diff-line-added' : line.type === 'removed' ? 'mljr-diff-line-removed' : ''}"
          role="row"
        >
          {#if showLineNumbers}
            <span class="mljr-diff-gutter" role="cell" aria-label="before line">
              {line.lineNumBefore ?? ''}
            </span>
            <span class="mljr-diff-gutter" role="cell" aria-label="after line">
              {line.lineNumAfter ?? ''}
            </span>
          {/if}
          <span class="mljr-diff-sign" role="cell" aria-label={line.type}>
            {line.type === 'added' ? '+' : line.type === 'removed' ? '-' : ' '}
          </span>
          <!-- svelte-ignore a11y_unknown_aria_attribute -->
          <span class="mljr-diff-code" role="cell">{@html highlight(line.content, language, before, after)}</span>
        </div>
      {/each}
    </div>

  {:else}
    <!-- Split view -->
    <div class="mljr-diff-split">
      <!-- Left column (before) -->
      <div class="mljr-diff-split-col">
        <div class="mljr-diff-split-label">{beforeLabel}</div>
        {#each sideBySide as row}
          {#if row.left}
            <div class="mljr-diff-line {row.left.type === 'removed' ? 'mljr-diff-line-removed' : ''}">
              {#if showLineNumbers}
                <span class="mljr-diff-gutter">{row.left.lineNum}</span>
              {/if}
              <span class="mljr-diff-sign">
                {row.left.type === 'removed' ? '-' : ' '}
              </span>
              <span class="mljr-diff-code">{@html highlight(row.left.content, language, before, after)}</span>
            </div>
          {:else}
            <div class="mljr-diff-line" style="background: var(--mljr-surface-2); opacity: 0.5;">
              {#if showLineNumbers}<span class="mljr-diff-gutter"></span>{/if}
              <span class="mljr-diff-sign"></span>
              <span class="mljr-diff-code"></span>
            </div>
          {/if}
        {/each}
      </div>

      <!-- Right column (after) -->
      <div class="mljr-diff-split-col">
        <div class="mljr-diff-split-label">{afterLabel}</div>
        {#each sideBySide as row}
          {#if row.right}
            <div class="mljr-diff-line {row.right.type === 'added' ? 'mljr-diff-line-added' : ''}">
              {#if showLineNumbers}
                <span class="mljr-diff-gutter">{row.right.lineNum}</span>
              {/if}
              <span class="mljr-diff-sign">
                {row.right.type === 'added' ? '+' : ' '}
              </span>
              <span class="mljr-diff-code">{@html highlight(row.right.content, language, before, after)}</span>
            </div>
          {:else}
            <div class="mljr-diff-line" style="background: var(--mljr-surface-2); opacity: 0.5;">
              {#if showLineNumbers}<span class="mljr-diff-gutter"></span>{/if}
              <span class="mljr-diff-sign"></span>
              <span class="mljr-diff-code"></span>
            </div>
          {/if}
        {/each}
      </div>
    </div>
  {/if}
</div>
