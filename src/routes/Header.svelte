<script>
  import { t, locale, locales } from "$lib/i18n";
  import languages from "$lib/langs/langs.ts";
  //import { Icon } from "svelte-flag-icons";
  //   import { De, Gb, It } from 'svelte-flag-icons';
  //    import langs from "$lib/langs/langs.json";
  //    import { Us } from 'svelte-flag-icons';
  //    let entries = Object.entries(languages);
</script>

<header>
  <div style="float:right;margin: 3px;">
    {#each languages as L}
      <div class={$locale===L.code ? "lang_sel" : "lang_opt"}>
        <svelte:component
          this={L.icon}
          size="15"
          on:click={() => {
            $locale = L.code;
          }}
        />
      </div>
    {/each}
  </div>
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

  div.lang_sel {
    border: 1px solid #9d3a3a;
    background-color: #c69b8d;
    padding: 1px 0;
    width: 30px;
    display: inline-block;
  }

  div.lang_opt {
    padding: 1px 0;
    width: 30px;
    display: inline-block;
  }

  @media screen and (max-width: 600px) {
    h1 {
      font-size: 2em;
    }
  }

  @media screen and (max-width: 480px) {
    h1 {
      font-size: 1.6em;
    }
  }
</style>
