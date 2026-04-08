import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, shareReplay, timeout } from 'rxjs';

import { Mission } from '../models/mission';

interface SpaceXLaunchResponse {
  flight_number: number;
  mission_name: string;
  launch_year: string;
  details: string | null;
  links: {
    mission_patch_small: string | null;
    article_link: string | null;
    wikipedia: string | null;
    video_link: string | null;
  };
  rocket: {
    rocket_name: string;
    rocket_type: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class SpacexapiService {
  private readonly apiUrl = 'https://api.spacexdata.com/v3/launches';
  private readonly requestTimeoutMs = 10000;
  private readonly launches$: Observable<Mission[]>;

  constructor(private readonly http: HttpClient) {
    this.launches$ = this.http
      .get<SpaceXLaunchResponse[]>(this.apiUrl)
      .pipe(
        timeout(this.requestTimeoutMs),
        map((launches) => launches.map((launch) => this.mapLaunch(launch))),
        shareReplay(1),
      );
  }

  getAllLaunches(): Observable<Mission[]> {
    return this.launches$;
  }

  getLaunchesByYear(year: string): Observable<Mission[]> {
    return this.launches$.pipe(
      map((launches) =>
        launches.filter((launch) => launch.launch_year === year),
      ),
    );
  }

  getLaunchByFlightNumber(
    flightNumber: number,
    missionName?: string | null,
    launchYear?: string | null,
  ): Observable<Mission> {
    return this.launches$.pipe(
      map((launches) =>
        launches.filter((launch) => launch.flight_number === flightNumber),
      ),
      map((matchingLaunches) => {
        const matchingLaunch =
          matchingLaunches.find(
            (launch) =>
              (!missionName || launch.mission_name === missionName) &&
              (!launchYear || launch.launch_year === launchYear),
          ) ?? matchingLaunches[0];

        if (!matchingLaunch) {
          throw new Error('Mission not found');
        }

        return matchingLaunch;
      }),
    );
  }

  private mapLaunch(launch: SpaceXLaunchResponse): Mission {
    return {
      flight_number: launch.flight_number,
      mission_name: launch.mission_name,
      launch_year: launch.launch_year,
      details: launch.details,
      rocket_name: launch.rocket.rocket_name,
      rocket_type: launch.rocket.rocket_type,
      mission_patch_small: launch.links.mission_patch_small,
      article_link: launch.links.article_link,
      wikipedia: launch.links.wikipedia,
      video_link: launch.links.video_link,
    };
  }
}
