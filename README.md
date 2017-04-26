# Kindred
Kindred is a Node.js wrapper with built-in rate-limiting (enforced per region), caching (Redis), and parameter checking on top of [Riot's League of Legends API](http://www.developer.riotgames.com).

## Table of Contents
* [Core Features](#core-features)
* [Philosophy](#philosophy)
* [Installation](#installation)
* [Endpoints Covered](#endpoints-covered)
* [Quickstart](#quickstart)
* [Detailed Usage](#detailed-usage)
* [Caching](#caching)
* [Contributing and Issues](#contributing-and-issues)

## Core Features
* All standard endpoints covered but one (get summoner by accountIDs).
* Supports both callbacks and promises.
* Rate limiter that is enforced per region.
    * Retries on 429 and >= 500.
        * Promise-based requests retry up to three times.
* Built-in parameter checks so you can hopefully refer to documentation less! :)
* Built-in, flexible caching (in-memory and Redis).
    * Customized expiration timers. You can set a timer for each endpoint type. Refer to [Caching](#caching) for more info.
* Designed to be simple but convenient. For example, you can call an exclusively by-id endpoint (such as grabbing the runes of a player) with just the name.

## Philosophy
My goal is to make a wrapper that is simple, sensible, and consistent. This project is heavily inspired by [psuedonym117's Python wrapper](https://github.com/pseudonym117/Riot-Watcher). Look at the [Quickstart Section](#quickstart) to see what I mean.

## Installation
```
yarn add kindred-api
// or npm install kindred-api
```

## Endpoints Covered
All examples here should be able to be run alone individually.

Make sure to check the [official Riot Documentation](https://developer.riotgames.com/api-methods/) to see what query parameters you can pass in to each endpoint (through the options parameter)!

Note: All ```region``` parameters are **OPTIONAL**. All ```options``` parameters are **OPTIONAL** unless stated otherwise.

* [CHAMPION-MASTERY-V3](#champion-mastery)
* [CHAMPION-V3](#champion)
* [GAME-V1.3](#game)
* [LEAGUE-V2.5](#league)
* [LOL-STATUS-V3](#lol-status)
* [MASTERIES-V3](#masteries)
* [MATCH-V3](#match)
* [RUNES-V3](#runes)
* [SPECTATOR-V3](#spectator)
* [STATIC-DATA-V3](#static-data)
* [STATS-V1.3](#stats)
* [SUMMONER-V3](#summoner)

### Champion Mastery
[docs](https://developer.riotgames.com/api-methods/#champion-mastery-v3)

1. **/lol/champion-mastery/v3/champion-masteries/by-summoner/{summonerId}**
    * Get all champion mastery entries sorted by number of champion points descending. (RPC)
    * getChampMasteries({ region = this.defaultRegion, accountID/accID (int), id/summonerID/playerID (int), name (string), options (object) }, cb)
    * Namespaced Functions: *ChampionMastery.getChampionMasteries, ChampionMastery.getAll, ChampionMastery.all*
    * Example 1: ```k.ChampionMastery.all({ accID: 47776491 }, KindredAPI.print)```
    * Example 2: ```k.ChampionMastery.all({ id: 20026563 }, KindredAPI.print)```
    * Example 3: ```k.ChampionMastery.all({ id: 20026563 }).then(data => console.log(data))```
2. **/lol/champion-mastery/v3/champion-masteries/by-summoner/{summonerId}/by-champion/{championId}**
    * Get a champion mastery by player id and champion id.(RPC)
    * getChampMastery({ region = this.defaultRegion, playerID (int), championID (int), options (object) }, cb)
    * Namespaced Functions: *ChampionMastery.getChampionMastery, ChampionMastery.get*
    * Example 1: ```k.ChampionMastery.get({ playerID: 20026563, championID: 203 }, KindredAPI.print)```
    * Example 2: ```k.ChampionMastery.get({ playerID: 20026563, championID: 203 }).then(data => console.log(data))```
3. **/lol/champion-mastery/v3/scores/by-summoner/{summonerId}**
    * Get a player's total champion mastery score, which is sum of individual champion mastery levels (RPC)
    * getTotalChampMasteryScore({ region = this.defaultRegion, accountID/accID (int), id/summonerID/playerID (int), name (string), options (object) }, cb)
    * Namespaced Functions: *ChampionMastery.getTotalChampMasteryScore, ChampionMastery.getTotalScore, ChampionMastery.totalScore, ChampionMastery.total, ChampionMastery.score*
    * Example 1: ```k.ChampionMastery.score({ id: 20026563 }, KindredAPI.print)```

### Champion
[docs](https://developer.riotgames.com/api-methods/#champion-v3)

1. **/lol/platform/v3/champions**
    * Retrieve all champions.
    * getChamps({ region, id (int), options (object) }, cb)
    * Namespaced Functions: *Champion.getChampions, Champion.getAll, Champion.all*
    * Example 1: ```k.Champion.all({ region: REGIONS.KOREA }, KindredAPI.print)```
2. **/lol/platform/v3/champions/{id}**
    * Retrieve champion by ID.
    * getChamp({ region, id/championID (int) }, cb)
    * Namespaced Functions: *Champion.getChampion, Champion.get*
    * Example 1: ```k.Champion.get({ championID: 67 }, KindredAPI.print)```
    * Example 2: ```k.Champion.get({ championID: 67 }).then(data => console.log(data))```
    * Example 3: ```k.Champion.get({ championID: 67, region: 'kr' }, KindredAPI.print)```

### Game
[docs](https://developer.riotgames.com/api-methods/#game-v1.3)

1. **/api/lol/{region}/v1.3/game/by-summoner/{summonerId}/recent**
    * Get recent games by summoner ID. (REST)
    * getRecentGames({ region, accountID/accID (int), id/summonerID/playerID (int), name (str) }, cb)
    * Namespaced Functions: *Game.getRecentGames, Game.getRecent, Game.recent, Game.get*
    * Example 1: ```k.Game.get({ summonerID: 20026563 }, KindredAPI.print)```
    * Example 2: ```k.Game.recent({ id: 20026563 }, KindredAPI.print)```

### League
[docs](https://developer.riotgames.com/api-methods/#league-v2.5)

1. **/api/lol/{region}/v2.5/league/by-summoner/{summonerIds}**
    * Get leagues mapped by summoner ID for a given list of summoner IDs. (REST)
    * getLeagues({ region, accountID/accID (int), id/summonerID/player/ID (int), name (str) }, cb)
    * Namespaced Functions: *League.getLeagues, League.leagues, League.get*
    * Example 1: ```k.League.getLeagues({ summonerID: 20026563 }, KindredAPI.print)```
    * Example 2: ```k.League.get({ summonerID: 20026563 }, KindredAPI.print)```
2. **/api/lol/{region}/v2.5/league/by-summoner/{summonerIds}/entry**
    * Get league entries mapped by summoner ID for a given list of summoner IDs. (REST)
    * getLeagueEntries({ region, accountID/accID (int), id/summonerID/playerID (int), name (str) }, cb)
    * Namespaced Functions: *League.getLeagueEntries, League.getEntries, League.entries*
    * Example 1: ```k.League.entries({ summonerID: 20026563 }, KindredAPI.print)```
3. **/api/lol/{region}/v2.5/league/challenger**
    * Get challenger tier leagues. (REST)
    * getChallengers({ region, options: { type: 'RANKED_SOLO_5x5' } }, cb)
    * Namespaced Functions: *League.getChallengers, League.challengers*
    * Example 1: ```k.League.challengers(KindredAPI.print)```
    * Example 2: ```k.League.challengers({ region: 'na' }, KindredAPI.print)```
    * Example 3: ```k.League.challengers({ options: { type: 'RANKED_FLEX_SR' } }, KindredAPI.print)```
4. **/api/lol/{region}/v2.5/league/master**
    * Get master tier leagues. (REST)
    * getMasters({ region, options: { type: 'RANKED_SOLO_5x5' } }, cb)
    * Namespaced Functions: *League.getMasters, League.masters*
    * Example 1: ```k.League.masters().then(data => console.log(data))```

### LoL Status
[docs](https://developer.riotgames.com/api-methods/#lol-status-v3)

1. **/lol/status/v3/shard-data**
    * Get League of Legends status for the given shard.
    * getShardStatus({ region }, cb)
    * Namespaced Functions: *Status.getShardStatus, Status.getStatus, Status.get*
    * Example 1: ```k.Status.get().then(data => console.log(data))```

### Masteries
[docs](https://developer.riotgames.com/api-methods/#masteries-v3)
1. **/lol/platform/v3/masteries/by-summoner/{summonerId}**
    * Get mastery pages for a given summoner ID.
    * getMasteries({ region, accountID/accID (int), id/summonerID/playerID (int), name (str)}, cb)
    * Namespaced Functions: *RunesMasteries.getMasteries, RunesMasteries.masteries, Masteries.get*
    * Example 1: ```k.Masteries.get({ id: 20026563 }, KindredAPI.print)```

### Match
[docs](https://developer.riotgames.com/api-methods/#match-v3/)

Note that this section has two different namespaces (Match and Matchlist).
`id` parameter still refers to summonerID (not accountID).

1. **/lol/match/v3/matches/{matchId}**
    * Get match by match ID.
    * getMatch({ region, id/matchID (int), options (object) }, cb)
    * Namespaced Functions: *Match.getMatch, Match.get*
    * Example 1: ```k.Match.get({ id: 2482174957 }, KindredAPI.print)```
2. **/lol/match/v3/matchlists/by-account/{accountId}**
    * Get matchlist for given account ID and platform ID.
    * getMatchlist({ region, accountID/accID (int), id/summonerID/playerID (int), name (str), options = { rankedQueues: 'TEAM_BUILDER_RANKED_SOLO' } }, cb)
    * Namespaced Functions: *Matchlist.getMatchlist, Matchlist.get*
    * Example 1: ```k.Matchlist.get({ accID: 47776491 }, KindredAPI.print)```
    * Example 2: ```k.Matchlist.get({ id: 32932398 }, KindredAPI.print)```
    * Example 3: ```k.Matchlist.get({ name: 'Contractz' }, KindredAPI.print)```
3. **/lol/match/v3/matchlists/by-account/{accountId}/recent**
    * Get recent matchlist for given account ID and platform ID.
    * getRecentMatchlist({ region, accountID/accID (int), id/summonerID/playerID (int), name (str) }, cb)
    * Namespaced Functions: *Matchlist.getRecentMatchlist, Matchlist.recent*
    * Example 1: ```k.Matchlist.recent({ accID: 47776491 }, KindredAPI.print)```
    * Example 2: ```k.Matchlist.recent({ id: 32932398 }, KindredAPI.print)``` // by summonerID
    * Example 3: ```k.Matchlist.recent({ name: 'Contractz' }, KindredAPI.print)```
4. **/lol/match/v3/timelines/by-match/{matchId}**
    * Get match timeline by match ID.
    * getMatchTimeline({ region, id/matchID (int) }, cb) 
    * Namespaced Functions: *Match.getMatchTimeline, Match.getTimeline, Match.timeline*
    * Example 1: ```k.Match.timeline({ id: 2478544123 }, KindredAPI.print)```

### Runes
[docs](https://developer.riotgames.com/api-methods/#runes-v3)

1. **/lol/platform/v3/runes/by-summoner/{summonerId}**
    * Get rune pages for a given summoner ID.
    * getRunes({ region, accountID/accID (int), id/summonerID/playerID (int), name (str) }, cb)
    * Namespaced Functions: *RunesMasteries.getRunes, RunesMasteries.runes, Runes.get*
    * Example 1: ```k.Runes.get({ id: 20026563 }, KindredAPI.print)```
    * Example 2: ```k.Runes.get({ name: 'Contractz' }, KindredAPI.print)```
    * Example 3: ```k.Runes.get({ accID: 47776491 }, KindredAPI.print)```

### Spectator
[docs](https://developer.riotgames.com/api-methods/#spectator-v3)

1. **/lol/spectator/v3/active-games/by-summoner/{summonerId}**
    * Get current game information for the given summoner ID. (REST)
    * getCurrentGame({ region = this.defaultRegion, accountID/accID (int), id/summonerID/playerID (int), name (str) }, cb)
    * Namespaced Functions: *CurrentGame.getCurrentGame, CurrentGame.get*
    * Example 1: ```k.CurrentGame.get({ name: 'Contractz' }, KindredAPI.print)```
    * Example 2: ```k.CurrentGame.get({ id: 32932398 }, KindredAPI.print)```
2. **/lol/spectator/v3/featured-games**
    * Get list of featured games. (REST)
    * getFeaturedGames({ region }, cb)
    * Namespaced Functions: *FeaturedGames.getFeaturedGames, FeaturedGames.get*
    * Example 1: ```k.FeaturedGames.get().then(data => console.log(data))```
    * Example 2: ```k.FeaturedGames.get({ region: 'na' }, KindredAPI.print)```

### Static Data
[docs](https://developer.riotgames.com/api-methods/#static-data-v3)

1. **/lol/static-data/v3/champions**
    * Retrieves champion list. (REST)
    * getChampionList({ region, options (object) }, cb)
    * Namespaced Functions: *Static.getChampions, Static.champions*
    * Example 1: ```k.Static.champions(KindredAPI.print)```
    * Example 2: ```k.Static.champions({ options: { champData: 'all' } }).then(data => console.log(data))```
2. **/lol/static-data/v3/champions/{id}**
    * Retrieves a champion by its id. (REST)
    * getChampion({ region, id/championID (int), options (object) }, cb)
    * Namespaced Functions: *Static.getChampion, Static.champion*
    * Example 1: ```k.Static.champion({ id: 131 }, KindredAPI.print)```
    * Example 2: ```k.Static.champion({ id: 131, options: { champData: 'enemytips', version: '7.7.1' } }, KindredAPI.print)```
3. **/lol/static-data/v3/items**
    * Retrieves item list. (REST)
    * getItems({ region, options (object) }, cb)
    * Namespaced Functions: *Static.getItems, Static.items*
    * Example 1: ```k.Static.items({ options: { itemListData: all } }, KindredAPI.print)```
4. **/lol/static-data/v3/items/{id}**
    * Get master tier leagues. (REST)
    * getItem({ region, id/itemID (int), options (object) }, cb)
    * Namespaced Functions: *Static.getItem, Static.item*
    * Example 1: ```k.Static.item({ id: 3901, options: { itemData: ['image', 'gold'] } }, KindredAPI.print)```
    * Example 2: ```k.Static.items(KindredAPI.print)```
5. **/lol/static-data/v3/language-strings**
    * Retrieve language strings data. (REST)
    * getLanguageStrings({ region, options (object) }, cb)
    * Namespaced Functions: *Static.getLanguageStrings, Static.languageStrings*
    * Example 1: ```k.Static.languageStrings(KindredAPI.print)```
6. **/lol/static-data/v3/languages**
    * Retrieve supported languages data. (REST)
    * getLanguages({ region }, cb)
    * Namespaced Functions: *Static.getLanguages, Static.languages*
    * Example 1: ```k.Static.languages().then(data => console.log(data)).catch(err => console.error(err))```
7. **/lol/static-data/v3/maps**
    * Retrieve map data. (REST)
    * getMapData({ region, options (object) }, cb)
    * Namespaced Functions: *Static.getMapData, Static.mapData, Static.map, Static.maps*
    * Example 1: ```k.Static.mapData().then(data => console.log(data))```
8. **/lol/static-data/v3/masteries**
    * Retrieve mastery list. (REST)
    * getMasteryList({ region, options (object) }, cb)
    * Namespaced Functions: *Static.getMasteries, Static.masteries*
    * Example 1: ```k.Static.masteries({ options: { masteryListData: 'image' } }, KindredAPI.print)```
    * Example 2: ```k.Static.masteries(KindredAPI.print)```
9. **/lol/static-data/v3/masteries/{id}**
    * Retrieves mastery item by its unique id. (REST)
    * getMastery({ region, id/masteryID (int), options (object) }, cb)
    * Namespaced Functions: *Static.getMastery, Static.mastery*
    * Example 1: ```k.Static.mastery({ id: 6361 }, KindredAPI.print)```
    * Example 2: ```k.Static.mastery({ id: 6361, options: { masteryData: ['image', 'masteryTree'] } }, KindredAPI.print)```
    * Example 3: ```k.Static.mastery({ id: 6361, options: { masteryData: 'image' } }, KindredAPI.print)```
10. **/lol/static-data/v3/profile-icons**
    * Retrieve profile icons. (REST)
    * getProfileIcons({ region, options (object) }, cb)
    * Namespaced Functions:  *Static.getProfileIcons, Static.profileIcons*
    * Example 1: ```k.Static.profileIcons(KindredAPI.print)```
11. **/lol/static-data/v3/realms**
    * Retrieve realm data. (REST)
    * getRealmData({ region }, cb)
    * Namespaced Functions: *Static.getRealmData, Static.realmData, Static.realm, Static.realms*
    * Example 1: ```k.Static.realmData().then(data => console.log(data))```
12. **/lol/static-data/v3/runes**
    * Retrieves rune list. (REST)
    * getRuneList({ region, options (object) }, cb)
    * Namespaced Functions: *Static.getRunes, Static.runes*
    * Example 1: ```k.Static.runes().then(data => console.log(data))```
    * Example 2: ```k.Static.runes({ options: { runeListData: 'basic' } }, KindredAPI.print)```
13. **/lol/static-data/v3/runes/{id}**
    * Retrieves rune by its unique id. (REST)
    * getRune({ region, id/runeID (int), options (object) }, cb)
    * Namespaced Functions: *Static.getRune, Static.rune*
    * Example 1: ```k.Static.rune({ id: 10002 }, KindredAPI.print)```
    * Example 2: ```k.Static.rune({ id: 10001, options: { runeData: 'image' } }, KindredAPI.print)```
14. **/lol/static-data/v3/summoner-spells**
    * Retrieves summoner spell list. (REST)
    * getSummonerSpells({ region, options (object) }, cb)
    * Namespaced Functions: *Static.getSummonerSpells, Static.summonerSpells, Static.spells*
    * Example 1: ```k.Static.spells(KindredAPI.print)```
    * Example 2: ```k.Static.spells({ options: { spellData: 'cost', dataById: true } }, KindredAPI.print)```
15. **/lol/static-data/v3/summoner-spells/{id}**
    * Retrieves summoner spell by its unique id. (REST)
    * getSummonerSpell({ region, id/spellID/summonerSpellID (int), options (object) }, cb)
    * Namespaced Functions: *Static.getSummonerSpell, Static.summonerSpell, Static.spell*
    * Example 1: ```k.Static.spell({ id: 31 }, KindredAPI.print)```
    * Example 2: ```k.Static.spell({ id: 31, options: { spellData: 'cooldown' } }, KindredAPI.print)```
16. **/lol/static-data/v3/versions**
    * Retrieve version data. (REST)
    * getVersionData({ region }, cb)
    * Namespaced Functions: *Static.getVersionData, Static.versionData, Static.version, Static.versions*
    * Example 1: ```k.Static.versions(rprint)```

### Stats
[docs](https://developer.riotgames.com/api-methods/#stats-v1.3)

1. **/api/lol/{region}/v1.3/stats/by-summoner/{summonerId}/ranked**
    * Get ranked stats by summoner ID. (REST)
    * getRankedStats({ region, id/summonerID/playerID (int), name (str), options (object) }, cb)
    * Namespaced Functions: *Stats.getRankedStats, Stats.ranked*
    * Example 1: ```k.Stats.ranked({ id: 20026563 }, KindredAPI.print)```
    * Example 2: ```k.Stats.ranked({ id: 20026563, options: { season: 'SEASON2016' } }, KindredAPI.print)```
2. **/api/lol/{region}/v1.3/stats/by-summoner/{summonerId}/summary**
    * Get player stats summaries by summoner ID. (REST)
    * getStatsSummary({ region, id/summonerID/playerID (int), name (str), options (object) }, cb)
    * Namespaced Functions: *Stats.getStatsSummary, Stats.summary*
    * Example 1: ```k.Stats.summary({ id: 20026563 }, KindredAPI.print)```

### Summoner
[docs](https://developer.riotgames.com/api-methods/#summoner-v3)

1. **/lol/summoner/v3/summoners/by-account/{accountId}**
    * Get a summoner by account id
    * getSummoner({ region, accountID/accID (int), name (str) }, cb)
    * Namespaced Functions: *Summoner.getSummoner, Summoner.get*
    * Example 1: ```k.Summoner.get({ accountID: 123123 }, KindredAPI.print)```
2. **/lol/summoner/v3/summoners/by-name/{summonerName}**
    * Get a summoner by summoner name
    * getSummoner({ region, id/summonerID/playerID (int) }, cb)
    * Namespaced Functions: *Summoner.getSummoner, Summoner.get*
    * Example 1: ```k.Summoner.get({ name: 'Contractz' }, KindredAPI.print)```
3. **/lol/summoner/v3/summoners/{summonerId}**
    * Get a summoner by summoner id
    * getSummoner({ region, id/summonerID/playerID (int) }, cb)
    * Namespaced Functions: *Summoner.getSummoner, Summoner.get*
    * Example 1: ```k.Summoner.get({ id: 20026563 }, KindredAPI.print)```

## Quickstart
Debug on, dev key rate limiting per region, in-memory cache with default settings on for quick scripts

```javascript
var KindredAPI = require('kindred-api')
var REGIONS = KindredAPI.REGIONS
var debug = true
var k = KindredAPI.QuickStart('YOUR_KEY', REGIONS.NORTH_AMERICA, debug)

/* Summoners! */
k.Summoner.get({ id: 32932398 }, KindredAPI.print)
k.Summoner.get({ name: 'Contractz' }, KindredAPI.print)

/* How to pass in options 101. */
var name = 'caaaaaaaaaria'
var opts = {
  region: REGIONS.NORTH_AMERICA, // for the sake of example
  options: {
    rankedQueues: ['RANKED_SOLO_5x5', 'RANKED_FLEX_SR'], // no need for joins or messy strings
    // you can pass in arrays into any options params; array values will always be joined into a string
    championIds: '67' // single values can be integers as well
  } // option params should be spelled and capitalized the same as it is in Riot's docs!
  // for example, Matchlist query params in Riot's docs include `championIds`, `beginIndex`, `beginTime`, `seasons`
}

k.Summoner
 .get({ name, region: opts.region })
 .then(data => k.Matchlist.get(
    Object.assign({ id: data.accountID }, opts)
 ))
 .then(data => console.log(data))
 .catch(err => console.error(err))

/*
    Instead of chaining requests like in the above, you can simply call
    k.Matchlist.get with the `name` param or the `id` (summonerID) param.
    Any function that targets just IDs or accountIDs can use all three
    different type of params (summonerID, accountID, name).
*/
k.Matchlist
 .get({ name, options: opts.options })
 .then(data => console.log(data))
 .catch(err => console.error(err))

var accID = 47776491
var id = 32932398 // summonerID
k.Matchlist.get({ name }, KindredAPI.print)
k.Matchlist.get({ accID }, KindredAPI.print)
k.Matchlist.get({ id }, KindredAPI.print)
```

## Detailed Usage
```javascript
var KindredAPI = require('kindred-api')

// var RIOT_API_KEY = require('whatever')
// or if you're using something like dotenv..
require('dotenv').config()
var RIOT_API_KEY = process.env.RIOT_API_KEY
var REGIONS = KindredAPI.REGIONS
var LIMITS = KindredAPI.LIMITS
var CACHE_TYPES = KindredAPI.CACHE_TYPES

/*
  Default region for every method call is NA,
  but you can set it during initialization as shown below.
  You can also change it with 'setRegion(region)' as well.
  To NOT use the built-in rate limiter, do NOT pass in anything
  into limits. Same if you don't want to use the cache (cacheOptions).
*/
var k = new KindredAPI.Kindred({
  key: RIOT_API_KEY,
  defaultRegion: REGIONS.NORTH_AMERICA,
  debug: true, // shows status code, urls, and relevant headers
  limits: [ [10, 10], [500, 600] ], // user key
  // 10 requests per 10 seconds, 500 requests per 10 minutes
  // You can just pass in LIMITS.DEV, LIMITS.PROD, 'dev', or 'prod' instead though.
  cacheOptions: CACHE_TYPES[0] // in memory
})

console.log(CACHE_TYPES)

// ['in-memory-cache', 'redis']

var rprint = KindredAPI.print

/*
  The important thing about this wrapper is that it does not
  take in parameters the usual way. Instead, the only parameter,
  excluding the callback parameter, is an object of parameters.
*/
k.Summoner.get({ id: 354959 }, rprint)
k.Summoner.get({ id: 354959 }).then(data => console.log(data))

k.Match.get({ id: 2459973154, options: {
    includeTimeline: false // of course, option params must be the same as the ones in Riot Docs
}}, rprint)

k.League.challengers({ region: 'na', options: {
  type: 'RANKED_FLEX_SR'
}}, rprint)

/*
  All functions essentially have the following form:

  functionName({ arg1, arg2...argN, options: {} }, optionalCallback) -> promise

  If a method does not have the `options` parameter within my code, that simply means
  there are no possible query parameters that you can pass in to that method.
*/

/*
  Making any form of parameter error will inform you
  what parameters you can pass in so you hopefully
  don't have to refer to the documentation as much.
*/
k.Summoner.get(rprint)
// getSummoner request FAILED; required params `id` (int) or `name` (string) not passed in

k.ChampionMastery.get(rprint)
// getChampMastery request FAILED; required params `playerID` (int) AND `championID` (int) not passed in

/*
  Notice the OR and the AND!!
  Note: getChampMastery is the only method that can't take in an 'id' parameter,
  because it requires both a 'playerID' and a 'championID'!
*/

/*
  Let me reiterate: the first parameter of all endpoint methods will ALWAYS be an object.
  However, when the parameters are satisfied by default parameters and/or
  only have optional parameters, you can simply pass your callback in.
*/
k.League.challengers(rprint) // default region, default solo queue mode, valid

k.Static.runes(rprint) // only optional arguments & not passing in any optional arguments, valid

/*
  getSummoners & getSummoner target both the by-name and by-id endpoints.
  In the case of the summoner endpoints, it made a lot more sense for the two
  functions to target both the by-name and by-id summoner endpoints.
*/

k.Summoner.get({ name: 'Contractz' }, rprint)
k.Summoner.get({ id: 354959 }, rprint)

/*
  There are aliases for the `id` param.
  
  For example, for summoners, you have summonerID and playerID.
*/
k.Summoner.get({ summonerID: 354959 }, rprint)

k.Summoner
 .get({ summonerID: 354959 })
 .then(json => console.log(json))
 .catch(err => console.error(err))

k.Match.get({ id: 2459973154 }, rprint)

k.Match
 .get({ matchID: 2459973154 })
 .then(data => console.log(data))
 .catch(err => console.error(err))

/* Every method has an optional 'region' parameter. */
var params = { name: 'sktt1peanut', region: REGIONS.KOREA }
k.Summoner.get(params, rprint) // peanut's data

/* Changing the default region! */
k.setRegion(REGIONS.KOREA)

/* Note that you can use spaces in the name. */
var fakerIgn = { name: 'hide on bush' }
var fakerId
k.Summoner.get(fakerIgn, function (err, data) {
  fakerId = data.id
  console.log('fakerId:', fakerId)
})

/*
  Note that the player runes endpoint only accepts
  a comma-separated list of integers.
*/

k.setRegion(REGIONS.NORTH_AMERICA)

k.Runes.get({ id: 354959 }, rprint)

k.Runes
 .get({ id: 354959 })
 .then(json => console.log(json))
 .catch(err => console.error(err))

/*
  But what if you want to quickly get the rune page of
  some random summoner given their name?

  You'd chain it like in many other clients:
  Get the id from the name, get the runes from the id.
*/
var name = 'Richelle'
k.Summoner.get({ name }, function (err, data) {
  if (data) k.Runes.get({ id: data.id }, rprint)
  else console.error(err)
})

// or with promises
k.Summoner
 .get({ name })
 .then(data => k.Runes.get({ id: data.accountID }))
 .then(data => console.log(data))
 .catch(err => console.error(err))

/* I find that inconvenient, and so I just chain it for you in my code. */
// all methods that target endpoints that only accept ids
k.Runes.get({ name: 'Richelle' }, rprint)
k.Game.get({ name: 'Richelle' }, rprint)
k.League.get({ name: '5tunt' }, rprint)

k.CurrentGame.get({ name: 'Fràe', region: REGIONS.OCEANIA }, rprint)
k.League.get({ name: '5tunt' })
 .then(data => console.log(data))

var name = 'Grigne'
k.Runes.get({ name })
       .then(data => console.log(data))
k.Masteries.get({ name })
       .then(data => console.log(data))
/*
  Functions will have an options parameter that you can pass in query
  strings when applicable. Values of options should match the
  endpoint's 'Query Parameters'. Check the methods to see which methods
  you can pass in options to.

  Some are required, and some are not. I often take care of the ones
  that are required by using the most sensible defaults.

  For example, the required parameter for many methods is 'type' (of queue).
  I made it so that the default is 'RANKED_SOLO_5x5' (or 'TEAM_BUILDER_RANKED_SOLO')
  if 'type' is not passed in.
*/
k.League.challengers({ region: 'na' }, rprint) // get challengers from ranked solo queue ladder
k.League.challengers({ region: 'na', options: {
  type: 'RANKED_FLEX_SR'
}}, rprint) // get challengers from ranked flex ladder
k.Match.get({ id: 2459973154 }, rprint) // includes timeline by default
k.Match.get({ id: 2459973154, options: { includeTimeline: false } }, rprint)

/*
  However, for getMatchlist, the endpoint uses an optional
  'rankedQueues' instead of 'type' to allow multiple options.
  I still set the default to RANKED_SOLO_5x5 though.
*/
var name = 'caaaaaaaaaria'
k.Matchlist.get({ name, region: 'na', options: {
    /*
    According to Riot API, query parameters that can accept multiple values
    must be a comma separated list (or a single value), which is why one can do the below join.

    However, both these options are inconvenient, and so I check if you pass in array values
    for every option parameter, and manually join it for you. You can still pass in string values
    if you want though.

    Note, for arrays of values that are conceptually integers,
    both strings and integers work because they're joined together as a string anyways.
    */
    // rankedQueues: ['RANKED_SOLO_5x5', 'RANKED_FLEX_SR'].join(','), STILL VALID
    // championIds: '67' // '267,67' or ['267', '67'].join(',') STILL VALID
  rankedQueues: ['RANKED_SOLO_5x5', 'RANKED_FLEX_SR'], // valid
  championIds: [67, 62, '61'] // valid
} }, rprint)

/* The above example with promises. */
var opts = {
  name: 'caaaaaaaaaria',
  region: 'na',
  options: {
    rankedQueues: ['RANKED_SOLO_5x5', 'RANKED_FLEX_SR'],
    championIds: '67'
  }
}

k.Matchlist
 .get({ name: opts.name, region: opts.region, options: opts.options })
 .then(data => console.log(data))
 .catch(err => console.error(err))

var furyMasteryId = 6111
k.Static.mastery({ id: furyMasteryId }, rprint)

var msRuneId = 10002
k.Static.rune({ id: msRuneId }, rprint)
```

## Caching

*April 2*
I have added caching support. Right now, the library supports in-memory caching as well as
caching with Redis. These are the default timers that made sense to me.

``` javascript
const endpointCacheTimers = {
  // defaults
  CHAMPION: cacheTimers.MONTH,
  CHAMPION_MASTERY: cacheTimers.SIX_HOURS,
  CURRENT_GAME: cacheTimers.NONE,
  FEATURED_GAMES: cacheTimers.NONE,
  GAME: cacheTimers.HOUR,
  LEAGUE: cacheTimers.SIX_HOURS,
  STATIC: cacheTimers.MONTH,
  STATUS: cacheTimers.NONE,
  MATCH: cacheTimers.MONTH,
  MATCH_LIST: cacheTimers.ONE_HOUR,
  RUNES_MASTERIES: cacheTimers.WEEK,
  STATS: cacheTimers.HOUR,
  SUMMONER: cacheTimers.DAY
}
```

If you pass in cacheOptions, but not how long you want each type of request
to be cached (cacheTTL object), then by default you'll use the above timers.

To pass in your own custom timers, initialize Kindred like this:

``` javascript
import TIME_CONSTANTS from KindredAPI.TIME_CONSTANTS // for convenience, has a bunch of set timers in seconds

var k = new KindredAPI.Kindred({
  key: RIOT_API_KEY,
  defaultRegion: REGIONS.NORTH_AMERICA,
  debug: true, // you can see if you're retrieving from cache with lack of requests showing
  limits: [ [10, 10], [500, 600] ],
  cacheOptions: CACHE_TYPES[0], // in-memory
  cacheTTL: {
    // All values in SECONDS.
    CHAMPION: whatever,
    CHAMPION_MASTERY: whatever,
    CURRENT_GAME: whatever,
    FEATURED_GAMES: whatever,
    GAME: whatever,
    LEAGUE: whatever,
    STATIC: TIME_CONSTANTS.MONTH,
    STATUS: whatever,
    MATCH: whatever,
    MATCH_LIST: whatever,
    RUNES_MASTERIES: whatever,
    STATS: whatever,
    SUMMONER: TIME_CONSTANTS.DAY
  }
})
```

## Contributing and Issues

**Feel free to make a PR regarding anything (even the smallest typo or inconsistency).**

There are a few inconsistencies and weird things within this libary that I don't know how to address since this is my first API wrapper and I'm still quite a big newbie.

~~For example, the two methods getChamp() and getChampion() are actually different.~~

~~getChamp() targets the champ endpoint~~

~~getChampion() targets the static endpoint~~

~~I didn't want to attach getChampion() with 'static' in any way or form since I thought it looked kind of annoying because then I would want to attach static to the other static methods as well (maybe that's better?).~~

March 31: I decided to combat the above by just namespacing the functions
(k.Static.getChampion vs k.Champion.getChampion/get). The original functions are still usable though.

**Right now, the code is also quite messy and there is a lot of repeated code.** Function definitions are quite long because I include many aliases as well. I haven't thought of an elegant way to make a magic function that manages to work for every single endpoint request yet.

Any help and/or advice is appreciated!