[private]
default:
  @just --list

gen:
  cd interpreter; cargo run
  bunx json-schema-to-typescript --additionalProperties=false -i interpreter/gen/schema.json -o visualizer/gen/schema.ts
