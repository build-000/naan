import * as BbPromise from "bluebird";
import * as debug from "debug";
import * as fs from "fs";
import * as request from "request";
import * as path from "path";

const LOG_TAG = "soundcloud-charts-fetcher";
const MAX_CONCURRENCY = 2;

debug.enable(LOG_TAG);
const log = debug(LOG_TAG);

const UNOFFICIAL_SOUNDCLOUD_CHART_API_ENDPOINT = 'https://api-v2.soundcloud.com/charts';

const BASE_PAYLOAD = {
  high_tier_only: 'false',
  client_id: process.env.SOUNDCLOUD_CLIENT_ID,
  linked_partitioning: '1',
  app_version: '1503651513'
};

const AVAILABLE_CHART_GENRES: string[] = [
  'all-music',
  'alternativerock',
  'ambient',
  'classical',
  'country',
  'danceedm',
  'dancehall',
  'deephouse',
  'disco',
  'drumbass',
  'dubstep',
  'electronic',
  'folksingersongwriter',
  'hiphoprap',
  'house',
  'indie',
  'jazzblues',
  'latin',
  'metal',
  'piano',
  'pop',
  'rbsoul',
  'reggae',
  'reggaeton',
  'rock',
  'soundtrack',
  'techno',
  'trance',
  'trap',
  'triphop',
  'world',
];

enum AVAILABLE_CHART_TYPE {
  TOP = 'top',
  TRENDING= 'trending', // same as HOT & NEW
}


async function main() {
  log("fetching charts");

  const { top, trending } = await BbPromise.props({
    top: BbPromise.map(AVAILABLE_CHART_GENRES,
      (genre) => fetchChart(AVAILABLE_CHART_TYPE.TOP, genre).tap((chart: any) => log("fetched %s %s", chart.kind, chart.genre)),
      { concurrency: MAX_CONCURRENCY }),
    trending: BbPromise.map(AVAILABLE_CHART_GENRES,
      (genre) => fetchChart(AVAILABLE_CHART_TYPE.TRENDING, genre).tap((chart: any) => log("fetched %s %s", chart.kind, chart.genre)),
      { concurrency: MAX_CONCURRENCY}),
  });


  log("fetched charts, saving");

  const OUT_DIR = `sc_charts_${Date.now()}`;
  await mkdir(OUT_DIR);

  const merged = [].concat(top as any).concat(trending as any);

  await BbPromise.map(merged, (chart: any) => {
    const filename = `${chart.kind}_${chart.genre.replace(/[^a-z0-9_]/gi, "_")}.json`;

    log("saving %s", filename);
    return saveFile(path.join(OUT_DIR, filename), JSON.stringify(chart));
  });

  log("done");
}

function fetchChart(type: AVAILABLE_CHART_TYPE, genre: string) {
  return new BbPromise((resolve, reject) => {
    request({
      url: UNOFFICIAL_SOUNDCLOUD_CHART_API_ENDPOINT,
      qs: {
        ...BASE_PAYLOAD,
        genre: `soundcloud:genres:${genre}`,
        kind: type,
      },
      json: true,
    }, (e, res, body) => {
      if (e) {
        return reject(e);
      }

      if (res.statusCode !== 200) {
        return reject(new Error(`Got unexpected response code: ${res.statusCode}`));
      }


      resolve(body);
    });
  });
}

function mkdir(path: string) {
  return new BbPromise((resolve, reject) => {
    fs.mkdir(path, (e) => {
      if (e) { return reject(e); }

      resolve();
    });
  });
}

function saveFile(path: string, content: string | Buffer) {
  return new BbPromise((resolve, reject) => {
    fs.writeFile(path, content, (e) => {
      if (e) { return reject(e); }

      resolve();
    })
  });
}



main().then(console.log, console.error);
