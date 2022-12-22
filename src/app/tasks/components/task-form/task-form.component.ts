import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Subscription } from 'rxjs';
import { Task } from '../../models/task';
import { TasksService } from '../../services/tasks.service';
import { ViewService } from '../../services/view.service';
import { v4 as uuidv4 } from 'uuid';
import { mergeMap, switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  @Input() showAddTask: boolean;
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();

  public form: FormGroup;
  public task: Task;
  public currentAction: string;
  public isEditMode: boolean;

  private subscription: Subscription;
  constructor(
    private formBuilder: FormBuilder,
    private viewService: ViewService,
    private tasksService: TasksService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.setCurrentAction();
    this.initForm();
    this.toggle();
    this.loadTask();
  }

  private toggle(): void {
    this.subscription = this.viewService.onToggle()
      .subscribe((show) => this.showAddTask = show);
  }

  public submitForm(): void {
    if (this.isEditMode) {
      this.editTask();
    } else {
      this.createTask();
      this.clearForm();
    }
  }

  private createTask(): void {
    const task = {
      ...this.form.value,
      id: uuidv4(),
      done: false
    };
    this.onAddTask.emit(task);
  }

  private editTask(): void {
    const editedTask = {
      ...this.form.value,
      done: this.mapDate(this.done)
    };

    combineLatest([
      this.tasksService.update(editedTask).pipe(take(1)),
      this.tasksService.getTasks().pipe(take(1))
    ]).subscribe(([task, tasks]) => {
      const updatedTasks = tasks.map((el) => el.id === task.id ? {...task} : el);
      this.tasksService.setTasks(updatedTasks);
      this.router.navigate(['./']);
    });

  }

  private loadTask(): void {
    if (this.isEditMode) {
      this.route.paramMap
        .pipe(
          switchMap((params) =>  this.tasksService.getById(params.get('id'))
          )
        )
        .subscribe(
          (task) => {
            this.task = task;
            this.form.patchValue({
              ...this.task,
              done: this.mapDate(this.task.done)
            });
          }
        );
    }
  }

  private mapDate(date: string | boolean): string | boolean {
    return date ? (date as string).split('-').reverse().join('-') : date;
  }

  private clearForm(): void {
    this.form.reset();
  }

  private setCurrentAction() {
    this.isEditMode = !!this.route.snapshot?.url[0]?.path;
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      id: [''],
      category: ['', Validators.required],
      description: ['', Validators.required],
      label: ['', Validators.required],
      done: ['']
    });
  }

  get done() {
    return this.form.get('done').value;
  }

}
