import {Component} from '@angular/core';
import {SidebarComponent} from './sidebar/sidebar.component';
import {HeaderComponent} from './header/header.component';
import {TaskListComponent} from './task-list/task-list.component';
import {SettingsComponent} from '../settings/settings.component';

type PageType = 'tasks' | 'settings';

@Component({
    selector: 'app-main-page',
    standalone: true,
    imports: [
        SidebarComponent,
        HeaderComponent,
        TaskListComponent,
        SettingsComponent
    ],
    templateUrl: './main-page.component.html',
    styleUrl: './main-page.component.less'
})
export class MainPageComponent {
    currentPage: PageType = 'tasks';

    setPage(page: PageType): void {
        this.currentPage = page;
    }
}
