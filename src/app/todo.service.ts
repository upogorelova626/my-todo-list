import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {TodosResponse} from './main-page/interface';

@Injectable({
    providedIn: 'root'
})
export class TodoService {
    http = inject(HttpClient);
    apiUrl = 'https://dummyjson.com/todos';

    getAllTodos() {
        return this.http.get<TodosResponse>(this.apiUrl);
    }

    // addNewTodo() {
    //     return this.http.post<TodosResponse>(this.apiUrl);
    // }
}
