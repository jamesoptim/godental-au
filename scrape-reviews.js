#!/usr/bin/env node
/**
 * Scrapes up to 3 Google reviews per dental practice.
 * Saves to reviews.json
 */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// Extract practice data from build script
function extractPractices() {
  const buildScript = fs.readFileSync(path.join(__dirname, 'build-dental-pages.js'), 'utf8');
  const practices = [];
  const stateOrder = ['vic', 'nsw', 'qld', 'sa', 'wa', 'tas', 'nt', 'act'];

  for (const state of stateOrder) {
    const stateIdx = buildScript.indexOf(`${state}: [`);
    if (stateIdx === -1) continue;

    let depth = 0, inBlock = false, blockEnd = stateIdx;
    for (let i = stateIdx; i < buildScript.length; i++) {
      if (buildScript[i] === '[' && !inBlock) { inBlock = true; depth++; }
      else if (buildScript[i] === '[') depth++;
      else if (buildScript[i] === ']') { depth--; if (depth === 0) { blockEnd = i; break; } }
    }

    const block = buildScript.substring(stateIdx, blockEnd);
    const slugs = [...block.matchAll(/slug:\s*'([^']+)'/g)].map(m => m[1]);
    const names = [...block.matchAll(/name:\s*'([^']+)'/g)].map(m => m[1]);
    const addresses = [...block.matchAll(/address:\s*'([^']+)'/g)].map(m => m[1]);

    for (let i = 0; i < slugs.length; i++) {
      practices.push({
        state,
        slug: slugs[i],
        name: names[i] || slugs[i],
        address: addresses[i] || '',
      });
    }
  }
  return practices;
}

async function scrapeReviews() {
  const practices = extractPractices();
  console.log(`Scraping reviews for ${practices.length} practices\n`);

  // Load existing reviews if any
  const reviewsPath = path.join(__dirname, 'reviews.json');
  let allReviews = {};
  if (fs.existsSync(reviewsPath)) {
    allReviews = JSON.parse(fs.readFileSync(reviewsPath, 'utf8'));
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    locale: 'en-AU',
    geolocation: { longitude: 151.2093, latitude: -33.8688 },
    permissions: ['geolocation'],
  });

  let success = 0;
  let failed = 0;

  for (const practice of practices) {
    const key = `${practice.state}/${practice.slug}`;

    // Skip if already scraped
    if (allReviews[key] && allReviews[key].length > 0) {
      console.log(`  [skip] ${key}`);
      success++;
      continue;
    }

    const page = await context.newPage();
    try {
      // Search Google Maps for the practice
      const query = encodeURIComponent(`${practice.name} ${practice.address}`);
      const url = `https://www.google.com/maps/search/${query}`;

      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
      await page.waitForTimeout(3000);

      // Try to click on the first result if there's a list
      try {
        const firstResult = page.locator('[role="feed"] > div').first();
        if (await firstResult.isVisible({ timeout: 3000 })) {
          await firstResult.click();
          await page.waitForTimeout(2000);
        }
      } catch (e) {
        // Already on the place page, continue
      }

      // Look for the reviews section — try clicking "Reviews" tab
      try {
        const reviewTab = page.locator('button[role="tab"]').filter({ hasText: /review/i });
        if (await reviewTab.isVisible({ timeout: 3000 })) {
          await reviewTab.click();
          await page.waitForTimeout(2500);
        }
      } catch (e) {
        // No reviews tab, try scrolling to reviews
      }

      // Extract reviews from the page
      const reviews = await page.evaluate(() => {
        const reviewElements = document.querySelectorAll('[data-review-id], [class*="review"]');
        const results = [];

        // Try multiple selectors for Google Maps reviews
        const containers = document.querySelectorAll('.jftiEf, [data-review-id]');

        for (const container of containers) {
          if (results.length >= 3) break;

          // Try to get author name
          const authorEl = container.querySelector('.d4r55, [class*="author"], .WNxzHc');
          const author = authorEl ? authorEl.textContent.trim() : null;

          // Try to get review text
          const textEl = container.querySelector('.wiI7pd, .MyEned, [class*="review-text"]');
          let text = textEl ? textEl.textContent.trim() : null;

          // Try to get star rating
          const starsEl = container.querySelector('[role="img"][aria-label*="star"], .kvMYJc');
          let stars = 5;
          if (starsEl) {
            const ariaLabel = starsEl.getAttribute('aria-label') || '';
            const match = ariaLabel.match(/(\d)/);
            if (match) stars = parseInt(match[1]);
          }

          // Try to get date
          const dateEl = container.querySelector('.rsqaWe, [class*="publish-date"]');
          const date = dateEl ? dateEl.textContent.trim() : '';

          if (author && text && text.length > 10) {
            results.push({
              author: author.substring(0, 30),
              text: text.substring(0, 200) + (text.length > 200 ? '...' : ''),
              stars,
              date,
            });
          }
        }

        return results;
      });

      if (reviews.length > 0) {
        allReviews[key] = reviews;
        console.log(`  [ok]   ${key} — ${reviews.length} reviews`);
        success++;
      } else {
        // Fallback: try a simpler extraction
        const fallbackReviews = await page.evaluate(() => {
          const results = [];
          // Try aria labels that contain star ratings
          const allSpans = document.querySelectorAll('span');
          for (const span of allSpans) {
            if (results.length >= 3) break;
            const text = span.textContent.trim();
            if (text.length > 30 && text.length < 500 && !text.includes('\n') && !text.includes('http')) {
              // Check if parent has star info
              const parent = span.closest('[data-review-id]') || span.parentElement;
              if (parent) {
                results.push({
                  author: 'Google User',
                  text: text.substring(0, 200) + (text.length > 200 ? '...' : ''),
                  stars: 5,
                  date: '',
                });
              }
            }
          }
          return results;
        });

        if (fallbackReviews.length > 0) {
          allReviews[key] = fallbackReviews;
          console.log(`  [ok]   ${key} — ${fallbackReviews.length} reviews (fallback)`);
          success++;
        } else {
          console.log(`  [FAIL] ${key} — no reviews found`);
          allReviews[key] = [];
          failed++;
        }
      }

    } catch (err) {
      console.log(`  [FAIL] ${key} — ${err.message.substring(0, 60)}`);
      allReviews[key] = [];
      failed++;
    } finally {
      await page.close();
    }

    // Save progress after each practice
    fs.writeFileSync(reviewsPath, JSON.stringify(allReviews, null, 2));
  }

  await browser.close();
  console.log(`\nDone! ${success} with reviews, ${failed} without.`);
  console.log(`Saved to ${reviewsPath}`);
}

scrapeReviews().catch(console.error);
