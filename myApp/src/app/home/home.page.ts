import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FireauthserviceService } from '../fireauthservice.service';
import { FireserviceService } from '../fireservice.service';
import { Task } from '../tasks';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

@Injectable({
  providedIn: 'root'
})
export class HomePage {

  tasks: Array<any> = [];


  constructor(public fser: FireserviceService, private router: Router, private fauth: FireauthserviceService) {

    this.tasks = [
      {title: 'Milk', status: 'open'},
      {title: 'Eggs', status: 'open'},
      {title: 'Pancake Mix', status: 'open'}
      ];

  }

  addTask() {
    
    let ntask: string = prompt("New Task");
    if (ntask !== "") {
      let t: Task = { $key: '', title: ntask, status: 'open' };
      console.log(t);
      this.fser.createTask(t).then(resp => {
        console.log("createTask: then - " + resp);
      })
        .catch(error => {
          console.log("createTask: catch - " + error);
        });
      console.log("addTask: " + this.tasks);
    }
  }

  markAsDone(slidingItem, task) {
    task.status = (task.status === "done") ? "open" : "done";
    console.log("markAsDone " + task);
    this.fser.updateTask(task.$key, task);
    slidingItem.close();
  }

  removeTask(slidingItem, task) {
    task.status = "removed";
    this.fser.deleteTask(task.$key);
    slidingItem.close();
  }

  ngOnInit() {

    this.fser.getTasks().subscribe(data => {
      this.tasks = data.map(e => {
        return {
          $key: e.payload.doc.id,
          title: e.payload.doc.data()['title'],
          status: e.payload.doc.data()['status'],
        };
      });
      
    });
  }

  logout(){
    this.fauth.doLogout()
    .then(res => {
    this.router.navigate(["/login"]);
    }, err => {
    console.log(err);
    })
    }

}
