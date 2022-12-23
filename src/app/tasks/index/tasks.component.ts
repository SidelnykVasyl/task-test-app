import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task';
import { TasksService } from '../services/tasks.service';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  public tasks: Task[];
  public searchText: string;

  constructor(
    private tasksService: TasksService
  ) {}

  ngOnInit(): void {
    this.tasksService.getTasks()
      .subscribe((tasks) => {
        this.tasks = tasks;
        this.sortTasks(tasks);
        }
    );
  }

  public deleteTask(task: Task): void {
    this.tasksService.delete(task).subscribe(() => {
      this.tasks = this.tasks.filter((t) => t.id !== task.id);
    });
  }

  public addTask(task: Task): void {
    this.tasksService.add(task).subscribe((t) => this.tasks.push(t));
  }

  private sortTasks(tasks: Task[]): void {
    tasks.sort((a, b) => {

      if (a.done === false) {
        return 1;
      }
      if (b.done === false) {
        return -1;
      }

      const timeA = new Date(a.date.split('-').reverse().join('-')).getTime();
      const timeB = new Date(b.date.split('-').reverse().join('-')).getTime();

      return timeA - timeB;
    });
  }

}
