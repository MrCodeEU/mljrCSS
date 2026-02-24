<script lang="ts">
  import { BarChart, LineChart, DonutChart } from '$lib';

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

  const barDatasets = [
    { label: 'Revenue', data: [42, 58, 51, 67, 73, 88] },
    { label: 'Costs', data: [31, 35, 33, 40, 42, 48] },
  ];

  const lineDatasets = [
    { label: 'Users', data: [1200, 1800, 1400, 2200, 2600, 3100], filled: true },
    { label: 'Sessions', data: [1800, 2600, 2100, 3100, 3800, 4600], filled: false },
  ];

  const donutSegments = [
    { label: 'Direct', value: 3200 },
    { label: 'Social', value: 2100 },
    { label: 'Organic', value: 1800 },
    { label: 'Referral', value: 900 },
    { label: 'Email', value: 600 },
  ];
</script>

<div class="mljr-space-y-8">
  <!-- Bar Chart - Multi Dataset -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Bar Chart — Multi Dataset</h3>
    <div class="mljr-card mljr-p-4">
      <BarChart
        labels={months}
        datasets={barDatasets}
        title="Revenue vs Costs"
      />
    </div>
  </section>

  <!-- Bar Chart - Single with values -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Bar Chart — Single Dataset with Labels</h3>
    <div class="mljr-card mljr-p-4">
      <BarChart
        labels={['Q1', 'Q2', 'Q3', 'Q4']}
        datasets={[{ label: 'Sales', data: [45, 72, 63, 91] }]}
        title="Quarterly Sales"
        showValues={true}
        showLegend={false}
      />
    </div>
  </section>

  <!-- Line Chart -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Line Chart — Area Fill</h3>
    <div class="mljr-card mljr-p-4">
      <LineChart
        labels={months}
        datasets={lineDatasets}
        title="Traffic Overview"
      />
    </div>
  </section>

  <!-- Line Chart - Single -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Line Chart — Single Dataset</h3>
    <div class="mljr-card mljr-p-4">
      <LineChart
        labels={months}
        datasets={[{ label: 'Users', data: [820, 1140, 980, 1560, 1890, 2340], filled: true }]}
        title="Monthly Active Users"
        showLegend={false}
      />
    </div>
  </section>

  <!-- Donut Chart -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Donut Chart</h3>
    <div class="mljr-card mljr-p-4">
      <DonutChart
        segments={donutSegments}
        title="Traffic Sources"
        centerSubLabel="Visits"
        showPercents={true}
      />
    </div>
  </section>

  <!-- Compact Donut -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Compact Donut (Task Status)</h3>
    <div class="mljr-card mljr-p-4" style="max-width: 400px;">
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
  </section>
</div>
