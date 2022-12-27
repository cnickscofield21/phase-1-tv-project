# TV Project Data Model
*Taken from [TVMaze](https://www.tvmaze.com/api)*

## Endpoints
---
### Search
---
#### Show search
Search through all the shows in our database by the show's name. A fuzzy algorithm is used (with a fuzziness value of 2), meaning that shows will be found even if your query contains small typos. Results are returned in order of relevancy (best matches on top) and contain each show's full information.

The most common usecase for this endpoint is when you're building a local mapping of show names to TVmaze ID's and want to make sure that you're mapping to exactly the right show, and not to a different show that happens to have the same name. By presenting each show's basic information in a UI, you can have the end-user pick a specific entry from that list, and have your application store the chosen show's ID or URL. Any subsequent requests for information on that show can then be directly made to that show's URL.

> - **URL:** /search/shows?q=:query
> 
> - *Example:*  https://api.tvmaze.com/search/shows?q=girls

#### Show single search
In some scenarios you might want to immediately return information based on a user's query, without the intermediary step of presenting them all the possible matches. In that case, you can use the singlesearch endpoint which either returns exactly one result, or no result at all. This endpoint is also forgiving of typos, but less so than the regular search (with a fuzziness of 1 instead of 2), to reduce the chance of a false positive.

As opposed to the regular search endpoint, the singlesearch endpoint allows embedding additional information in the result. See the section embedding for more information.

Beware that if multiple shows exist with an identical name (for example, Top Gear) it's undefined which of them will be returned by this endpoint. If you want to be sure you're matching with the proper show, use the search endpoint instead.

> - **URL:** /singlesearch/shows?q=:query
> 
> - *Example:*  https://api.tvmaze.com/singlesearch/shows?q=girls
> 
> - *Example:*  https://api.tvmaze.com/singlesearch/shows?q=girls&embed=episodes

#### Show Lookup
If you already know a show's thetvdb or IMDB ID, you can use this endpoint to find this exact show on TVmaze. If the given ID can be matched, a HTTP 301 redirect to the show's URL will be returned. Otherwise, a HTTP 404 is sent.

> - **URL:** /lookup/shows?tvrage=:id or /lookup/shows?thetvdb=:id
> 
> - *Example:*  https://api.tvmaze.com/lookup/shows?thetvdb=81189
> 
> - *Example:*  https://api.tvmaze.com/lookup/shows?imdb=tt0944947

#### People search
Search through all the people in our database, using the same mechanism as described for show searches.

> - **URL:** /search/people?q=:query
> 
> - *Example:*  https://api.tvmaze.com/search/people?q=lauren

### Schedule
---
The schedule is a complete list of episodes that air in a given country on a given date. Episodes are returned in the order in which they are aired, and full information about the episode and the corresponding show is included.

This endpoint will only return episodes that are tied to a specific country, either via a Network or via a local Web Channel such as HBO Max or Sky Go. Episodes from global Web Channels like Netflix are not included.

Note that contrary to what you might expect, the ISO country code for the United Kingdom is not UK, but GB.

> - **URL:** /schedule?country=:countrycode&date=:date
> 
>    (optional) countrycode: an ISO 3166-1 code of the country; defaults to US
> 
>    (optional) date: an ISO 8601 formatted date; defaults to the current day
> 
> - *Example:*  https://api.tvmaze.com/schedule?country=US&date=2014-12-01
> 
> - *Example:*  https://api.tvmaze.com/schedule

#### Web/streaming schedule
The web schedule is a complete list of episodes that air on web/streaming channels on a given date. TVmaze distinguishes between local and global Web Channels: local Web Channels are only available in one specific country, while global Web Channels are available in multiple countries. To query both local and global Web Channels, leave out the country parameter. To query only local Web Channels, set country to an ISO country code. And to query only global Web Channels, set country to an empty string.

> - **URL:** /schedule/web?country=:countrycode&date=:date
> 
>    (optional) countrycode: an ISO 3166-1 code of the country
>
>    (optional) date: an ISO 8601 formatted date; defaults to the current day
> 
> - *Example:*  https://api.tvmaze.com/schedule/web?date=2020-05-29
> 
> - *Example:*  https://api.tvmaze.com/schedule/web?date=2020-05-29&country=
> 
> - *Example:*  https://api.tvmaze.com/schedule/web?date=2020-05-29&country=US

#### Full schedule
The full schedule is a list of all future episodes known to TVmaze, regardless of their country. Be advised that this endpoint's response is at least several MB large. As opposed to the other endpoints, results are cached for 24 hours.

> - **URL:** /schedule/full
> 
> - *Example:*  https://api.tvmaze.com/schedule/full

### Shows
---
#### Show main information
Retrieve all primary information for a given show. This endpoint allows embedding of additional information. See the section embedding for more information.

> - **URL:** /shows/:id
> 
> - *Example:*  https://api.tvmaze.com/shows/1
> 
> - *Example:*  https://api.tvmaze.com/shows/1?embed=cast

#### Show episode list
A complete list of episodes for the given show. Episodes are returned in their airing order, and include full episode information. By default, specials are not included in the list.

> - **URL:** /shows/:id/episodes
>    (optional) specials: do include both significant and insignificant specials in the list
> 
> - *Example:*  https://api.tvmaze.com/shows/1/episodes
> 
> - *Example:*  https://api.tvmaze.com/shows/1/episodes?specials=1

#### Show alternate lists
Alternate episode lists for this show, for example DVD ordering. For a description of the different types of alternate lists that you can find, please refer to the alternate episode policy.

> - **URL:** /shows/:id/alternatelists
> 
> - *Example:*  https://api.tvmaze.com/shows/180/alternatelists
> 
> - **URL:** /alternatelists/:id
> 
> - *Example:*  https://api.tvmaze.com/alternatelists/1
> 
> - *Example:*  https://api.tvmaze.com/alternatelists/1?embed=alternateepisodes
> 
> - **URL:** /alternatelists/:id/alternateepisodes
> 
> - *Example:*  https://api.tvmaze.com/alternatelists/1/alternateepisodes
> 
> - *Example:*  https://api.tvmaze.com/alternatelists/1/alternateepisodes?embed=episodes

#### Episode by number
Retrieve one specific episode from this show given its season number and episode number. This either returns the full information for one episode, or a HTTP 404.

> - **URL:** /shows/:id/episodebynumber?season=:season&number=:number
> 
>    season: a season number
> 
>    number: an episode number
> 
> - *Example:*  https://api.tvmaze.com/shows/1/episodebynumber?season=1&number=1

#### Episodes by date
Retrieve all episodes from this show that have aired on a specific date. This either returns an array of full episode info, or a HTTP 404. Useful for daily (talk) shows that don't adhere to a common season numbering.

> - **URL:** /shows/:id/episodesbydate?date=:date
> 
>    date: an ISO 8601 formatted date
> 
> - *Example:*  https://api.tvmaze.com/shows/1/episodesbydate?date=2013-07-01

#### Show seasons
A complete list of seasons for the given show. Seasons are returned in ascending order and contain the full information that's known about them.

> - **URL:** /shows/:id/seasons
> 
> - *Example:*  https://api.tvmaze.com/shows/1/seasons

##### Season episodes
A list of episodes in this season. Specials are always included in this list.

> - **URL:** /seasons/:id/episodes
> 
> - *Example:*  https://api.tvmaze.com/seasons/1/episodes

#### Show cast
A list of main cast for a show. Each cast item is a combination of a person and a character. Items are ordered by importance, which is determined by the total number of appearances of the given character in this show.

> - **URL:** /shows/:id/cast
> 
> - *Example:*  https://api.tvmaze.com/shows/1/cast

#### Show crew
A list of main crew for a show. Each crew item is a combination of a person and their crew type.

> - **URL:** /shows/:id/crew
> 
> - *Example:*  https://api.tvmaze.com/shows/1/crew

#### Show AKA's
A list of AKA's (aliases) for a show. An AKA with its country set to null indicates an AKA in the show's original country. Otherwise, it's the AKA for that show in the given foreign country.

> - **URL:** /shows/:id/akas
> 
> - *Example:*  https://api.tvmaze.com/shows/1/akas

#### Show images
A list of all images available for this show. The image type can be "poster", "banner", "background", "typography", or NULL in case of legacy unclassified images. For a definition of these types, please refer to the main image and general image policies.

All image types are available under the "original" resolution; posters and banners are also available as a smaller resized version ("medium").

> - **URL:** /shows/:id/images
> 
> - *Example:*  https://api.tvmaze.com/shows/1/images

#### Show index
A list of all shows in our database, with all primary information included. You can use this endpoint for example if you want to build a local cache of all shows contained in the TVmaze database. This endpoint is paginated, with a maximum of 250 results per page. The pagination is based on show ID, e.g. page 0 will contain shows with IDs between 0 and 250. This means a single page might contain less than 250 results, in case of deletions, but it also guarantees that deletions won't cause shuffling in the page numbering for other shows.

Because of this, you can implement a daily/weekly sync simply by starting at the page number where you last left off, and be sure you won't skip over any entries. For example, if the last show in your local cache has an ID of 1800, you would start the re-sync at page number floor(1800/250) = 7. After this, simply increment the page number by 1 until you receive a HTTP 404 response code, which indicates that you've reached the end of the list.

As opposed to the other endpoints, results from the show index are cached for up to 24 hours.

> - **URL:** /shows?page=:num
> 
> - *Example:*  https://api.tvmaze.com/shows
> 
> - *Example:*  https://api.tvmaze.com/shows?page=1

### Episodes
---
#### Episode main information
Retrieve all primary information for a given episode. This endpoint allows embedding of additional information. See the section embedding for more information.

> - **URL:** /episodes/:id
> 
> - *Example:*  https://api.tvmaze.com/episodes/1
> 
> - *Example:*  https://api.tvmaze.com/episodes/1?embed=show

#### Episode guest cast
Retrieve all guest cast starring in an episode.

> - **URL:** /episodes/:id/guestcast
> 
> - *Example:*  https://api.tvmaze.com/episodes/1/guestcast

### People
---
#### Person main information
Retrieve all primary information for a given person. This endpoint allows embedding of additional information. See the section embedding for more information.

> - **URL:** /people/:id
> 
> - *Example:*  https://api.tvmaze.com/people/1
> 
> - *Example:*  https://api.tvmaze.com/people/1?embed=castcredits

#### Person cast credits
Retrieve all (show-level) cast credits for a person. A cast credit is a combination of both a show and a character. By default, only a reference to each show and character will be returned. However, this endpoint supports embedding, which means full information for the shows and characters can be included.

> - **URL:** /people/:id/castcredits
> 
> - *Example:*  https://api.tvmaze.com/people/1/castcredits
> 
> - *Example:*  https://api.tvmaze.com/people/1/castcredits?embed=show

#### Person crew credits
Retrieve all (show-level) crew credits for a person. A crew credit is combination of both a show and a crew type. By default, only a reference to each show will be returned. However, this endpoint supports embedding, which means full information for the shows can be included.

> - **URL:** /people/:id/crewcredits
> 
> - *Example:*  https://api.tvmaze.com/people/100/crewcredits
> 
> - *Example:*  https://api.tvmaze.com/people/100/crewcredits?embed=show

#### Person guest cast credits
Retrieve all (episode-level) guest cast credits for a person. A guest cast credit is a combination of both an episode and a character. By default, only a reference to each episode and character will be returned. However, this endpoint supports embedding, which means full information for the episodes and characters can be included.

> - **URL:** /people/:id/guestcastcredits
> 
> - *Example:*  https://api.tvmaze.com/people/1/guestcastcredits
> 
> - *Example:*  https://api.tvmaze.com/people/1/guestcastcredits?embed=episode

#### Person index
Like the show index but for people; please refer to the show index documentation. A maximum of 1000 results per page is returned.

> - **URL:** /people?page=:num
> 
> - *Example:*  https://api.tvmaze.com/people

### Updates
---
#### Show updates
A list of all shows in the TVmaze database and the timestamp when they were last updated. Updating a direct or indirect child of a show will also mark the show itself as updated. For example; creating, deleting or updating an episode or an episode's gallery item will mark the episode's show as updated. It's possible to filter the resultset to only include shows that have been updated in the past day (24 hours), week, or month.

> - **URL:** /updates/shows
> 
> - *Example:*  https://api.tvmaze.com/updates/shows
> 
> - *Example:*  https://api.tvmaze.com/updates/shows?since=day
> 
> - *Example:*  https://api.tvmaze.com/updates/shows?since=week
> 
> - *Example:*  https://api.tvmaze.com/updates/shows?since=month

#### Person updates
Like the show updates endpoint, but for people. A person is considered to be updated when any of their attributes are changed, but also when a cast- or crew-credit that involves them is created or deleted.

> - **URL:** /updates/people
> 
> - *Example:*  https://api.tvmaze.com/updates/people
> 
> - *Example:*  https://api.tvmaze.com/updates/people?since=day
> 
> - *Example:*  https://api.tvmaze.com/updates/people?since=week
> 
> - *Example:*  https://api.tvmaze.com/updates/people?since=month