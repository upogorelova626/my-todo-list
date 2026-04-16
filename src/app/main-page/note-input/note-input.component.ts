import {Component, EventEmitter, Output, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {
    TuiTextfieldComponent,
    TuiIcon,
    TuiButton,
    TuiInputDirective
} from '@taiga-ui/core';

@Component({
    selector: 'app-note-input',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        TuiTextfieldComponent,
        TuiIcon,
        TuiButton,
        TuiInputDirective
    ],
    templateUrl: './note-input.component.html',
    styleUrl: './note-input.component.less'
})
export class NoteInputComponent {
    private readonly formBuilder = inject(FormBuilder);

    @Output() readonly addTodo = new EventEmitter<string>();

    readonly form = this.formBuilder.group({
        todo: ['', [Validators.required, Validators.minLength(2)]]
    });

    submit(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        const todoValue = this.form.controls.todo.value?.trim();

        if (!todoValue) {
            return;
        }

        this.addTodo.emit(todoValue);
        this.form.reset();
    }
}
