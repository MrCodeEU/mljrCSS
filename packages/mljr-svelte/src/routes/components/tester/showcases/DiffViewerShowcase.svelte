<script lang="ts">
  import { DiffViewer } from '$lib';

  const before = `import express from 'express';
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(3000);`;

  const after = `import express, { Request, Response } from 'express';
import { logger } from './middleware';

const app = express();
app.use(express.json());
app.use(logger);

app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Hello World', version: '2.0' });
});

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => console.log(\`Listening on port \${PORT}\`));`;

  const cssB = `.button {
  background: blue;
  padding: 8px 16px;
  border: none;
  color: white;
}`;

  const cssA = `.button {
  background: var(--primary-500);
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  transition: background 200ms;
}

.button:hover {
  background: var(--primary-600);
}`;
</script>

<div class="mljr-space-y-8">
  <!-- Unified mode -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Unified View (Node.js upgrade)</h3>
    <DiffViewer {before} {after} title="server.ts" mode="unified" />
  </section>

  <!-- Split mode -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Split View (CSS modernisation)</h3>
    <DiffViewer before={cssB} after={cssA} title="button.css" mode="split" beforeLabel="Legacy" afterLabel="Modern" />
  </section>

  <!-- No line numbers -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Without Line Numbers</h3>
    <DiffViewer
      before="const x = 1;\nconst y = 2;"
      after="const x = 10;\nconst z = 3;"
      showLineNumbers={false}
    />
  </section>

  <!-- Identical -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Identical Files</h3>
    <DiffViewer before="const x = 42;" after="const x = 42;" title="unchanged.js" />
  </section>
</div>
