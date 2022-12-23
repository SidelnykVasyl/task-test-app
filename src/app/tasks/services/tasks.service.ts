import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  url = 'http://localhost:3000/tasks';

  private tasks$: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);

  constructor(private http: HttpClient) {
    this.get().pipe(take(1))
      .subscribe((tasks) => this.tasks$.next(tasks));
  }

  getTasks(): Observable<Task[]> {
    return this.tasks$.asObservable();
  }

  setTasks(data: Task[]): void {
    this.tasks$.next(data);
  }

  get(): Observable<Task[]> {
    return this.http.get<Task[]>(this.url);
  }

  getById(id: number | string): Observable<Task> {
    const url = `${this.url}/${id}`;
    return this.http.get<Task>(url);
  }

  delete(task: Task): Observable<Task> {
    const url = `${this.url}/${task.id}`;
    return this.http.delete<Task>(url);
  }

  add(task: Task): Observable<Task> {
    return this.http.post<Task>(this.url, task);
  }

  update(task: Task): Observable<Task> {
    const url = `${this.url}/${task.id}`;
    return this.http.patch<Task>(url, task);
  }
}
