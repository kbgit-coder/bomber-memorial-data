#!/usr/bin/env node
/**
 * Validates all memorial JSON files against the schema.
 * Usage: node scripts/validate.js
 */
const fs = require('fs');
const path = require('path');

const REQUIRED_FIELDS = ['id', 'title', 'location_name', 'latitude', 'longitude'];
const VALID_OPERATION_TYPES = ['Operational', 'Training', 'Ferry', 'Other'];
const VALID_FATES = ['Killed', 'Survived', 'POW', 'Missing'];
const VALID_MEMORIAL_TYPES = ['Stone memorial', 'Stone', 'Plaque', 'Cairn', 'Cross', 'None', 'Memorial at RAF Ossington site'];
const VALID_CONDITIONS = ['Good', 'Fair', 'Poor', 'At Risk'];
const VALID_QUALITY = ['Complete', 'Partial', 'Stub'];

const memorialsDir = path.join(__dirname, '..', 'data', 'memorials');
const files = fs.readdirSync(memorialsDir).filter(f => f.endsWith('.json'));

let errors = 0;
let warnings = 0;

console.log(`Validating ${files.length} memorial files...\n`);

files.forEach(file => {
  const filepath = path.join(memorialsDir, file);
  let data;
  try {
    data = JSON.parse(fs.readFileSync(filepath, 'utf8'));
  } catch (e) {
    console.log(`  ERROR  ${file}: Invalid JSON - ${e.message}`);
    errors++;
    return;
  }

  // Check required fields
  REQUIRED_FIELDS.forEach(field => {
    if (data[field] === undefined || data[field] === null || data[field] === '') {
      console.log(`  ERROR  ${file}: Missing required field "${field}"`);
      errors++;
    }
  });

  // Check id matches filename
  const expectedId = file.replace('.json', '');
  if (data.id !== expectedId) {
    console.log(`  ERROR  ${file}: id "${data.id}" does not match filename`);
    errors++;
  }

  // Check coordinates are valid
  if (data.latitude && (data.latitude < -90 || data.latitude > 90)) {
    console.log(`  ERROR  ${file}: Invalid latitude ${data.latitude}`);
    errors++;
  }
  if (data.longitude && (data.longitude < -180 || data.longitude > 180)) {
    console.log(`  ERROR  ${file}: Invalid longitude ${data.longitude}`);
    errors++;
  }

  // Check date format
  if (data.crash_date && !/^\d{4}-\d{2}-\d{2}$/.test(data.crash_date)) {
    console.log(`  WARN   ${file}: crash_date "${data.crash_date}" not in YYYY-MM-DD format`);
    warnings++;
  }

  // Check crew array
  if (data.crew && Array.isArray(data.crew)) {
    data.crew.forEach((member, i) => {
      if (!member.name) {
        console.log(`  WARN   ${file}: Crew member ${i} missing name`);
        warnings++;
      }
      if (member.fate && !VALID_FATES.includes(member.fate)) {
        console.log(`  WARN   ${file}: Crew "${member.name}" has non-standard fate "${member.fate}"`);
        warnings++;
      }
    });
  }

  // Check data quality
  if (data.data_quality && !VALID_QUALITY.includes(data.data_quality)) {
    console.log(`  WARN   ${file}: Non-standard data_quality "${data.data_quality}"`);
    warnings++;
  }
});

console.log(`\nResults: ${files.length} files, ${errors} errors, ${warnings} warnings`);
if (errors === 0) {
  console.log('All files valid.');
  process.exit(0);
} else {
  process.exit(1);
}
