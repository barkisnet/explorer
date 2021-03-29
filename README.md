# Barkisnet Blockchain Explorer

## How to run the blockchain explorer

1. Copy `default_settings.json` to `settings.json`.
2. Update the RPC and LCD URLs.
3. Update genesis file location.

### Run in local

```sh
meteor npm install
meteor update
meteor --settings settings.json
```

### Run in production

```sh
./build.sh
```

It will create a packaged Node JS tarball at `../output`. Deploy that packaged Node JS project with process manager like [forever](https://www.npmjs.com/package/forever) or [Phusion Passenger](https://www.phusionpassenger.com/library/walkthroughs/basics/nodejs/fundamental_concepts.html).
