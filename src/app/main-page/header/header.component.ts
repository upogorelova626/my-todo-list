import {Component, OnInit} from '@angular/core';
import {TuiIcon} from '@taiga-ui/core';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [TuiIcon],
    templateUrl: './header.component.html',
    styleUrl: './header.component.less'
})
export class HeaderComponent implements OnInit {
    isLightTheme = false;

    ngOnInit(): void {
        const savedTheme = localStorage.getItem('theme');

        if (savedTheme === 'light') {
            this.isLightTheme = true;
            document.body.classList.add('light-theme');
        }
    }

    toggleTheme(): void {
        this.isLightTheme = !this.isLightTheme;

        if (this.isLightTheme) {
            document.body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.classList.remove('light-theme');
            localStorage.setItem('theme', 'dark');
        }
    }
}
