import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { Mission } from '../models/mission';
import { SpacexapiService } from '../network/spacexapi.service';

@Component({
  selector: 'app-missionlist',
  standalone: false,
  templateUrl: './missionlist.html',
  styleUrl: './missionlist.css',
})
export class Missionlist implements OnInit {
  missions: Mission[] = [];
  isLoading = true;
  errorMessage = '';
  selectedYear = '';

  constructor(
    private readonly spacexapiService: SpacexapiService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadCurrentMissions();
  }

  loadMissions(): void {
    this.selectedYear = '';
    this.loadCurrentMissions();
  }

  retryLoad(): void {
    this.loadCurrentMissions();
  }

  onYearSelected(year: string): void {
    this.selectedYear = year;
    this.loadCurrentMissions();
  }

  trackByFlightNumber(_index: number, mission: Mission): number {
    return mission.flight_number;
  }

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
