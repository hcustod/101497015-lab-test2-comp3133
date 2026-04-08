import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { Mission } from '../models/mission';
import { SpacexapiService } from '../network/spacexapi.service';

@Component({
  selector: 'app-missionlist',
  standalone: false,
  templateUrl: './missionlist.html',
  styleUrl: './missionlist.css',
})

// MissionList component displaying list of missions
export class Missionlist implements OnInit {
  missions: Mission[] = [];
  isLoading = true;
  errorMessage = '';
  selectedYear = '';

  // SpacexapiService and ChangeDetectorRef
  constructor(
    private readonly spacexapiService: SpacexapiService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {}

  // On component init, load missions
  ngOnInit(): void {
    this.loadCurrentMissions();
  }

  // Load missions
  loadMissions(): void {
    this.selectedYear = '';
    this.loadCurrentMissions();
  }

  // Retry loading missions after error
  retryLoad(): void {
    this.loadCurrentMissions();
  }

  // Handle year selection from filter component
  onYearSelected(year: string): void {
    this.selectedYear = year;
    this.loadCurrentMissions();
  }

  // TrackBy func for mission list to optimize rendering
  trackByFlightNumber(_index: number, mission: Mission): number {
    return mission.flight_number;
  }

  // Load missions based on selected year or all if no year selected
  private loadCurrentMissions(): void {
    this.isLoading = true;
    this.errorMessage = '';

    const request$ = this.selectedYear
      ? this.spacexapiService.getLaunchesByYear(this.selectedYear)
      : this.spacexapiService.getAllLaunches();

    request$.subscribe({
      next: (missions) => {
        this.missions = missions;
        this.isLoading = false;
        this.changeDetectorRef.detectChanges();
      },
      error: () => {
        this.missions = [];
        this.errorMessage = this.selectedYear
          ? 'Unable to load SpaceX launches for the selected year.'
          : 'Unable to load SpaceX launches right now.';
        this.isLoading = false;
        this.changeDetectorRef.detectChanges();
      },
    });
  }
}
