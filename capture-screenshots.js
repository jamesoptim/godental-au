#!/usr/bin/env node
/**
 * Captures website screenshots for all 80 dental practices.
 * Saves to images/screenshots/{state}/{slug}.jpg
 */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// Import practice data from build script
// We'll extract URLs directly by requiring the data
const buildScript = fs.readFileSync(path.join(__dirname, 'build-dental-pages.js'), 'utf8');

// Quick parse: extract practices object from the build script
// We'll eval just the data portion
const dataMatch = buildScript.match(/const practices = \{([\s\S]*?)\n\};\n/);
const statesMatch = buildScript.match(/const states = \[([\s\S]*?)\];\n/);

// Simpler approach: just extract URLs and slugs with regex
const practiceRegex = /slug:\s*'([^']+)',\s*\n\s*suburb:[^]*?website:\s*'([^']+)'/g;
const stateRegex = /slug:\s*'(vic|nsw|qld|sa|wa|tas|nt|act)'/g;

// Parse all practices from the build script more reliably
function extractPractices() {
  const practices = [];
  const stateBlocks = buildScript.split(/\b(vic|nsw|qld|sa|wa|tas|nt|act):\s*\[/);

  const stateOrder = ['vic', 'nsw', 'qld', 'sa', 'wa', 'tas', 'nt', 'act'];

  for (const state of stateOrder) {
    // Find all practices in this state block
    const stateIdx = buildScript.indexOf(`${state}: [`);
    if (stateIdx === -1) continue;

    const blockStart = stateIdx;
    // Find the matching closing bracket for this state array
    let depth = 0;
    let inBlock = false;
    let blockEnd = blockStart;
    for (let i = blockStart; i < buildScript.length; i++) {
      if (buildScript[i] === '[' && !inBlock) { inBlock = true; depth++; }
      else if (buildScript[i] === '[') depth++;
      else if (buildScript[i] === ']') {
        depth--;
        if (depth === 0) { blockEnd = i; break; }
      }
    }

    const block = buildScript.substring(blockStart, blockEnd);

    // Extract individual practices
    const slugRegex = /slug:\s*'([^']+)'/g;
    const websiteRegex = /website:\s*'([^']+)'/g;
    const nameRegex = /name:\s*'([^']+)'/g;

    const slugs = [...block.matchAll(slugRegex)].map(m => m[1]);
    const websites = [...block.matchAll(websiteRegex)].map(m => m[1]);
    const names = [...block.matchAll(nameRegex)].map(m => m[1]);

    for (let i = 0; i < slugs.length; i++) {
      practices.push({
        state,
        slug: slugs[i],
        name: names[i] || slugs[i],
        website: websites[i] || '',
      });
    }
  }

  return practices;
}

async function captureScreenshots() {
  const practices = extractPractices();
  console.log(`Found ${practices.length} practices to screenshot\n`);

  const outDir = path.join(__dirname, 'images', 'screenshots');

  // Create state directories
  for (const state of ['vic', 'nsw', 'qld', 'sa', 'wa', 'tas', 'nt', 'act']) {
    fs.mkdirSync(path.join(outDir, state), { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    ignoreHTTPSErrors: true,
  });

  let success = 0;
  let failed = 0;

  // Process 3 at a time for speed
  const concurrency = 3;
  for (let i = 0; i < practices.length; i += concurrency) {
    const batch = practices.slice(i, i + concurrency);

    await Promise.all(batch.map(async (practice) => {
      const outPath = path.join(outDir, practice.state, `${practice.slug}.jpg`);

      // Skip if already captured
      if (fs.existsSync(outPath)) {
        console.log(`  [skip] ${practice.state}/${practice.slug} (already exists)`);
        success++;
        return;
      }

      const page = await context.newPage();
      try {
        await page.goto(practice.website, {
          waitUntil: 'domcontentloaded',
          timeout: 15000
        });
        // Wait a bit for images/CSS to load
        await page.waitForTimeout(2000);

        await page.screenshot({
          path: outPath,
          type: 'jpeg',
          quality: 75,
          clip: { x: 0, y: 0, width: 1280, height: 800 }
        });

        console.log(`  [ok]   ${practice.state}/${practice.slug}`);
        success++;
      } catch (err) {
        console.log(`  [FAIL] ${practice.state}/${practice.slug} — ${err.message.substring(0, 60)}`);
        failed++;

        // Create a simple fallback placeholder image for failed sites
        // We'll let the build script handle the fallback
      } finally {
        await page.close();
      }
    }));
  }

  await browser.close();

  console.log(`\nDone! ${success} captured, ${failed} failed.`);
}

captureScreenshots().catch(console.error);
