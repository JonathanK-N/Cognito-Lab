#!/bin/bash
set -e

if [ -f Cargo.toml ]; then
  echo "Building sim-engine with wasm-pack..."
  wasm-pack build --target web --out-dir pkg
else
  echo "sim-engine: Rust project not yet configured, skipping build"
  mkdir -p pkg
  # Create a minimal package.json for the pkg directory
  echo '{"name":"@cognitolab/sim-engine","version":"1.0.0","type":"module"}' > pkg/package.json
fi

