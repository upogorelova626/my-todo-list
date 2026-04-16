import {Component} from '@angular/core';
import {TuiRoot} from '@taiga-ui/core';
import {MainPageComponent} from './main-page/main-page.component';

@Component({
    selector: 'app-root',
    imports: [TuiRoot, MainPageComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.less'
})
export class AppComponent {}
