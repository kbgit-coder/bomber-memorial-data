# Verification Records

Provenance and quality records for BMR data. Each file is an append-only log.

## Files

| File | What it tracks | Status |
|------|---------------|--------|
| `urls.csv` | All 746 external links — status, specificity, action needed | ✅ Active (seeded 2026-04-06) |
| `coordinates.csv` | lat/lng and what3words verification | 🔲 Schema ready, needs seeding |
| `mottos.csv` | Squadron motto verification log | 🔲 Schema ready, needs seeding |
| `crew-data.csv` | Crew names, ranks, service numbers | 🔲 Schema ready, needs seeding |
| `photos.csv` | Photo attribution and rights | 🔲 Schema ready, needs seeding |
| `memorial-status.csv` | Physical condition of each memorial | 🔲 Schema ready, needs seeding |

## Schema: urls.csv
- `memorial_id` — matches memorial JSON id
- `url` — the external link
- `url_type` — local_contact / external_narrative / source_reference / photo_credit / maintainer
- `field_path` — JSON field path within the memorial record
- `specificity` — specific / county_level / generic
- `last_verified_date` — YYYY-MM-DD
- `last_http_status` — HTTP response code
- `action_needed` — none / upgrade_to_specific_branch / remove_or_replace / verify_manually / monitor
- `date_fixed` — when actioned

## Schema: coordinates.csv
memorial_id,lat,lng,what3words,source,evidence,confidence,verifier,date_verified,date_deployed,notes

## Schema: mottos.csv
memorial_id,squadron,motto_text,source,evidence_url,verifier,date_verified,date_deployed,notes

## Schema: crew-data.csv
memorial_id,crew_member_name,rank,role,service_number,nationality,dob,dod,cwgc_url,source,verifier,date_verified,notes

## Schema: photos.csv
memorial_id,filename,credit,source,rights_status,permission_obtained,date_verified,notes

## Schema: memorial-status.csv
memorial_id,physical_status,last_visited,reported_by,condition_notes,date_verified,source
