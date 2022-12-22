import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewService {
  private showAddTask: boolean = false;
  private subject = new Subject<boolean>();
  constructor() { }

  public toggleAddTask(): void {
    this.showAddTask = !this.showAddTask;
    this.subject.next(this.showAddTask);
  }

  public onToggle(): Observable<boolean> {
    return this.subject.asObservable();
  }
}
