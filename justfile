[private]
default:
  @just --list

gen:
  cd interpreter; cargo run
  bunx json-schema-to-typescript -i interpreter/gen/schema.json -o visualizer/gen/schema.ts
