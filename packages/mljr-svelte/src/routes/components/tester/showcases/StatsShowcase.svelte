<script lang="ts">
  import { Stats, Icon, Card } from '$lib';

  const basicStats = [
    { label: 'Total Users', value: '12,345', icon: 'mdi:account-group' },
    { label: 'Revenue', value: '$48,200', icon: 'mdi:currency-usd' },
    { label: 'Active Projects', value: '87', icon: 'mdi:folder-open' },
    { label: 'Completed Tasks', value: '1,203', icon: 'mdi:check-circle' }
  ];

  const trendStats = [
    {
      label: 'Monthly Revenue',
      value: '$24,500',
      icon: 'mdi:trending-up',
      trend: 'up' as const,
      trendValue: '+12.5%',
      chartData: [10, 14, 12, 18, 15, 22, 24]
    },
    {
      label: 'New Users',
      value: '1,234',
      icon: 'mdi:account-plus',
      trend: 'up' as const,
      trendValue: '+8.2%',
      chartData: [5, 8, 6, 9, 11, 10, 12]
    },
    {
      label: 'Bounce Rate',
      value: '24.8%',
      icon: 'mdi:trending-down',
      trend: 'down' as const,
      trendValue: '-3.1%',
      chartData: [30, 28, 26, 29, 27, 25, 24]
    },
    {
      label: 'Avg Session',
      value: '4m 32s',
      icon: 'mdi:timer',
      trend: 'up' as const,
      trendValue: '+0.8%',
      chartData: [3.5, 4, 3.8, 4.2, 4.5, 4.3, 4.5]
    }
  ];
</script>

<div class="mljr-space-y-8">
  <!-- Basic Stats -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Basic Stats</h3>
    <div class="mljr-grid mljr-grid-cols-2 mljr-lg:grid-cols-4 mljr-gap-4">
      {#each basicStats as stat}
        <Stats label={stat.label} value={stat.value} icon={stat.icon} />
      {/each}
    </div>
  </section>

  <!-- With Trends -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Trend Indicators</h3>
    <div class="mljr-grid mljr-grid-cols-2 mljr-lg:grid-cols-4 mljr-gap-4">
      {#each trendStats as stat}
        <Stats
          label={stat.label}
          value={stat.value}
          icon={stat.icon}
          trend={stat.trend}
          trendValue={stat.trendValue}
        />
      {/each}
    </div>
  </section>

  <!-- With Sparkline Charts -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Sparkline Charts</h3>
    <div class="mljr-grid mljr-grid-cols-2 mljr-lg:grid-cols-4 mljr-gap-4">
      {#each trendStats as stat}
        <Stats
          label={stat.label}
          value={stat.value}
          icon={stat.icon}
          trend={stat.trend}
          trendValue={stat.trendValue}
          chartData={stat.chartData}
        />
      {/each}
    </div>
  </section>

  <!-- Different Variants -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Variants</h3>
    <div class="mljr-grid mljr-grid-cols-2 mljr-lg:grid-cols-4 mljr-gap-4">
      <Stats
        label="Total Sales"
        value="$98,240"
        icon="mdi:currency-usd"
        variant="primary"
        trend="up"
        trendValue="+15%"
      />
      <Stats
        label="Customers"
        value="5,420"
        icon="mdi:account-multiple"
        variant="secondary"
        trend="up"
        trendValue="+7.3%"
      />
      <Stats
        label="Orders"
        value="842"
        icon="mdi:shopping"
        variant="success"
        trend="up"
        trendValue="+4.1%"
      />
      <Stats
        label="Refunds"
        value="23"
        icon="mdi:cash-refund"
        variant="error"
        trend="down"
        trendValue="-2.5%"
      />
    </div>
  </section>

  <!-- Custom Dashboard Layout -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Dashboard Layout</h3>
    <div class="mljr-grid mljr-grid-cols-1 mljr-md:grid-cols-3 mljr-gap-4">
      <div class="mljr-md:col-span-2 mljr-grid mljr-grid-cols-2 mljr-gap-4">
        <Stats
          label="Monthly Revenue"
          value="$48,200"
          icon="mdi:trending-up"
          trend="up"
          trendValue="+12.5%"
          chartData={[20, 25, 22, 30, 28, 35, 40, 42, 48]}
        />
        <Stats
          label="New Signups"
          value="2,340"
          icon="mdi:account-plus"
          trend="up"
          trendValue="+8.2%"
          chartData={[15, 18, 14, 20, 22, 19, 24]}
        />
        <Stats
          label="Active Sessions"
          value="842"
          icon="mdi:chart-line"
          trend="up"
          trendValue="+3.1%"
        />
        <Stats
          label="Server Uptime"
          value="99.9%"
          icon="mdi:server"
          trend="up"
          trendValue="+0.02%"
        />
      </div>

      <Card>
        <h4 class="mljr-h5 mljr-mb-4">Quick Summary</h4>
        <div class="mljr-space-y-4">
          <div class="mljr-flex mljr-items-center mljr-justify-between">
            <div class="mljr-flex mljr-items-center mljr-gap-2">
              <Icon icon="mdi:circle" size={10} class="mljr-text-success-500" />
              <span class="mljr-text-sm">Online Users</span>
            </div>
            <span class="mljr-font-medium">1,234</span>
          </div>
          <div class="mljr-flex mljr-items-center mljr-justify-between">
            <div class="mljr-flex mljr-items-center mljr-gap-2">
              <Icon icon="mdi:circle" size={10} class="mljr-text-warning-500" />
              <span class="mljr-text-sm">Pending Orders</span>
            </div>
            <span class="mljr-font-medium">56</span>
          </div>
          <div class="mljr-flex mljr-items-center mljr-justify-between">
            <div class="mljr-flex mljr-items-center mljr-gap-2">
              <Icon icon="mdi:circle" size={10} class="mljr-text-error-500" />
              <span class="mljr-text-sm">Support Tickets</span>
            </div>
            <span class="mljr-font-medium">12</span>
          </div>
        </div>
      </Card>
    </div>
  </section>
</div>
