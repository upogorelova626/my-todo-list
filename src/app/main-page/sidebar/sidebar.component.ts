import {Component} from '@angular/core';
import {TuiIcon, TuiButton} from '@taiga-ui/core';

@Component({
    selector: 'app-sidebar',
    imports: [TuiIcon, TuiButton],
    standalone: true,
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.less'
})
export class SidebarComponent {}
