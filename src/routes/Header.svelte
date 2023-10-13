<script>
    import { t, locale, locales } from "$lib/i18n";
</script>
  
<header>
    <select bind:value={$locale}>
      {#each locales as l}
        <option value={l}>{l}</option>
      {/each}
    </select>
    <h1>{$t("homepage.title")}</h1>
</header>

<style>

  header {
    text-align: center;
    width: 100%;
    margin: 0 auto;
    background-color: rgb(174, 153, 153);
  }

  h1 {
    color: #4a1c0d;
    font-size: 3.5em;
    font-weight: 100;
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
