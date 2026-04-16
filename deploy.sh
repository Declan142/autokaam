#!/bin/bash
# AutoKaam.com deploy script
# Requires: Cloudflare token with Pages:Edit permission

set -e

# Load from vault
TOKEN=$(grep -oP 'cfut_\S+' ~/.claude/vault/cloudflare-master.md | head -1)
ACCOUNT_ID="18c1d9f76c2153a2dde6efa561116b17"
PROJECT="autokaam"

echo "Building..."
npm run build

echo "Deploying to Cloudflare Pages..."
CLOUDFLARE_API_TOKEN=$TOKEN CLOUDFLARE_ACCOUNT_ID=$ACCOUNT_ID \
  wrangler pages deploy out --project-name $PROJECT --branch main

echo "Submitting sitemap to IndexNow..."
curl -s -X POST "https://api.indexnow.org/indexnow" \
  -H "Content-Type: application/json" \
  -d "{
    \"host\": \"autokaam.com\",
    \"key\": \"autokaam2026\",
    \"urlList\": $(grep '<loc>' out/sitemap.xml | sed 's/.*<loc>//;s/<\/loc>.*//' | head -100 | python3 -c 'import sys,json; print(json.dumps([l.strip() for l in sys.stdin]))')
  }"

echo "Done! Site live at https://autokaam.com"
