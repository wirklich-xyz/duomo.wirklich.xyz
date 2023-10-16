<script>
  import { t, init_i18n } from "$lib/i18n";
  import InfoLines from "./InfoLines.svelte";
  import { base } from "$app/paths";

  init_i18n(); // init locales

  let infoLines; // data to display
</script>

<main>
  <InfoLines bind:infoLines />
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
