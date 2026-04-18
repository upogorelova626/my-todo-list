import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {
    TuiButton,
    TuiInputDirective,
    TuiTextfieldComponent
} from '@taiga-ui/core';

import {ProfileService} from '../profile.service';

@Component({
    selector: 'app-settings',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        TuiButton,
        TuiTextfieldComponent,
        TuiInputDirective
    ],
    templateUrl: './settings.component.html',
    styleUrl: './settings.component.less'
})
export class SettingsComponent implements OnInit {
    private readonly formBuilder = inject(FormBuilder);
    private readonly profileService = inject(ProfileService);

    readonly form = this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]]
    });

    ngOnInit(): void {
        const profile = this.profileService.getProfile();

        this.form.patchValue({
            name: profile.name,
            email: profile.email
        });
    }

    saveProfile(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        const currentProfile = this.profileService.getProfile();

        this.profileService.saveProfile({
            ...currentProfile,
            name: this.form.controls.name.value?.trim() || currentProfile.name,
            email:
                this.form.controls.email.value?.trim() || currentProfile.email
        });
    }

    resetProfile(): void {
        this.profileService.resetProfile();

        const profile = this.profileService.getProfile();

        this.form.patchValue({
            name: profile.name,
            email: profile.email
        });
    }
}
