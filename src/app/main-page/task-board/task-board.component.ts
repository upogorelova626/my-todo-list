import {Component} from '@angular/core';
import {HeaderComponent} from '../header/header.component';
import {NoteInputComponent} from '../note-input/note-input.component';
import {TaskListComponent} from '../task-list/task-list.component';

@Component({
    selector: 'app-task-board',
    imports: [HeaderComponent, NoteInputComponent, TaskListComponent],
    templateUrl: './task-board.component.html',
    styleUrl: './task-board.component.less'
})
export class TaskBoardComponent {}
