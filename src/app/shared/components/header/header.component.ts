import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ViewService } from '../../../tasks/services/view.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy{

  private subscription: Subscription;
  public showAddTask: boolean;

  constructor(
    private viewService: ViewService
    ) {}

  ngOnInit(): void {
    this.toggle();
  }

  public toggleAddTask(): void {
    this.viewService.toggleAddTask();
  }

  private toggle(): void {
    this.subscription = this.viewService.onToggle()
    .subscribe((show) => this.showAddTask = show);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
