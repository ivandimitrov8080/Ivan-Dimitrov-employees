# A technical challenge by Sirma Solutions


You can see more info at [the challenge pdf doc](sirma.pdf)


Can be used with [github pages](https://ivandimitrov8080.github.io/Ivan-Dimitrov-employees/)

Files to upload:

[test.csv](test.csv) consisting of about 5-10 rows that can be inspected by a human.
[sirma.csv](sirma.csv) consisting of 1000 rows that test the performance.

# Dependencies:

```
pnpm
rust
cargo
rsw
wasm-pack
```

# Building and running:

Run `pnpm i` after which run `pnpm build`. This is required to build the WASM package.

`pnpm dev` starts a development server.
`pnpm preview` shows how it is going to work in production.

