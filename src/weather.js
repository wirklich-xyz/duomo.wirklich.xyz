class cacheEntry {
    constructor() {
        this.type = 0; // NO DATA
    }
    stamp; // Date
    type;  // weather forecast type
    data;
}

var cache = new Map(); // key: weather-time YYYYMMDD, value: cacheEntry 

export function clearCache() {
    cache.clear();
}

/**
 * @author Ralf Ulrich
 * @param {Date} date 
 * @returns YYYYMMDD 
 */
function formatDate(date) {
    const YYYY = date.toLocaleString('default', { year: 'numeric' });
    const MM = date.toLocaleString('default', { month: '2-digit' });
    const DD = date.toLocaleString('default', { day: '2-digit' });
    return [YYYY, MM, DD].join('');
}

const owApiKey = "9e5d6a93693d5cfd9436621b197abe4d"; // openweather
const lat = 45.464664;
const lon = 9.188540;

/**
 * @author Ralf Ulrich
 * @param data is a JSON object with InfoLine data. For each time of a line, the weather data is filled in. 
 */
export async function checkWeather(data) {
    let now = new Date();
    let nowMS = now.getTime();
    for await (var D of data) {
        let ld = new Date(D.zenithTimes);
        const ldStrIndex = formatDate(ld); // the date of the index
        let ldStr = ldStrIndex; // this can change
        let cacheType = 9999;
        let cacheNeeds = false;
        if (cache.has(ldStr)) {
            cacheType = cache.get(ldStr).type;
            if (cache.get(ldStr).stamp === undefined) {
                cacheNeeds = true;
            } else {
                if ((now.getTime() - cache.get(ldStr).stamp.getTime()) / (1000 * 60 * 60) > 12) {
                    cacheNeeds = true; // since too old anyway
                }
            }
        } else {
            cache.set(ldStr, new cacheEntry()); // type=9999
            cacheNeeds = true;
        }
        let ldMS = ld.getTime();
        let dt = (ldMS - nowMS) / (1000 * 60 * 60 * 24); // distance [days] between NOW and weather-time
        dt += 0.5; // nowMS is around noon. So include 12 more hours before
        if (dt < 0) {
            D.weather = "past";  // no checking
            continue; // no caching
        /*} NOT FREE
        else if (dt < 4) { // up to four days hourly forecast
            if (cacheNeeds || cacheType > 4) {
                // make API call and update data
                let wd = await fetch(`https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&appid=${owApiKey}`)
                     .then(r => r.json());
                console.log(wd);
                // wd list has 96 entries
                for (const i of [12, 36, 60, 84]) {
                    cache.set(ldStr, new cacheEntry());
                    cache.get(ldStr).type = 4;
                    cache.get(ldStr).stamp = now;
                    cache.get(ldStr).data = wd["list"][i]["clouds"]["all"];
                    ld.setDate(ld.getDate() + 1); // next day
                    ldStr = formatDate(ld);
                }
            }*/
        } else if (dt < 5) { // five days of 3-hours forecast
            if (cacheNeeds || cacheType > 5) {
                // make API call and update data
                let wd = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${owApiKey}`)
                    .then(r => r.json());
                // in list: 40 entries
                for await (const i of [4,12,20,28,36]) {
                    cache.set(ldStr, new cacheEntry());
                    cache.get(ldStr).type = 5;
                    cache.get(ldStr).stamp = now;
                    cache.get(ldStr).data = wd["list"][i]["clouds"]["all"].toString();
                    ld.setDate(ld.getDate() + 1); // next day
                    ldStr = formatDate(ld);
                }
            }
        /* NOT FREE
        } else if (dt < 16) { // up to 16 days daily forecast
            if (cacheNeeds || cacheType > 16) {
                // wd = await fetch("api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}&appid={API key}")
                //     .then(r => r.json());
                // 16 entries, but we only care for day 6...16
                for (let i = 5; i < 16; ++i) {
                    cache.set(ldStr, new cacheEntry());
                    cache.get(ldStr).type = 16;
                    cache.get(ldStr).stamp = now;
                    cache.get(ldStr).data = "16-days";
                    ld.setDate(ld.getDate() + 1); // next day
                    ldStr = formatDate(ld);
                    // wd["list"][i]["clouds"];
                }
            }
        } else if (dt < 30) { // climatic forecast
            if (cacheNeeds || cacheType > 30) {
                // wd = await fetch("https://pro.openweathermap.org/data/2.5/forecast/climate?lat={lat}&lon={lon}&appid={API key}")
                //     .then(r => r.json());
                // 30 entries, but we only care for day 16...30 
                for (let i = 16; i < 30; ++i) {
                    cache.set(ldStr, new cacheEntry());
                    cache.get(ldStr).type = 30;
                    cache.get(ldStr).stamp = now;
                    cache.get(ldStr).data = "30-days";
                    ld.setDate(ld.getDate() + 1); // next day
                    ldStr = formatDate(ld);
                    // wd["list"][i]["clouds"];
                }
            }*/
        } else {
            // this is the fallback, not cached
            D.weather = "future";
            continue;
        } 
        D.weather = cache.get(ldStrIndex).data;
    }
    return data;
}

