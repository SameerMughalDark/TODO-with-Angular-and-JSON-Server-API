import { Component } from '@angular/core';
import { CrudService } from '../../service/crud.service';
import { Task } from '../../modal/task';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent {

// Task class ko use krny ky liye us ka 1 object banayen gy jiss ka 
  taskObj:Task=new Task;
// getAPI sy any waly data ko 1 array mein store krwayen gy jiss mein variables ky types hamari Task class wala ho ga iss liye us ko type mei ny Task hi dy dia 
taskArr:Task[]= [];

// variable bana rhaa hoo taky iss mein textfield ka data store krwa sakooo
addTaskValue:string='';
// variable bana rhaa hoo taky iss mein textfield ka edit ky liye data store krwa sakooo
editTaskValue:string='';
//varaiable bana raha hooo taaky edit wali inputs ko hide or show krwa sakoo iss variabel ki base py
editDataInputsHide:boolean=true;





  // isi constructor mein hum apni serviec wali classs pass krien gy taaky us ky functions yahan py use kr sakien
  constructor(private crudService:CrudService){

  }


  getAllTasks() {
    this.crudService.getAllTask().subscribe((res)=>{
        this.taskArr=res;
    },(err)=>{
      alert("Error"+err)
    })
  }

  ngOnInit(): void {
    this.editTaskValue='';
    this.taskObj=new Task();
    this.taskArr=[];
    this.getAllTasks();
    
  }

  // ab 1 functtionbana raha hoo jissss ko mei add button py lagaoo gaa or us ky ander mei apny crudservices ka post  wala func call krooga

  addTask(){
    this.taskObj.task_name=this.addTaskValue
    this.crudService.addTask(this.taskObj).subscribe((res)=>{
        this.ngOnInit();
        this.addTaskValue='';
    },(err)=>{
      alert("Error"+ err);
    })
  }


  editDataFieldShow(eTarget:Task) {
    // this varaibel hide my input show my edit input fields 
  this.editDataInputsHide=false;  
  // the below code is use for update my values
  this.taskObj=eTarget;
  this.editTaskValue=this.taskObj.task_name;
  
  
  }
  editDataFieldHide(){
    this.editDataInputsHide=true;  
  
  }
  
  editTask(){
    this.taskObj.task_name=this.editTaskValue;
    this.crudService.editTask(this.taskObj).subscribe((res)=>{
      this.ngOnInit();
      this.editDataFieldHide();
    },(err)=>{
      alert("Error"+err)

    })
  }



  deleteTask(etask:Task){
    this.crudService.deleteTask(etask).subscribe((res)=>{
      this.ngOnInit();
    },(error)=>{
      alert("Error"+error)
    })
  }


}
