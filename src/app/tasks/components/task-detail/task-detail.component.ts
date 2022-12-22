import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TasksService } from '../../services/tasks.service';
import { Task } from '../../models/task';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {
  public task: Task;
  constructor(
    private tasksService: TasksService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getTask();
  }

  private getTask(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.tasksService.getById(id).subscribe((task: Task) => {
      this.task = task;
    });

  }

}
