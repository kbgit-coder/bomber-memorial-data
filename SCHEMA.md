# Memorial Data Schema

Each memorial is a single JSON file in `data/memorials/` named by slug (e.g., `farnsfield-halifax-mz519.json`).

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
| `os_grid_reference` | string | Ordnance Survey grid ref |
| `directions` | string | How to visit the memorial |

### Crash Event

| Field | Type | Description |
|-------|------|-------------|
| `crash_date` | string | ISO date (YYYY-MM-DD) |
| `operation_type` | string | "Operational" / "Training" / "Ferry" / "Other" |
| `operation_target` | string | Target or destination if operational |
| `cause_of_loss` | string | "Shot down" / "Engine failure" / "Weather" / "Collision" / "Other" |
| `narrative` | string | Free-text account of what happened |

### Aircraft

| Field | Type | Description |
|-------|------|-------------|
| `aircraft_type` | string | e.g., "Avro Lancaster III" |
| `serial_number` | string | RAF serial |
| `squadron` | string | Squadron number and code |
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
| `service_number` | string | Service number |
| `age` | number | Age at time of crash |
| `role` | string | "Pilot" / "Navigator" / "Bomb Aimer" / "Flight Engineer" / "Wireless Operator" / "Air Gunner" / etc. |
| `nationality` | string | e.g., "British", "Canadian", "Australian" |
| `fate` | string | "Killed" / "Survived" / "POW" / "Missing" |
| `burial_location` | string | Cemetery or memorial name |
| `cwgc_link` | string | URL to CWGC casualty record |

### Memorial

| Field | Type | Description |
|-------|------|-------------|
| `memorial_type` | string | "Stone" / "Plaque" / "Cairn" / "Cross" / "None" |
| `inscription` | string | Text of inscription |
| `erected_by` | string | Who established the memorial |
| `dedication_date` | string | ISO date or year |
| `condition` | string | "Good" / "Fair" / "Poor" / "At Risk" |

### Media & Sources

| Field | Type | Description |
|-------|------|-------------|
| `photos` | array | Array of `{ filename, caption, date, credit }` |
| `sources` | array | Array of `{ title, url, type }` |
| `cwgc_links` | array | Array of CWGC URLs |

### Metadata

| Field | Type | Description |
|-------|------|-------------|
| `contributor` | string | Who submitted this record |
| `last_updated` | string | ISO date of last edit |
| `data_quality` | string | "Complete" / "Partial" / "Stub" |
| `region_code` | string | Internal reference code (e.g., "LN-001") |

## Example

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
