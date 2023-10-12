<script>
  import { t, locale, locales } from "$lib/i18n";
  import { onMount } from "svelte";
  import InfoLines from "./InfoLines.svelte";
  import { schedule_update } from "svelte/internal";
  import { base } from '$app/paths';
  let infoLines;
</script>

<svelte:head>
  <title>Duomo Milano Sun-Calendar</title>
</svelte:head>

<header>
  <select bind:value={$locale}>
    {#each locales as l}
      <option value={l}>{l}</option>
    {/each}
  </select>
  <h1>{$t("homepage.title")}</h1>
</header>

<main>
  <InfoLines bind:infoLines locale={$locale} />
  <br />
  {@html $t("homepage.footer")}  
</main>

<style>
  header {
    text-align: center;
    width: 100%;
    margin: 0 auto;
    background-color: rgb(174, 153, 153);
  }
  :global(main) {
    width: 700px;
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #4a1c0d;
    font-size: 3.5em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
  :global(.button) {
    background-color: #b7cad7;
    border: 1px;
  	border-color: #411212;
    padding: 15px 34px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font: larger;
    margin: 4px 2px;
    cursor: pointer;
  }
  select {
    border: 1px solid #411212;
    background-color: rgba(255, 255, 255, 0.2);
    padding: 1px;
    float: right;
    margin: 3px;
    height: auto;
    font-size: x-small;
    line-height: 10px;
  }
</style>
