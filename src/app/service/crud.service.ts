import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../modal/task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
serviceUrl:string='';
  constructor(private  http:HttpClient) { 
    this.serviceUrl='http://localhost:3000/tasks'
  }


  // mtlb iss mein jo task likha hua hai wo 1 parameter hai mtlb jiss kaa naam kch bhi ho skta tha like a variable or jo : ky baad Task hai wo usi variable ka data type hona chahiye jo hum ny alag class mein define kia hua hai
  //Observable hum tb use krty hain RxJs mtlb Reactive JavaScript mtlb jb hamary function sy data asynchronously ana ho yaa callback functions istemal krny hon
  addTask(task:Task):Observable<Task>{
    return this.http.post<Task>(this.serviceUrl,task)
  }

  getAllTask():Observable<Task[]>{
    return this.http.get<Task[]>(this.serviceUrl)
  }

  deleteTask(task:Task):Observable<Task>{
    return this.http.delete<Task>(this.serviceUrl+'/'+task.id);
  }

  editTask(task:Task):Observable<Task>{
    return this.http.put<Task>(this.serviceUrl+'/'+task.id,task)
  }



}
