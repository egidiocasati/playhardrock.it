#!/usr/bin/env node

/**
 * build.js — Generates static HTML and JSON-LD from data/shows.json
 *
 * This script reads concert data from data/shows.json (single source of truth)
 * and injects into index.html:
 *   1. MusicEvent JSON-LD structured data (for search engines and AI crawlers)
 *   2. <noscript> HTML fallback (for crawlers that don't execute JavaScript)
 *
 * Run: node build.js
 * No dependencies required (uses only Node.js built-in modules).
 */

'use strict';

var fs = require('fs');
var path = require('path');

var ROOT = __dirname;
var SHOWS_PATH = path.join(ROOT, 'data', 'shows.json');
var INDEX_PATH = path.join(ROOT, 'index.html');

var MONTHS = ['GEN','FEB','MAR','APR','MAG','GIU','LUG','AGO','SET','OTT','NOV','DIC'];

// ─── Helpers ───────────────────────────────────────

function readJSON(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function classifyShows(shows) {
  var now = new Date();
  now.setHours(0, 0, 0, 0);

  var upcoming = [];
  var past = [];

  shows.forEach(function (s) {
    var d = new Date(s.date + 'T00:00:00');
    if (d >= now) {
      upcoming.push(s);
    } else {
      past.push(s);
    }
  });

  upcoming.sort(function (a, b) { return new Date(a.date) - new Date(b.date); });
  past.sort(function (a, b) { return new Date(b.date) - new Date(a.date); });

  return { upcoming: upcoming, past: past };
}

// ─── JSON-LD Generation ────────────────────────────

function buildMusicEvent(show) {
  var event = {
    '@context': 'https://schema.org',
    '@type': 'MusicEvent',
    'name': 'PlayHard Live @ ' + show.venue,
    'startDate': show.date + 'T' + show.time + ':00+01:00',
    'eventStatus': 'https://schema.org/EventScheduled',
    'eventAttendanceMode': 'https://schema.org/OfflineEventAttendanceMode',
    'location': {
      '@type': 'Place',
      'name': show.venue,
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': show.address || '',
        'addressLocality': show.city,
        'addressCountry': 'IT'
      }
    },
    'performer': {
      '@type': 'MusicGroup',
      'name': 'PlayHard',
      'url': 'https://www.playhardrock.it'
    }
  };

  if (show.venueUrl) {
    event.organizer = {
      '@type': 'Organization',
      'name': show.venue,
      'url': show.venueUrl
    };
  }

  return event;
}

function generateEventsJsonLd(shows) {
  var events = shows.map(buildMusicEvent);
  return JSON.stringify(events, null, 2);
}

// ─── Noscript HTML Generation ──────────────────────

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function buildShowCardHtml(show, isPast, indent) {
  var d = new Date(show.date + 'T00:00:00');
  var day = String(d.getDate()).padStart(2, '0');
  var month = MONTHS[d.getMonth()];
  var year = d.getFullYear();
  var cls = isPast ? 'show-card show-card--past' : 'show-card';
  var i = indent;

  var lines = [];
  lines.push(i + '<div class="' + cls + '">');
  lines.push(i + '  <div class="show-card__info">');
  lines.push(i + '    <div class="show-card__date">');
  lines.push(i + '      <span class="show-card__day">' + day + '</span>');
  lines.push(i + '      <span class="show-card__month">' + month + '</span>');
  lines.push(i + '      <span class="show-card__year">' + year + '</span>');
  lines.push(i + '    </div>');
  lines.push(i + '    <div class="show-card__details">');

  if (show.venueUrl) {
    lines.push(i + '      <h3 class="show-card__venue"><a href="' + escapeHtml(show.venueUrl) + '" target="_blank" rel="noopener">' + escapeHtml(show.venue) + '</a></h3>');
  } else {
    lines.push(i + '      <h3 class="show-card__venue">' + escapeHtml(show.venue) + '</h3>');
  }

  lines.push(i + '      <p class="show-card__time">' + escapeHtml(show.day) + ', ore ' + escapeHtml(show.time) + '</p>');

  if (show.mapUrl && show.address) {
    lines.push(i + '      <p class="show-card__address"><a href="' + escapeHtml(show.mapUrl) + '" target="_blank" rel="noopener">' + escapeHtml(show.address) + ', ' + escapeHtml(show.city) + '</a></p>');
  } else {
    var addr = (show.address ? show.address + ', ' : '') + show.city;
    lines.push(i + '      <p class="show-card__address">' + escapeHtml(addr) + '</p>');
  }

  lines.push(i + '    </div>');
  lines.push(i + '  </div>');
  lines.push(i + '</div>');

  return lines.join('\n');
}

function generateNoscriptHtml(classified) {
  var indent = '      ';
  var lines = [];

  lines.push('    <noscript>');
  lines.push('      <div class="shows-noscript">');

  if (classified.upcoming.length > 0) {
    lines.push(indent + '<p class="shows__label">Prossime Date</p>');
    classified.upcoming.forEach(function (s) {
      lines.push(buildShowCardHtml(s, false, indent));
    });
  } else {
    lines.push(indent + '<p class="shows__label">Live</p>');
    lines.push(indent + '<p class="shows__empty">Nuove date in arrivo</p>');
  }

  if (classified.past.length > 0) {
    lines.push(indent + '<div style="margin-top:5rem;">');
    lines.push(indent + '  <p class="shows__past-label">Date Passate</p>');
    classified.past.forEach(function (s) {
      lines.push(buildShowCardHtml(s, true, indent + '  '));
    });
    lines.push(indent + '</div>');
  }

  lines.push('      </div>');
  lines.push('    </noscript>');

  return lines.join('\n');
}

// ─── Inject into index.html ────────────────────────

function replaceBetweenMarkers(html, startMarker, endMarker, newContent) {
  var startIdx = html.indexOf(startMarker);
  var endIdx = html.indexOf(endMarker);

  if (startIdx === -1 || endIdx === -1) {
    console.error('ERROR: Marker not found: ' + startMarker + ' / ' + endMarker);
    process.exit(1);
  }

  var before = html.substring(0, startIdx + startMarker.length);
  var after = html.substring(endIdx);

  return before + '\n' + newContent + '\n  ' + after;
}

// ─── Main ──────────────────────────────────────────

function main() {
  // Read data
  var shows = readJSON(SHOWS_PATH);
  var html = fs.readFileSync(INDEX_PATH, 'utf8');
  var classified = classifyShows(shows);

  console.log('Shows loaded: ' + shows.length + ' total (' + classified.upcoming.length + ' upcoming, ' + classified.past.length + ' past)');

  // Generate JSON-LD
  var jsonLd = generateEventsJsonLd(shows);
  var jsonLdBlock =
    '  <!-- Generated by build.js from data/shows.json — do not edit manually -->\n' +
    '  <script type="application/ld+json" id="events-jsonld">\n' +
    '  ' + jsonLd.split('\n').join('\n  ') + '\n' +
    '  </script>';

  html = replaceBetweenMarkers(
    html,
    '<!-- BUILD:EVENTS_JSONLD_START -->',
    '<!-- BUILD:EVENTS_JSONLD_END -->',
    jsonLdBlock
  );

  // Generate noscript fallback
  var noscriptHtml = generateNoscriptHtml(classified);
  var noscriptBlock =
    '    <!-- Generated by build.js from data/shows.json — do not edit manually -->\n' +
    noscriptHtml;

  html = replaceBetweenMarkers(
    html,
    '<!-- BUILD:SHOWS_NOSCRIPT_START -->',
    '<!-- BUILD:SHOWS_NOSCRIPT_END -->',
    noscriptBlock
  );

  // Write back
  fs.writeFileSync(INDEX_PATH, html, 'utf8');
  console.log('index.html updated successfully.');

  // Summary
  if (classified.upcoming.length > 0) {
    classified.upcoming.forEach(function (s) {
      console.log('  UPCOMING: ' + s.date + ' — ' + s.venue + ', ' + s.city);
    });
  }
  if (classified.past.length > 0) {
    classified.past.forEach(function (s) {
      console.log('  PAST:     ' + s.date + ' — ' + s.venue + ', ' + s.city);
    });
  }
}

main();
