import {Component} from '@angular/core';
import {SidebarComponent} from './sidebar/sidebar.component';
import {HeaderComponent} from './header/header.component';
import {TaskBoardComponent} from './task-board/task-board.component';
import {TaskListComponent} from './task-list/task-list.component';

@Component({
    selector: 'app-main-page',
    imports: [
        SidebarComponent,
        TaskBoardComponent,
        HeaderComponent,
        TaskListComponent
    ],
    templateUrl: './main-page.component.html',
    styleUrl: './main-page.component.less'
})
export class MainPageComponent {}
