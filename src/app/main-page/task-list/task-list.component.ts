import {Component, inject, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CdkDrag, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import {TuiButton} from '@taiga-ui/core';

import {TodoService} from '../../todo.service';
import {Todo} from '../interface';
import {NoPagesComponent} from '../no-pages/no-pages.component';
import {NoteInputComponent} from '../note-input/note-input.component';

type FilterType = 'all' | 'active' | 'completed';

@Component({
    selector: 'app-task-list',
    standalone: true,
    imports: [
        FormsModule,
        TuiButton,
        NoPagesComponent,
        NoteInputComponent,
        CdkDropList,
        CdkDrag
    ],
    templateUrl: './task-list.component.html',
    styleUrl: './task-list.component.less'
})
export class TaskListComponent implements OnInit {
    private readonly todoService = inject(TodoService);
    private readonly storageKey = 'todos';

    todos: Todo[] = [];
    editingTodoId: number | null = null;
    editingTodoValue = '';

    filter: FilterType = 'all';
    searchTerm = '';

    currentPage = 1;
    itemsPerPage = 5;

    ngOnInit(): void {
        this.loadTodos();
    }

    get filteredTodos(): Todo[] {
        let filtered = this.todos;

        switch (this.filter) {
            case 'active':
                filtered = filtered.filter(todo => !todo.completed);
                break;
            case 'completed':
                filtered = filtered.filter(todo => todo.completed);
                break;
        }

        const normalizedSearch = this.searchTerm.trim().toLowerCase();

        if (!normalizedSearch) {
            return filtered;
        }

        return filtered.filter(todo =>
            todo.todo.toLowerCase().includes(normalizedSearch)
        );
    }

    get totalPages(): number {
        return Math.ceil(this.filteredTodos.length / this.itemsPerPage) || 1;
    }

    get paginatedTodos(): Todo[] {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;

        return this.filteredTodos.slice(startIndex, endIndex);
    }

    get pages(): number[] {
        return Array.from({length: this.totalPages}, (_, index) => index + 1);
    }

    get activeTodosCount(): number {
        return this.todos.filter(todo => !todo.completed).length;
    }

    get hasCompletedTodos(): boolean {
        return this.todos.some(todo => todo.completed);
    }

    setFilter(filter: FilterType): void {
        this.filter = filter;
        this.currentPage = 1;
    }

    onSearch(value: string): void {
        this.searchTerm = value;
        this.currentPage = 1;
    }

    goToPage(page: number): void {
        if (page < 1 || page > this.totalPages) {
            return;
        }

        this.currentPage = page;
    }

    nextPage(): void {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
        }
    }

    prevPage(): void {
        if (this.currentPage > 1) {
            this.currentPage--;
        }
    }

    syncCurrentPage(): void {
        if (this.currentPage > this.totalPages) {
            this.currentPage = this.totalPages;
        }

        if (this.currentPage < 1) {
            this.currentPage = 1;
        }
    }

    loadTodos(): void {
        const storedTodos = this.getTodosFromStorage();

        if (storedTodos.length) {
            this.todos = storedTodos;
            return;
        }

        this.todoService.getAllTodos().subscribe({
            next: response => {
                this.todos = response.todos;
                this.saveTodosToStorage();
            },
            error: error => {
                console.log('Ошибка при загрузке задач', error);
            }
        });
    }

    addTodo(todoValue: string): void {
        const newTodo: Todo = {
            id: Date.now(),
            todo: todoValue,
            completed: false,
            userId: 1
        };

        this.todos = [newTodo, ...this.todos];
        this.currentPage = 1;
        this.saveTodosToStorage();
    }

    deleteTodo(id: number): void {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.syncCurrentPage();
        this.saveTodosToStorage();
    }

    toggleTodo(id: number): void {
        this.todos = this.todos.map(todo =>
            todo.id === id ? {...todo, completed: !todo.completed} : todo
        );

        this.saveTodosToStorage();
    }

    startEdit(todo: Todo): void {
        this.editingTodoId = todo.id;
        this.editingTodoValue = todo.todo;
    }

    saveEdit(todo: Todo): void {
        const trimmedValue = this.editingTodoValue.trim();

        if (!trimmedValue) {
            this.cancelEdit();
            return;
        }

        this.todos = this.todos.map(item =>
            item.id === todo.id ? {...item, todo: trimmedValue} : item
        );

        this.saveTodosToStorage();
        this.cancelEdit();
    }

    cancelEdit(): void {
        this.editingTodoId = null;
        this.editingTodoValue = '';
    }

    clearCompleted(): void {
        this.todos = this.todos.filter(todo => !todo.completed);
        this.syncCurrentPage();
        this.saveTodosToStorage();
    }

    drop(event: {previousIndex: number; currentIndex: number}): void {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const previousIndex = startIndex + event.previousIndex;
        const currentIndex = startIndex + event.currentIndex;

        moveItemInArray(this.todos, previousIndex, currentIndex);
        this.saveTodosToStorage();
    }

    saveTodosToStorage(): void {
        localStorage.setItem(this.storageKey, JSON.stringify(this.todos));
    }

    getTodosFromStorage(): Todo[] {
        const storedTodos = localStorage.getItem(this.storageKey);

        if (!storedTodos) {
            return [];
        }

        try {
            return JSON.parse(storedTodos) as Todo[];
        } catch {
            return [];
        }
    }
}
