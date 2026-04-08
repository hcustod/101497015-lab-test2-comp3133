import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-missionfilter',
  standalone: false,
  templateUrl: './missionfilter.html',
  styleUrl: './missionfilter.css',
})

// MissionFilter component for selecting launch year
export class Missionfilter implements OnInit {
  @Output() yearSelected = new EventEmitter<string>();

  // Form control
  readonly launchYearControl = new FormControl('');
  readonly launchYears: string[] = this.buildLaunchYears();

  // On component init subscribe to form control changes
  ngOnInit(): void {
    this.launchYearControl.valueChanges.subscribe((year) => {
      this.yearSelected.emit(year ?? '');
    });
  }

  // Reset filter selection
  resetFilter(): void {
    this.launchYearControl.setValue('');
  }

  // Build list
  private buildLaunchYears(): string[] {
    const currentYear = new Date().getFullYear();
    const years: string[] = [];

    for (let year = currentYear; year >= 2006; year -= 1) {
      years.push(String(year));
    }

    return years;
  }
}
