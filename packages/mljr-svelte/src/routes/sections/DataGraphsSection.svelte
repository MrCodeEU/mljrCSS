<script lang="ts">
  import { BarChart, LineChart, DonutChart, Gauge, NumberTicker } from '$lib';
  import CodeExample from '$lib/components/CodeExample.svelte';

  const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

  const salesData = {
    labels: monthLabels,
    datasets: [
      { label: 'Revenue', data: [42000, 58000, 51000, 67000, 73000, 88000] },
      { label: 'Costs', data: [31000, 35000, 33000, 40000, 42000, 48000] },
    ],
  };

  const visitorsData = {
    labels: monthLabels,
    datasets: [
      { label: 'Unique Visitors', data: [1200, 1800, 1400, 2200, 2600, 3100], filled: true },
      { label: 'Page Views', data: [3200, 4800, 3900, 5800, 6200, 8400], filled: false },
    ],
  };

  const donutData = [
    { label: 'Direct', value: 3200 },
    { label: 'Social', value: 2100 },
    { label: 'Organic', value: 1800 },
    { label: 'Referral', value: 900 },
    { label: 'Email', value: 600 },
  ];

  const simpleBar = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [{ label: 'Sales', data: [45, 72, 63, 91] }],
  };
</script>

<section id="data-graphs" class="mljr-mb-12">
  <h2 class="mljr-h2 mljr-mb-2">Data Graphs</h2>
  <p class="mljr-text-muted mljr-mb-8">Simple SVG-based charts — bar, line, and donut — with hover tooltips and no external dependencies.</p>

  <div class="mljr-space-y-8">
    <!-- Bar Chart -->
    <div>
      <h3 class="mljr-h4 mljr-mb-4">Bar Chart</h3>
      <div class="mljr-card mljr-p-4">
        <BarChart
          labels={salesData.labels}
          datasets={salesData.datasets}
          title="Monthly Revenue vs Costs"
          showValues={false}
        />
      </div>
    </div>

    <CodeExample
      code={`<BarChart
  labels={['Jan', 'Feb', 'Mar']}
  datasets={[
    { label: 'Revenue', data: [42000, 58000, 51000] },
    { label: 'Costs', data: [31000, 35000, 33000] },
  ]}
  title="Monthly Revenue"
/>`}
      language="svelte"
    />

    <!-- Simple single dataset bar -->
    <div>
      <h3 class="mljr-h4 mljr-mb-4">Single Dataset (with values)</h3>
      <div class="mljr-card mljr-p-4">
        <BarChart
          labels={simpleBar.labels}
          datasets={simpleBar.datasets}
          title="Quarterly Sales"
          showValues={true}
          showLegend={false}
        />
      </div>
    </div>

    <!-- Line Chart -->
    <div>
      <h3 class="mljr-h4 mljr-mb-4">Line Chart (with area fill)</h3>
      <div class="mljr-card mljr-p-4">
        <LineChart
          labels={visitorsData.labels}
          datasets={visitorsData.datasets}
          title="Traffic Overview"
        />
      </div>
    </div>

    <!-- Donut Chart -->
    <div>
      <h3 class="mljr-h4 mljr-mb-4">Donut Chart</h3>
      <div class="mljr-card mljr-p-4">
        <DonutChart
          segments={donutData}
          title="Traffic Sources"
          centerSubLabel="Visits"
          showPercents={true}
        />
      </div>
    </div>

    <!-- Smaller donut -->
    <div>
      <h3 class="mljr-h4 mljr-mb-4">Compact Donut</h3>
      <div class="mljr-card mljr-p-4" style="max-width: 360px;">
        <DonutChart
          segments={[
            { label: 'Completed', value: 68, color: '#14b8a6' },
            { label: 'In Progress', value: 21, color: '#f97316' },
            { label: 'Pending', value: 11, color: '#e2e8f0' },
          ]}
          title="Task Status"
          centerLabel="68%"
          centerSubLabel="Done"
          size={160}
          showPercents={true}
        />
      </div>
    </div>

    <!-- Gauge -->
    <div>
      <h3 class="mljr-h4 mljr-mb-4">Gauge</h3>
      <div class="mljr-flex mljr-flex-wrap mljr-gap-8 mljr-items-end">
        <div class="mljr-card mljr-p-4 mljr-flex mljr-flex-col mljr-items-center mljr-gap-2">
          <Gauge value={72} label="CPU Usage" unit="%" arc="half" size={200} />
        </div>
        <div class="mljr-card mljr-p-4 mljr-flex mljr-flex-col mljr-items-center mljr-gap-2">
          <Gauge value={48} label="Memory" unit="GB" max={64} arc="full" size={180} />
        </div>
        <div class="mljr-card mljr-p-4 mljr-flex mljr-flex-col mljr-items-center mljr-gap-2">
          <Gauge value={91} label="Score" arc="half" size={160} color="var(--mljr-success)" />
        </div>
      </div>
    </div>

    <CodeExample code={`<Gauge value={72} label="CPU Usage" unit="%" arc="half" size={200} />
<Gauge value={48} label="Memory" unit="GB" max={64} arc="full" size={180} />
<Gauge value={91} label="Score" arc="half" color="var(--mljr-success)" />`} language="svelte" />

    <!-- NumberTicker -->
    <div>
      <h3 class="mljr-h4 mljr-mb-4">NumberTicker</h3>
      <div class="mljr-card mljr-p-6">
        <div class="mljr-flex mljr-flex-wrap mljr-gap-8 mljr-items-center">
          <div class="mljr-text-center">
            <NumberTicker value={1234567} duration={1500} size="xl" color="primary" />
            <p class="mljr-text-sm mljr-text-muted mljr-mt-1">Total Users</p>
          </div>
          <div class="mljr-text-center">
            <NumberTicker value={98.6} decimals={1} suffix="%" size="lg" color="success" />
            <p class="mljr-text-sm mljr-text-muted mljr-mt-1">Uptime</p>
          </div>
          <div class="mljr-text-center">
            <NumberTicker value={4200} prefix="$" size="lg" color="secondary" easing="easeOut" />
            <p class="mljr-text-sm mljr-text-muted mljr-mt-1">Revenue</p>
          </div>
          <div class="mljr-text-center">
            <NumberTicker value={42} suffix=" ms" size="md" easing="easeInOut" />
            <p class="mljr-text-sm mljr-text-muted mljr-mt-1">Latency</p>
          </div>
        </div>
      </div>
    </div>

    <CodeExample code={`<NumberTicker value={1234567} duration={1500} size="xl" color="primary" />
<NumberTicker value={98.6} decimals={1} suffix="%" size="lg" color="success" />
<NumberTicker value={4200} prefix="$" size="lg" easing="easeOut" />`} language="svelte" />
  </div>
</section>
