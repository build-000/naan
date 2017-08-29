# soundcloud-charts-fetcher

## What is this for?

This tiny utility grabs All charts of SoundCloud service via Private API, and save them to local filesystem.

Currently, Soundcloud doesn't have Public API for querying charts, but actually they already implemented charts api 
for their service, and that Private Chart API can be accessed with 3rd party application client id.


## Requirements

Node.js (at least v8 for async/await syntax)
Client ID of Registered Soundcloud Application  


## Getting started

> $ npm install
>
> $ env SOUNDCLOUD_CLIENT_ID=YOUR_SOUNDCLOUD_CLIENT_ID $(npm bin)/ts-node index.js
> # or also you can use npx  
> $ env SOUNDCLOUD_CLIENT_ID=YOUR_SOUNDCLOUD_CLIENT_ID npx ts-node index.js


That's it!    

## License

MIT License

[mooyoul.mit-license.org](https://mooyoul.mit-license.org)

  