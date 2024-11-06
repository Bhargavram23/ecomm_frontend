import { Component, OnInit } from '@angular/core';
import { DashboardService, DashboardData } from '../services/dashboard.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CurrencyPipe, CommonModule, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dashboardData: DashboardData | undefined;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.getDashboardData().subscribe(data => {
      this.dashboardData = data;
    });
  }
}
