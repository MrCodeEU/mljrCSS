<script lang="ts">
  import { getLocale } from '../../paraglide/runtime.js';
  import * as m from '../../paraglide/messages.js';

  export interface AboutStat {
    value: string;
    label: string | { en: string; de: string };
  }

  export interface AboutValue {
    icon?: string;
    name: string | { en: string; de: string };
    description: string | { en: string; de: string };
  }

  export interface AboutTeamMember {
    name: string;
    role: string | { en: string; de: string };
    /** URL or data URI for avatar image */
    avatar?: string;
    /** Fallback: initials shown if no avatar */
    initials?: string;
  }

  interface Props {
    companyName: string;
    tagline?: string | { en: string; de: string };
    description?: string | { en: string; de: string };
    founded?: string | number;
    mission?: string | { en: string; de: string };
    stats?: AboutStat[];
    values?: AboutValue[];
    team?: AboutTeamMember[];
    class?: string;
  }

  let {
    companyName,
    tagline,
    description,
    founded,
    mission,
    stats = [],
    values = [],
    team = [],
    class: className = '',
  }: Props = $props();

  const locale = $derived(getLocale());
  const isDE = $derived(locale === 'de');

  function loc(val: string | { en: string; de: string } | undefined): string {
    if (!val) return '';
    if (typeof val === 'string') return val;
    return isDE ? val.de : val.en;
  }
</script>

<div class="mljr-about {className}">
  <!-- Hero -->
  <div class="mljr-about__hero">
    <h1 class="mljr-legal__title">{companyName}</h1>
    {#if tagline}
      <p class="mljr-about__tagline">{loc(tagline)}</p>
    {/if}
    {#if description}
      <p class="mljr-about__description">{loc(description)}</p>
    {/if}
    {#if founded}
      <p class="mljr-about__description" style="margin-top: var(--mljr-space-2); font-size: var(--mljr-text-sm);">
        {m.about_founded()}: {founded}
      </p>
    {/if}
  </div>

  <!-- Stats -->
  {#if stats.length > 0}
    <div class="mljr-about__stats">
      {#each stats as stat}
        <div class="mljr-about__stat">
          <div class="mljr-about__stat-value">{stat.value}</div>
          <div class="mljr-about__stat-label">{loc(stat.label)}</div>
        </div>
      {/each}
    </div>
  {/if}

  <!-- Mission -->
  {#if mission}
    <div class="mljr-about__mission">
      <h2 class="mljr-about__mission-title">{m.about_mission()}</h2>
      <p class="mljr-about__mission-text">{loc(mission)}</p>
    </div>
  {/if}

  <!-- Values -->
  {#if values.length > 0}
    <div>
      <h2 class="mljr-about__values-title">{m.about_values()}</h2>
      <div class="mljr-about__values">
        {#each values as val}
          <div class="mljr-about__value-card">
            {#if val.icon}
              <div class="mljr-about__value-icon">{val.icon}</div>
            {/if}
            <h3 class="mljr-about__value-name">{loc(val.name)}</h3>
            <p class="mljr-about__value-desc">{loc(val.description)}</p>
          </div>
        {/each}
      </div>
    </div>
  {/if}

  <!-- Team -->
  {#if team.length > 0}
    <div>
      <h2 class="mljr-about__team-title">{m.about_team()}</h2>
      <div class="mljr-about__team">
        {#each team as member}
          <div class="mljr-about__team-card">
            {#if member.avatar}
              <img
                src={member.avatar}
                alt={member.name}
                class="mljr-about__team-avatar"
                loading="lazy"
              />
            {:else}
              <div class="mljr-about__team-avatar mljr-about__team-avatar--placeholder" aria-hidden="true">
                {member.initials ?? member.name.charAt(0)}
              </div>
            {/if}
            <p class="mljr-about__team-name">{member.name}</p>
            <p class="mljr-about__team-role">{loc(member.role)}</p>
          </div>
        {/each}
      </div>
    </div>
  {/if}
</div>
