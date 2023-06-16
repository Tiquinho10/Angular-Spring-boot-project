
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Student } from 'src/Student';
import { AppService } from 'src/app/app.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddUserComponent } from 'src/app/components/form/form.component';
import { NotificationService } from 'src/app/notification.service';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table'
import { Observable } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  private students?: Student[];
  @ViewChild(MatPaginator, {static : true}) paginator! : MatPaginator;
  dataSource! : MatTableDataSource<any>;
 dataObs$! : Observable<any>;

 

  constructor(private appService : AppService,
   private dialog : MatDialog,
   private notificationService : NotificationService,
   private changeRef : ChangeDetectorRef){}

 ngOnInit(): void {
   this.getStudents();
   this.appService.Refreshrequired.subscribe(response => 
       this.getStudents()
      )
 }


 public defaultImg(student : Student) : string{
      let path = '';
       if(student.gender == 'F')
          path = 'assets/photos/user.png';
       else
          path = 'assets/photos/male-user.jpg';

     return path
 }

  public getStudents(): void {
     this.appService.getStudents().subscribe((students) => {
        this.students = students

       this.setPagination(students);
     })    
  }

  setPagination(list : any){
     this.dataSource = new MatTableDataSource<any>(list);
     this.dataSource.paginator = this.paginator;
     this.changeRef.detectChanges();
     this.dataObs$ = this.dataSource.connect();
   
  }

  public removeStudent(student : Student) {
    if(confirm('Are you sure?')){
     this.appService.deleteStudent(student.id).subscribe();
     this.students = this.students?.filter((s) => s.id !== student.id)
    this.notificationService.success("Successfully deleted")
   }

  }

  onCreate(){
       this.openDialog();
  }

  onEdit(student: Student){
   this.appService.populateForm(student);
   this.openDialog();


 }

 openDialog() : void{
   const dialogConfig = new MatDialogConfig();
   dialogConfig.disableClose = true;
   dialogConfig.autoFocus = true;
   dialogConfig.width = '60%';

  this.dialog.open(AddUserComponent, dialogConfig)
 }

}
