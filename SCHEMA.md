# Memorial Data Schema v2.0

**Evolved:** 21 March 2026 — incorporates Charlie Leitheiser's CWGC verification, Schema.org structured data, and international memorial support.

Each memorial is a single JSON file in `data/memorials/` named by slug (e.g., `farnsfield-halifax-mz519.json`).

**Backward compatibility:** v1.0 flat-format entries remain valid. New fields are all optional. Existing entries will be progressively enriched.

## Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique slug identifier (matches filename) |
| `title` | string | Memorial name |
| `location_name` | string | Human-readable place name |
| `latitude` | number | Decimal latitude |
| `longitude` | number | Decimal longitude |

## Optional Fields

### Location

| Field | Type | Description |
|-------|------|-------------|
| `county` | string | County/region |
| `country` | string | Country (default: "United Kingdom") |
| `country_code` | string | ISO 3166-1 alpha-2 (e.g. "GB", "NL", "BE") — **v2.0** |
| `os_grid_reference` | string | Ordnance Survey grid ref (UK only) |
| `directions` | string | How to visit the memorial |
| `nearest_airfield` | string | RAF station nearest to crash — **v2.0** |

### Crash Event

| Field | Type | Description |
|-------|------|-------------|
| `crash_date` | string | ISO date (YYYY-MM-DD) |
| `crash_time` | string | 24hr time if known (HH:MM) — **v2.0** |
| `operation_type` | string | "Operational" / "Training" / "Ferry" / "Test" / "Return" / "Unknown" |
| `operation_target` | string | Target or destination if operational |
| `cause_of_loss` | string | Brief cause description |
| `narrative` | string | Full prose account — the story that makes people care |
| `casualties_killed` | number | Number killed — **v2.0** |
| `casualties_survived` | number | Number survived — **v2.0** |

### Aircraft

| Field | Type | Description |
|-------|------|-------------|
| `aircraft_type` | string | Full type and mark (e.g. "Avro Lancaster Mk.I") |
| `aircraft_type_short` | string | Display name (e.g. "Lancaster") — **v2.0** |
| `serial_number` | string | Aircraft serial (e.g. "MZ519") |
| `squadron` | string | Squadron number and code |
| `squadron_number` | number | Numeric squadron for filtering — **v2.0** |
| `unit` | string | Parent unit if not squadron (e.g. "1660 HCU") — **v2.0** |
| `station` | string | Airfield name |
| `aircraft_code` | string | Individual aircraft code letters |

### Crew

| Field | Type | Description |
|-------|------|-------------|
| `crew` | array | Array of crew member objects |

Each crew member:

| Field | Type | Description |
|-------|------|-------------|
| `rank` | string | Military rank |
| `name` | string | Full name |
| `service_number` | string | Service number with branch (e.g. "R/102085 RCAF") |
| `age` | number | Age at time of crash |
| `role` | string | Crew role |
| `nationality` | string | Nationality and home location if known |
| `fate` | string | "Killed" / "Survived" / "POW" / "Evaded" / "Missing" |
| `burial_location` | string | Cemetery and grave reference |
| `cwgc_link` | string | URL to CWGC casualty record |
| `cwgc_verified` | boolean | Whether CWGC record has been cross-checked — **v2.0** |
| `decorations` | string | Awards (e.g. "DFM", "DFC") — **v2.0** |

### Memorial

| Field | Type | Description |
|-------|------|-------------|
| `memorial_type` | string | "Stone" / "Plaque" / "Cairn" / "Cross" / "Garden" / "Naming" / "Museum" / "None" |
| `inscription` | string | Text of inscription |
| `erected_by` | string | Who established the memorial |
| `dedication_date` | string | ISO date or year |
| `condition` | string | "Excellent" / "Good" / "Fair" / "Poor" / "At Risk" / "Unknown" |
| `publicly_accessible` | boolean | Can the public visit? — **v2.0** |
| `iwm_ref` | string | Imperial War Museum memorial reference — **v2.0** |

### Media & Sources

| Field | Type | Description |
|-------|------|-------------|
| `photos` | array | Array of `{ filename, caption, date, credit }` |
| `sources` | array | Array of `{ title, url, type }` |

### Metadata

| Field | Type | Description |
|-------|------|-------------|
| `contributor` | string | Who submitted this record |
| `last_updated` | string | ISO date of last edit |
| `data_quality` | string | "Research Grade" / "Complete" / "Partial" / "Stub" / "Unverified" |
| `web_suitability` | string | "Excellent" / "Good" / "Fair" / "Stub" — **v2.0** |
| `region_code` | string | Internal reference code (e.g. "LN-001", "INT-NL-001") |
| `status` | string | Data completeness: "stub" / "partial" / "complete" / "verified" — **v2.0** |

### Linked Data (v2.0)

| Field | Type | Description |
|-------|------|-------------|
| `schema_type` | string | Schema.org type (default: "HistoricalEvent") |
| `same_as` | array | URLs of authoritative pages (CWGC, IWM, Wikipedia) |

### Relationships (v2.0)

| Field | Type | Description |
|-------|------|-------------|
| `related_memorials` | array | IDs of related records (e.g. mid-air collision, same event) |
| `tags` | array | Searchable tags: aircraft type, nationality, county, etc. |

## JSON Schema

A formal JSON Schema (draft 2020-12) is available at `schema/memorial.schema.json` for validation.

## Example (v1.0 format — still valid)

```json
{
  "id": "farnsfield-halifax-mz519",
  "title": "Farnsfield Halifax MZ519 Memorial",
  "location_name": "Farnsfield, Nottinghamshire",
  "latitude": 53.0836,
  "longitude": -1.0234,
  "county": "Nottinghamshire",
  "country": "United Kingdom",
  "crash_date": "1944-07-06",
  "aircraft_type": "Handley Page Halifax Mk.III",
  "serial_number": "MZ519",
  "aircraft_code": "LK-U",
  "squadron": "578 Squadron",
  "station": "RAF Burn",
  "operation_type": "Operational",
  "operation_target": "V-1 sites, Croixdalle, France",
  "cause_of_loss": "Anti-aircraft damage over Dieppe",
  "narrative": "The crew bombed V-1 launch sites...",
  "crew": [
    {
      "rank": "P/O",
      "name": "Reginald Parfitt",
      "service_number": "177439 RAFVR",
      "age": 22,
      "role": "Pilot",
      "nationality": "British",
      "fate": "Killed",
      "burial_location": "Cardiff Cemetery (Cathays)"
    }
  ],
  "memorial_type": "Stone memorial",
  "erected_by": "Farnsfield Memorial Trust",
  "dedication_date": "1994-07-06",
  "condition": "Good",
  "sources": [
    { "title": "Aircrew Remembered", "url": "https://aircrewremembered.com/parfitt-reginald.html", "type": "website" }
  ],
  "contributor": "Keith Binley",
  "last_updated": "2026-03-21",
  "data_quality": "Complete"
}
```

## v2.0 Enriched Example

```json
{
  "id": "farnsfield-halifax-mz519",
  "title": "Farnsfield Halifax MZ519 Memorial",
  "location_name": "Farnsfield, Nottinghamshire",
  "latitude": 53.0836,
  "longitude": -1.0234,
  "county": "Nottinghamshire",
  "country": "United Kingdom",
  "country_code": "GB",
  "nearest_airfield": "RAF Burn",
  "crash_date": "1944-07-06",
  "aircraft_type": "Handley Page Halifax Mk.III",
  "aircraft_type_short": "Halifax",
  "serial_number": "MZ519",
  "squadron": "578 Squadron",
  "squadron_number": 578,
  "casualties_killed": 7,
  "casualties_survived": 0,
  "status": "verified",
  "web_suitability": "Excellent",
  "crew": [
    {
      "rank": "P/O",
      "name": "Reginald Parfitt",
      "service_number": "177439 RAFVR",
      "age": 22,
      "role": "Pilot",
      "nationality": "British",
      "fate": "Killed",
      "burial_location": "Cardiff Cemetery (Cathays), Sec E.A., Grave 2214",
      "cwgc_link": "https://www.cwgc.org/find-records/find-war-dead/casualty-details/2618424",
      "cwgc_verified": true
    }
  ],
  "publicly_accessible": true,
  "schema_type": "HistoricalEvent",
  "same_as": [
    "https://www.iwm.org.uk/memorials/item/memorial/32217"
  ],
  "tags": ["halifax", "nottinghamshire", "operational", "578-sqn", "burn", "v1-sites", "all-killed"],
  "data_quality": "Research Grade"
}
```

## What Changed in v2.0

| Addition | Source | Why |
|----------|--------|-----|
| `cwgc_verified` | Charlie Leitheiser | Track whether CWGC record cross-checked |
| `decorations` | Keith's research | Captures DFM, DFC etc. |
| `crash_time` | Keith's regional files | Some entries have precise times |
| `casualties_killed/survived` | Both | Structured casualty counts |
| `nearest_airfield` | Keith's Farnsfield analysis | Three-airfield pattern insight |
| `country_code` | International support | ISO codes for filtering/mapping |
| `aircraft_type_short` | Display convenience | "Lancaster" vs "Avro Lancaster Mk.I" |
| `squadron_number` | Filtering | Numeric for search/sort |
| `unit` | Both | HCUs and non-squadron units |
| `publicly_accessible` | Community use | Can visitors actually get there? |
| `iwm_ref` | Keith's IWM research | Cross-reference to IWM register |
| `schema_type` / `same_as` | Charlie's Schema.org work | SEO structured data |
| `related_memorials` | Both (mid-air collisions) | Links records for same event |
| `status` | New | stub→partial→complete→verified progression |
| `web_suitability` | Keith's ratings | How ready for the website |
| `tags` | New | Searchable facets |
