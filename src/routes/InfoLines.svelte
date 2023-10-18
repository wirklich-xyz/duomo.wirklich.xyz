<script>
  import { locale, t, fns } from '$lib/i18n';
  import { onMount } from 'svelte';
  import InfoLine from './InfoLine.svelte';
  import { DateInput, DatePicker, localeFromDateFnsLocale } from "date-picker-svelte";
  import { checkWeather, clearCache } from '$lib/weather.js';
  import { de, enGB, it } from "date-fns/locale/index.js";
  import { env } from '$env/dynamic/public';

  let owApiKey = env.PUBLIC_OWAPI; // openweather
  var lat = 45.464664; // milano
  var long = 9.18854; // milano
  var date = new Date();
  /** @type List of InfoLine*/
  export let infoLines;

  let localeFns;
  $: {
    localeFns = localeFromDateFnsLocale($fns); // the locale and fns-locale are ~same
  }

  async function checkDate() {
    const date_arr = {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    };
    let debug_server = "http://localhost:8081/times";
    let prod_server = "https://n96fh85qrk.execute-api.eu-central-1.amazonaws.com/dev/times";
    return fetch(prod_server, {
      method: "POST",
      body: JSON.stringify(date_arr),
      headers: { "Content-Type": "application/json" },
    })
      .then((r) => r.json())
      .then((data) => {
        return checkWeather(data);
      })
      .then((data) => {
        infoLines = data;
        return data;
      });
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

{#if infoLines}
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
