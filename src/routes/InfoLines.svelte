<script>
  import { locale, t, fns } from '$lib/i18n';
  import { onMount } from 'svelte';
  import InfoLine from './InfoLine.svelte';
  import { DateInput, DatePicker, localeFromDateFnsLocale } from "date-picker-svelte";
  import { checkWeather, clearCache } from '$lib/weather.js';
  import { de, enGB, it } from "date-fns/locale/index.js";
  import { env } from '$env/dynamic/public';

  const owApiKey = env.PUBLIC_OWAPI;
  const duomoApi = env.PUBLIC_DUOMO_API;
  var date = new Date();
  /** @type List of InfoLine*/
  export let infoLines;

  let localeFns;
  let error = null;
  $: {
    localeFns = localeFromDateFnsLocale($fns); // the locale and fns-locale are ~same
  }

  async function checkDate() {
    error = null;
    infoLines = null;
    const date_arr = {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    };
    try {
      const r = await fetch(duomoApi, {
        method: "POST",
        body: JSON.stringify(date_arr),
        headers: { "Content-Type": "application/json" },
      });
      if (!r.ok) {
        throw new Error(`Server error: ${r.status} ${r.statusText}`);
      }
      const data = await r.json();
      infoLines = await checkWeather(data, owApiKey);
    } catch (e) {
      error = e.message ?? String(e);
      console.error("checkDate failed:", e);
    }
  }

  onMount(async () => {
    await checkDate();
  });
</script>

<div>
  <div style="display:inline-block;padding-right:10px;">
    {$t("homepage.welcome")}
  </div>
  <div style="vertical-align:center;display:inline-block;">
    <DateInput
      bind:value={date}
      closeOnSelection="true"
      dynamicPositioning="true"
      pickTime="false"  
      placeholder="yyyy-MM-dd"
      format="yyyy-MM-dd"
      on:select={checkDate}
      locale={localeFns}
    />
  </div>
</div>

<br />

{#if error}
  <p class="error">{error}</p>
{:else if infoLines}
  <table width="100%">
    <tr class="info">
      <th>{$t("data.day")}</th><th>{$t("data.date")}</th><th
        >{$t("data.time")}</th
      ><th>{$t("data.weather")}</th>
    </tr>
    {#each infoLines as infoLine}
      <InfoLine bind:infoLine />
    {/each}
  </table>
{:else}
  <p class="loading">loading...</p>
{/if}

<style>
  .error {
    color: #c0392b;
    font-weight: bold;
  }
  .loading {
    opacity: 0;
    animation: 0.4s 0.8s forwards fade-in;
  }
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  tr.info {
    line-height: 2em;
  }
</style>
