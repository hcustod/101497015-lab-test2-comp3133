import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';

import { Mission } from '../models/mission';
import { SpacexapiService } from '../network/spacexapi.service';

@Component({
  selector: 'app-missiondetails',
  standalone: false,
  templateUrl: './missiondetails.html',
  styleUrl: './missiondetails.css',
})
export class Missiondetails implements OnInit {
  mission: Mission | null = null;
  isLoading = true;
  errorMessage = '';
  private currentFlightNumber: number | null = null;
  private currentMissionName: string | null = null;
  private currentLaunchYear: string | null = null;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly spacexapiService: SpacexapiService,
    private readonly location: Location,
    private readonly router: Router,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.activatedRoute.paramMap,
      this.activatedRoute.queryParamMap,
    ]).subscribe(([params, queryParams]) => {
      const flightNumber = Number(params.get('flightNumber'));
      this.currentMissionName = queryParams.get('missionName');
      this.currentLaunchYear = queryParams.get('launchYear');

      if (!flightNumber) {
        this.errorMessage = 'Invalid flight number.';
        this.isLoading = false;
        this.changeDetectorRef.detectChanges();
        return;
      }

      this.currentFlightNumber = flightNumber;
      this.loadMissionDetails(flightNumber);
    });
  }

  goBack(): void {
    if (window.history.length > 1) {
      this.location.back();
      return;
    }

    void this.router.navigate(['/missions']);
  }

  retryLoad(): void {
    if (this.currentFlightNumber) {
      this.loadMissionDetails(this.currentFlightNumber);
    }
  }

  private loadMissionDetails(flightNumber: number): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.mission = null;

    this.spacexapiService
      .getLaunchByFlightNumber(
        flightNumber,
        this.currentMissionName,
        this.currentLaunchYear,
      )
      .subscribe({
        next: (mission) => {
          this.mission = mission;
          this.isLoading = false;
          this.changeDetectorRef.detectChanges();
        },
        error: () => {
          this.mission = null;
          this.errorMessage = 'Unable to load mission details right now.';
          this.isLoading = false;
          this.changeDetectorRef.detectChanges();
        },
      });
  }
}
