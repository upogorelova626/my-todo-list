import {Component, EventEmitter, Input, Output, inject} from '@angular/core';
import {TuiIcon, TuiButton} from '@taiga-ui/core';
import {ProfileService} from '../../profile.service';

type PageType = 'tasks' | 'settings';

@Component({
    selector: 'app-sidebar',
    imports: [TuiIcon, TuiButton],
    standalone: true,
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.less'
})
export class SidebarComponent {
    readonly profileService = inject(ProfileService);

    @Input() currentPage: PageType = 'tasks';
    @Output() pageChange = new EventEmitter<PageType>();

    openTasks(): void {
        this.pageChange.emit('tasks');
    }

    openSettings(): void {
        this.pageChange.emit('settings');
    }
}
