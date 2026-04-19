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
    readonly profileService = inject(ProfileService);

    isDragOver = false;

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

    onDragOver(event: DragEvent): void {
        event.preventDefault();
        this.isDragOver = true;
    }

    onDragLeave(event: DragEvent): void {
        event.preventDefault();
        this.isDragOver = false;
    }

    onDrop(event: DragEvent): void {
        event.preventDefault();
        this.isDragOver = false;

        const file = event.dataTransfer?.files?.[0];

        if (!file) {
            return;
        }

        this.handleAvatarFile(file);
    }

    onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];

        if (!file) {
            return;
        }

        this.handleAvatarFile(file);
        input.value = '';
    }

    private handleAvatarFile(file: File): void {
        if (!file.type.startsWith('image/')) {
            return;
        }

        const reader = new FileReader();

        reader.onload = () => {
            const avatar = reader.result as string;
            const currentProfile = this.profileService.getProfile();

            this.profileService.saveProfile({
                ...currentProfile,
                avatar
            });
        };

        reader.readAsDataURL(file);
    }
}
