package com.tique.dev.rest.controller;

import java.net.URI;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tique.dev.rest.model.Student;
import com.tique.dev.rest.service.StudentService;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@RequestMapping("/student")
public class StudentController {
    

private final StudentService studentService;

   private static Logger logger = LoggerFactory.getLogger(StudentController.class);

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }


@GetMapping
public ResponseEntity<List<Student>>  getStudents(){
    List<Student> students = studentService.getStudents();
    return ResponseEntity.ok(students);
}

@GetMapping("/{id}")
public ResponseEntity<Student> getStudentById(@PathVariable Long id){
        Student student = studentService.getStudentById(id);

        return ResponseEntity.ok(student);
}

@PostMapping
public ResponseEntity<Student> insert(@RequestBody Student student){
   Student entity = studentService.addStudent(student);

    URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
            .buildAndExpand(entity.getId()).toUri();

    logger.info("insert student: " + student.toString());

  return ResponseEntity.created(uri).build();
}

@PutMapping("/{id}")
public ResponseEntity<Student> updateStudent(@PathVariable Long id, @RequestBody Student student){

       Student entity = studentService.updateStudent(id, student);

       return ResponseEntity.ok(entity);
}

@DeleteMapping("/{id}")
public ResponseEntity<Void> deleteStudent(@PathVariable Long id){
   studentService.delStudent(id);

   return ResponseEntity.noContent().build();
}
}
