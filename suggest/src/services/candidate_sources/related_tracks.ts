import * as BbPromise from "bluebird";
import * as debug from "debug";
import * as _ from "lodash";
import * as request from "request";

import { CandidateItem, DataSource, MOOD, WEATHER } from "./base";
import MAPPED_SET = require("./mapped_data");

export class RelatedTrackDataSource implements DataSource<CandidateItem> {
  private readonly LOG_TAG = "naan-suggest:related-track";
  private readonly MAX_CONCURRENCY = 4;
  private readonly log = debug(this.LOG_TAG);

  constructor(
    private mood: MOOD,
    private weather: WEATHER,
    private clientId: string,
  ) {}

  public async fetch(count: number = 100) {
    const mappedTrackIds = MAPPED_SET.filter((set) => {
      return set.mood === this.mood &&
        set.weather === this.weather;
    }).map((set) => set.id);
    const mappedTrackLength = mappedTrackIds.length;
    var randNum = Math.floor(Math.random() * (mappedTrackLength));
    const relatedTracks = await this.getRelatedTracks(mappedTrackIds[randNum]);

    const scoredTracks = await BbPromise.map(mappedTrackIds, async (trackId) => {
      try {
        return await this.getTrack(trackId);
      } catch (e) {
        console.log("Got unexpected error: ", e);
        return null;
      }
    }, { concurrency: this.MAX_CONCURRENCY });

    return _([relatedTracks, ...relatedTracks])
      .flattenDeep<CandidateItem>()
      .filter((v) => v)
      .slice(0, count)
      .value();
  }

  private getTrack(trackId: number): BbPromise<CandidateItem> {
    return new BbPromise((resolve, reject) => {
      request({
        method: "GET",
        url: `http://api.soundcloud.com/tracks/${trackId}`,
        qs: {
          client_id: this.clientId,
        },
        json: true,
      }, (e, res, body) => {
        if (e) {
          return reject(e);
        }

        if (res.statusCode !== 200) {
          console.log("getTrack", trackId, res.statusCode, body);
          return reject(new Error(`Got unexpected status code ${res.statusCode}`));
        }

        resolve({
          id: trackId,
          track: body,
          score: Math.max(0.4, Math.random() * 0.6),
          metadata: {
            source: "related",
            trackId,
          },
        });
      });
    });
  }

  private getRelatedTracks(trackId: number): BbPromise<CandidateItem[]> {
    return new BbPromise((resolve, reject) => {
      request({
        method: "GET",
        url: `http://api.soundcloud.com/tracks/${trackId}/related`,
        qs: {
          client_id: this.clientId,
        },
        json: true,
      }, (e, res, body) => {
        if (e) {
          return reject(e);
        }

        if (res.statusCode !== 200) {
          console.log("getRelatedTracks", trackId, res.statusCode, body);
          return reject(new Error(`Got unexpected status code ${res.statusCode}`));
        }

        const candidates: CandidateItem[] = body.map((relatedTrack: any) => ({
          id: relatedTrack.id,
          track: relatedTrack,
          score: Math.random() * 0.4,
          metadata: {
            origin: "related",
            trackId,
          },
        }));
        resolve(candidates);
      });
    });
  }
}
