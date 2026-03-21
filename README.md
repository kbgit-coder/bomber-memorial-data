# Bomber Memorial Data

Open dataset of WW2 bomber crash memorials — crew records, crash narratives, memorial details, and locations.

## What This Is

A community-maintained collection of structured data about WW2 bomber crash site memorials across the UK and internationally. Each memorial is a JSON file containing the crash story, crew details, aircraft information, and memorial description.

## Structure

```
data/
  memorials/    — one JSON file per memorial (e.g., farnsfield-halifax-mz519.json)
  crew/         — cross-referenced crew records (optional)
  airfields/    — RAF station reference data
scripts/
  validate.js   — validates all JSON against the schema
imports/        — raw research data before conversion to JSON
```

## Data Format

See [SCHEMA.md](SCHEMA.md) for the full field specification. Each memorial file contains:

- **Location** — name, coordinates, county, country, directions
- **Crash event** — date, operation type, cause of loss, narrative
- **Aircraft** — type, serial number, squadron, station
- **Crew** — rank, name, role, age, fate, burial, CWGC link
- **Memorial** — type, inscription, who erected it, condition
- **Sources** — citations, URLs, CWGC references

All fields are optional except `id`, `title`, `location_name`, `latitude`, and `longitude`.

## Contributing

1. Fork this repository
2. Add or edit memorial JSON files in `data/memorials/`
3. Run `node scripts/validate.js` to check your data
4. Submit a pull request

For non-developers: you can edit files directly in GitHub's web interface — click any JSON file, then click the pencil icon to edit.

If you have research but aren't comfortable with JSON, drop it as a text/markdown file in `imports/` and submit a PR — we'll convert it.

## Sources

Data compiled from:
- Commonwealth War Graves Commission (CWGC)
- International Bomber Command Centre (IBCC) Losses Database
- Imperial War Museums (IWM) War Memorials Register
- War Memorials Online
- Aircrew Remembered
- Peak District Air Accident Research
- Local history societies and community records

## Licence

Data: [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) — share and adapt with attribution, non-commercial, share-alike.

Code (scripts): MIT

## Project

Website: [bombermemorial.co.uk](https://bombermemorial.co.uk)

Maintained by Keith Binley and contributors.
