<script lang="ts">
  import { DiffViewer } from '$lib';
  import CodeExample from '$lib/components/CodeExample.svelte';

  const before1 = `function greet(name) {
  console.log("Hello, " + name);
  return name;
}

const result = greet("World");
console.log(result);`;

  const after1 = `function greet(name: string): string {
  const message = \`Hello, \${name}!\`;
  console.log(message);
  return message;
}

export { greet };
const result = greet("World");`;

  const before2 = `import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <button onClick={() => setCount(count - 1)}>-</button>
      <span>{count}</span>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}`;

  const after2 = `import { useState, useCallback } from 'react';

function Counter({ initial = 0, step = 1 }) {
  const [count, setCount] = useState(initial);
  const decrement = useCallback(() => setCount(c => c - step), [step]);
  const increment = useCallback(() => setCount(c => c + step), [step]);
  return (
    <div className="counter">
      <button onClick={decrement}>-</button>
      <span>{count}</span>
      <button onClick={increment}>+</button>
    </div>
  );
}`;
</script>

<section id="diff-viewer" class="mljr-mb-12">
  <h2 class="mljr-h2 mljr-mb-2">Diff Viewer</h2>
  <p class="mljr-text-muted mljr-mb-8">
    Displays line-by-line diffs between two text/code strings with unified and split (side-by-side) view modes. Uses an LCS-based algorithm for accurate diffs.
  </p>

  <div class="mljr-space-y-8">
    <!-- JS refactor diff -->
    <div>
      <h3 class="mljr-h4 mljr-mb-4">JavaScript Refactor</h3>
      <DiffViewer
        before={before1}
        after={after1}
        title="greet.js"
        beforeLabel="Original"
        afterLabel="TypeScript"
      />
    </div>

    <!-- React component diff -->
    <div>
      <h3 class="mljr-h4 mljr-mb-4">React Component Update</h3>
      <DiffViewer
        before={before2}
        after={after2}
        title="Counter.jsx"
        mode="split"
      />
    </div>

    <!-- Identical files -->
    <div>
      <h3 class="mljr-h4 mljr-mb-4">Identical Files</h3>
      <DiffViewer
        before="const x = 42;"
        after="const x = 42;"
        title="No changes"
      />
    </div>

    <!-- Code example -->
    <CodeExample
      code={`<script>
  import { DiffViewer } from 'mljr-svelte';

  const before = \`function greet(name) {
  return "Hello " + name;
}\`;
  const after = \`function greet(name: string) {
  return \\\`Hello \\\${name}!\\\`;
}\`;
<\/script>

<!-- Unified mode (default) -->
<DiffViewer {before} {after} title="greet.js" />

<!-- Split (side-by-side) mode -->
<DiffViewer
  {before}
  {after}
  mode="split"
  beforeLabel="v1"
  afterLabel="v2"
  showLineNumbers={true}
/>`}
      language="svelte"
    />
  </div>
</section>
