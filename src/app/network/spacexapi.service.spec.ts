import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { SpacexapiService } from './spacexapi.service';

describe('SpacexapiService', () => {
  let service: SpacexapiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(SpacexapiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should map SpaceX launch data into the Mission interface', () => {
    let result: unknown;

    service.getAllLaunches().subscribe((missions) => {
      result = missions;
    });

    const request = httpTestingController.expectOne(
      'https://api.spacexdata.com/v3/launches',
    );

    request.flush([
      {
        flight_number: 1,
        mission_name: 'FalconSat',
        launch_year: '2006',
        details: 'Test mission',
        rocket: {
          rocket_name: 'Falcon 1',
          rocket_type: 'Merlin A',
        },
        links: {
          mission_patch_small: 'patch.png',
          article_link: 'article',
          wikipedia: 'wiki',
          video_link: 'video',
        },
      },
    ]);

    expect(result).toEqual([
      {
        flight_number: 1,
        mission_name: 'FalconSat',
        launch_year: '2006',
        details: 'Test mission',
        rocket_name: 'Falcon 1',
        rocket_type: 'Merlin A',
        mission_patch_small: 'patch.png',
        article_link: 'article',
        wikipedia: 'wiki',
        video_link: 'video',
      },
    ]);
  });

  it('should resolve the correct mission when flight numbers are duplicated', () => {
    let result: unknown;

    service
      .getLaunchByFlightNumber(110, 'SXM-7', '2020')
      .subscribe((mission) => {
        result = mission;
      });

    const request = httpTestingController.expectOne(
      'https://api.spacexdata.com/v3/launches',
    );

    request.flush([
      {
        flight_number: 110,
        mission_name: 'CRS-21',
        launch_year: '2020',
        details: 'First duplicate',
        rocket: {
          rocket_name: 'Falcon 9',
          rocket_type: 'FT',
        },
        links: {
          mission_patch_small: null,
          article_link: null,
          wikipedia: null,
          video_link: null,
        },
      },
      {
        flight_number: 110,
        mission_name: 'SXM-7',
        launch_year: '2020',
        details: 'Second duplicate',
        rocket: {
          rocket_name: 'Falcon 9',
          rocket_type: 'FT',
        },
        links: {
          mission_patch_small: null,
          article_link: null,
          wikipedia: null,
          video_link: null,
        },
      },
    ]);

    expect(result).toEqual({
      flight_number: 110,
      mission_name: 'SXM-7',
      launch_year: '2020',
      details: 'Second duplicate',
      rocket_name: 'Falcon 9',
      rocket_type: 'FT',
      mission_patch_small: null,
      article_link: null,
      wikipedia: null,
      video_link: null,
    });
  });
});
