import { Injectable } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpClient } from "@angular/common/http";
import {Product} from "./product.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = "http://localhost:3001/products"

  constructor(private snakBar: MatSnackBar,
              private httpCliente: HttpClient) { }

  showMessage(msg: string): void{
    this.snakBar.open(msg,'X',{
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }

  create(product: Product): Observable<Product>{
    return this.httpCliente.post<Product>(this.baseUrl, product)
  }

  read(): Observable<Product[]>{
    return this.httpCliente.get<Product[]>(this.baseUrl)
  }

  readById(id: string | null) : Observable<Product> {
    const url = `${this.baseUrl}/${id}`
    return this.httpCliente.get<Product>(url)
  }

  update(product : Product) : Observable<Product>{
    const url = `${this.baseUrl}/${product.id}`
    return this.httpCliente.put<Product>(url, product)
  }

  delete(id: number | undefined) : Observable<Product>{
    const url = `${this.baseUrl}/${id}`
    return this.httpCliente.delete<Product>(url)
  }
}
