import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AppService } from 'src/app/app.service';
import { Student } from 'src/Student';
import { NotificationService } from 'src/app/notification.service';


@Component({
  selector: 'app-form',
  templateUrl: './form.html',
  styleUrls: ['./form.component.css']
})
export class AddUserComponent implements OnInit {
  courses = [
    { value: 'economia'},
    { value: 'informatica'},
    {value: 'direito'},
    {value: 'psicologia'}
  ];
  
  


  constructor(public service : AppService,
     private dialogRef : MatDialogRef<AddUserComponent>,
    private notificationService : NotificationService) { }

  ngOnInit(): void {
  }

  onClear(){
     this.reset();
  }

   onSubmit(){
    console.log(this.service.form.value)
    if(this.service.form.valid){
        if (!this.service.form.get('id')?.value) {
          this.service.addStudent(this.service.form.value).subscribe(result => console.log(result))
          this.notificationService.success("Successfully inserted")
        
        } else {
           this.service.updateStudent(this.service.form.value).subscribe(result => console.log(result))
           this.notificationService.success("Successfully updated")
        }
        this.onExit()
    }
   }

   onEdit(student : Student){
     this.service.populateForm(student)
   }

  onExit(){
    this.reset()
    this.dialogRef.close();
  }

  reset(){
    this.service.form.reset();
    this.service.initializeFormGroup()
  }


}
