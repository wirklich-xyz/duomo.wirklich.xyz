<script>
    import { locale, t } from "$lib/i18n";
    import { getLocaleDefaults } from "date-picker-svelte/locale";

    /** @type InfoLine data */
    export let infoLine;

    let day_str;
    let date_str;
    let hour_str;
    $: {
        let dd = new Date(infoLine.zenithTimes);
        day_str = dd.toLocaleDateString($locale, {weekday: "long"});
        date_str = dd.toLocaleDateString($locale, { 
            year: "numeric",
            month: "long",
            day: "numeric"});
        hour_str = dd.toLocaleTimeString($locale, { 
            hour: "numeric",
            minute: "numeric"});
    }

</script>

<style>

    tr.info { line-height:2em; }
    tr.info.fit {
        margin: 5rem;
        background: rgba(137, 224, 141, 0.26);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26)
    }
    tr.info.margin {
        margin: 5rem;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26)        
    }
    tr.info.fit:hover {
        margin: 5rem;
        background: rgba(137, 224, 141, 0.26);
        box-shadow: 0 2px 8px rgb(183, 11, 11)
    }
    tr.info.margin:hover {
        margin: 5rem;
        box-shadow: 0 2px 8px rgb(183, 11, 11)        
    }
    td.past {
        color: gray;
    }
</style>

<tr class={infoLine.distanceInTime == 0 ? "info fit" : "info margin"}>
    <td class={infoLine.weather == "past" ? "past" : "normal"}>
        {day_str}
    </td>
    <td class={infoLine.weather == "past" ? "past" : "normal"}>    
        {date_str}
    </td>
    <td class={infoLine.weather == "past" ? "past" : "normal"}>    
        {hour_str}
    </td>
    <td class={infoLine.weather == "past" ? "past" : "normal"}>
        {#if infoLine.weather == "future"}  
        <a href="https://www.accuweather.com/de/it/milan/214046/daily-weather-forecast/214046" target="_blank" class="web">{$t("text.weather")}</a>
        {:else if infoLine.weather == "past"}  
        &nbsp;
        {:else}
        {infoLine.weather}%
        {/if}
    </td>
</tr>

