import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditTaskComponent } from './components/edit-task/edit-task.component';
import { TasksComponent } from './index/tasks.component';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';

const routes: Routes = [
  {
    path: '',
    component: TasksComponent,
  },
  {
    path: ':id', component: TaskDetailComponent
  },
  {
    path: ':id/edit', component: EditTaskComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
