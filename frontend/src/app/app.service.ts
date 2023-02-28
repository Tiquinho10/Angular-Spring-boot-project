import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Student } from 'src/Student';
import { FormGroup, FormControl , Validators} from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class AppService {
   private apiUrl = environment.apiBaseUrl;
   form : FormGroup = new FormGroup({
    id : new FormControl(null),
    name : new FormControl('', [Validators.required, Validators.minLength(3)]),
    email : new FormControl('', Validators.email),
    dob : new FormControl(''),
    course : new FormControl(''),
    gender : new FormControl('M')
  });

  initializeFormGroup() : void{
    this.form.setValue({
      id : null,
      name : '',
      email : '',
      dob : '',
      course : '',
      gender : 'M'
    })
  }

  populateForm(student : Student) : void{
    console.log('ya ' ,student)
    this.form.setValue({
       id : student.id,
      name : student.name,
      email : student.email,
      dob : student.dob,
      course : student.course,
      gender : student.gender
      
    })
  }



  constructor(private http : HttpClient) { }

 

  private _refreshrequired = new Subject<void>;

  get Refreshrequired(){
    return this._refreshrequired;
  }


  public getStudents() : Observable<Student[]> {
     return this.http.get<Student[]>(`${this.apiUrl}/student`)
  }

  public addStudent(student : Student) : Observable<Student> {
    return this.http.post<Student>(`${this.apiUrl}/student`, student ).pipe(
      tap(
        ()=> this.Refreshrequired.next()
      )
    )
 }

 public updateStudent(student : Student) : Observable<Student> {
  return this.http.put<Student>(`${this.apiUrl}/student/${student.id}`, student ).pipe(
    tap(() => this.Refreshrequired.next())
  )
}

public deleteStudent(studentId : number)  {
  return this.http.delete<Student>(`${this.apiUrl}/student/${studentId}`).pipe(
    tap(() => this.Refreshrequired.next())
  )
}

}
