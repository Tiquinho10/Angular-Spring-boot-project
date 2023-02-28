import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Student } from 'src/Student';
import { AppService } from './app.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddUserComponent } from './components/form/form.component';
import { NotificationService } from './notification.service';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
 
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

























   // public onOpenModal(student : Student, mode : string): void {
    public onOpenModal() : void{
       //=============
       const modalBg = document.querySelector('.modal-bg')?.classList.add('bg-active');
       let close = document.querySelector('.close-btn');

        // roomType.value = y;
       //modalBtn.addEventListener('click', function(){
          //modalBg.classList.add('bg-active');

       //==========
         const container = document.querySelector('#main-container')
          const button = document.createElement('button');
          button.type = 'button';
          button.style.display = 'none';
          button.setAttribute('data-toggle', 'modal');

          // if(mode === 'add'){
          //   button.setAttribute('data-target', '#addStudentModal');
          // }

          // if(mode === 'edit'){
          //   button.setAttribute('data-target', '#editStudentModal');
          // }

          // if(mode === 'delete'){
          //   button.setAttribute('data-target', '#deleteStudentModal');
          // }

          container?.appendChild(button);
          button.click();
   }

}
