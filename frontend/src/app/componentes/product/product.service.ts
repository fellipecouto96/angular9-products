import { Injectable } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpClient } from "@angular/common/http";
import {Product} from "./product.model";
import {EMPTY, Observable} from "rxjs";
import {catchError} from "rxjs/operators";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = "http://localhost:3001/products"

  constructor(private snakBar: MatSnackBar,
              private httpCliente: HttpClient) { }

  showMessage(msg: string, isError: boolean = false): void{
    this.snakBar.open(msg,'X',{
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-sucess']
    })
  }

  create(product: Product): Observable<Product>{
    return this.httpCliente.post<Product>(this.baseUrl, product).pipe(
        map((obj) => obj),
        catchError((e) => this.errorHandler(e))
    )
  }

  errorHandler(e: any): Observable<any>{
    console.log(e)
    this.showMessage('Ocorreu um erro inesperado!', true)
    return EMPTY
  }

  read(): Observable<Product[]>{
    return this.httpCliente.get<Product[]>(this.baseUrl).pipe(
        map((obj) => obj),
        catchError((e) => this.errorHandler(e))
    )
  }

  readById(id: string | null) : Observable<Product> {
    const url = `${this.baseUrl}/${id}`
    return this.httpCliente.get<Product>(url).pipe(
        map((obj) => obj),
        catchError((e) => this.errorHandler(e))
    )
  }

  update(product : Product) : Observable<Product>{
    const url = `${this.baseUrl}/${product.id}`
    return this.httpCliente.put<Product>(url, product).pipe(
        map((obj) => obj),
        catchError((e) => this.errorHandler(e))
    )
  }

  delete(id: number | undefined) : Observable<Product>{
    const url = `${this.baseUrl}/${id}`
    return this.httpCliente.delete<Product>(url).pipe(
        map((obj) => obj),
        catchError((e) => this.errorHandler(e))
    )
  }
}
