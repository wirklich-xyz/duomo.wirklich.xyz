<script>
  import { t, locale, locales } from '$lib/i18n';
  import { onMount } from "svelte";
  import InfoLines from './InfoLines.svelte';
  import { base } from '$app/paths';

  let infoLines;
</script>

<main>
  <InfoLines bind:infoLines locale={$locale} />
  <br />
  {@html $t("homepage.footer")}  
</main>

<style>

  :global(main) {
    width: 700px;
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
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

</style>
