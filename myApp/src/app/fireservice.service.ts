import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { Task } from './tasks';
import { Clothes } from './clothes';
import firebase from 'firebase/compat/app';
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";



@Injectable({
  providedIn: 'root'
})
export class FireserviceService {

  private snapshotChangesSubscription: any;

 constructor( public af:AngularFirestore,) {}


 createUser( m: string,name:string,p:string){
  console.log("user criado");
  let currentUser = firebase.auth().currentUser;
  const user={
    email: m,
    name:name,
    photo:p
  };
  return this.af.collection('user').doc(currentUser.uid).set(user); 
 }


 getUserInfo(){
  let currentUser = firebase.auth().currentUser;
  return this.af.collection("user").doc(currentUser.uid).snapshotChanges();
 }


 addUserFavorite(prodId:any){
  let currentUser = firebase.auth().currentUser;
  return this.af.collection('user').doc(currentUser.uid).update({
    favorites : arrayUnion(prodId)
  })
 }

 removeUserFavorite(prodId:any){
  let currentUser = firebase.auth().currentUser;
  return this.af.collection('user').doc(currentUser.uid).update({
    favorites : arrayRemove(prodId)
  })
 }

 addUserFavoriteCloth(prodId:any){
  let currentUser = firebase.auth().currentUser;
  return this.af.collection('clothes').doc(prodId).update({
    favorites : arrayUnion(currentUser.uid)
  })
 }

 removeUserFavoriteCloth(prodId:any){
  let currentUser = firebase.auth().currentUser;
  return this.af.collection('clothes').doc(prodId).update({
    favorites : arrayRemove(currentUser.uid)
  })
 }



getCloatsByCategory(cat:string){
  /*this.af.collection("clothes",ref=>ref.where("category","==",cat))
  .snapshotChanges().subscribe(data=>data.forEach(el=>console.log(el.payload.doc.id)));*/
  return this.af.collection("clothes",ref=>ref.where("category","==",cat)).snapshotChanges();
}
getCloath(id:string){
  return this.af.collection("clothes").doc(id).snapshotChanges();
}

getCloathsById(userIds:any){
  return this.af.collection("clothes",ref=>ref.where(firebase.firestore.FieldPath.documentId(),"in",userIds)).snapshotChanges();
}

getUsersById(userIds:any){
  return this.af.collection("user",ref=>ref.where(firebase.firestore.FieldPath.documentId(),"in",userIds)).snapshotChanges();
}

 getTasks () { 
  let currentUser = firebase.auth().currentUser; 
  return this.af.collection('people').doc(currentUser.uid).collection('tasks').snapshotChanges(); 
}

   getCloathsOrderPrice () { 
    
    return this.af.collection("clothes",ref=>ref.orderBy("price")).snapshotChanges();
  }


  getUserId(){
    let currentUser = firebase.auth().currentUser; 
    return currentUser.uid;
  }

  createProduct(c:Clothes){
    return this.af.collection('clothes').add(c); 
  }

updateBitter(clothId:any, map:any){
  return this.af.collection('clothes').doc(clothId).update({
    bitters : arrayUnion(map),
    price : map.price,
    numberBids :  firebase.firestore.FieldValue.increment(1)
  })
}

updateUserToken(token:string){
  let currentUser = firebase.auth().currentUser; 
  console.log("curent user: "+currentUser.uid)
  return this.af.collection('user').doc(currentUser.uid).update({
    token : token,
  })

}




createTask(t:Task) { 
  let currentUser = firebase.auth().currentUser; 
  return this.af.collection('people').doc(currentUser.uid).collection('tasks').add(t); 
}

updateTask(TaskID:any,t:Task){ 
  let currentUser = firebase.auth().currentUser; 
  
  this.af.collection('people').doc(currentUser.uid).collection('tasks').doc(TaskID).set(t); 
  //this.af.doc('tasks/' + TaskID).update(t); 
}

deleteTask(TaskID:any) { 
  let currentUser = firebase.auth().currentUser; 
  this.af.collection('people').doc(currentUser.uid).collection('tasks').doc(TaskID).delete(); 
  //this.af.doc('tasks/' + TaskID).delete(); 
}
unsubscribeOnLogOut(){ 
  //remember to unsubscribe from the snapshotChanges
  //firebase.auth().unsubscribe(); 
  //this.snapshotChangesSubscription.unsubscribe();

  const unsubscribe = firebase.auth().onAuthStateChanged(user => {
    unsubscribe();
  });

}
}
