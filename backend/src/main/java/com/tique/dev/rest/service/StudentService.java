package com.tique.dev.rest.service;

import java.util.List;
import java.util.Optional;

import com.tique.dev.rest.model.Student;
import com.tique.dev.rest.repository.StudentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class StudentService {
    

    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @Transactional(readOnly = true)
    public List<Student> getStudents(){
        return studentRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Student getStudentById(Long id){
        return checkUser(id);
    }

    @Transactional
    public Student addStudent(Student student){
        checkEmail(student.getEmail());

        studentRepository.save(student);

        return student;
    }

    @Transactional
    public Student updateStudent(Long id, Student student){
      Student entity = checkUser(id);

      entity.setName(student.getName());
      entity.setEmail(student.getEmail());
      entity.setDob(student.getDob());
      entity.setCourse(student.getCourse());
      entity.setGender(student.getGender());

return entity;
   
     
    }

    public void delStudent(Long id){
        checkUser(id);
        studentRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public Student checkUser(Long id){

        return studentRepository.findById(id)
                .orElseThrow(() ->
                    new IllegalArgumentException("Student with id: " + id + " doesn't exists")
                );
    }

    @Transactional(readOnly = true)
    public void checkEmail(String email){
        Optional<Student> studentOptional =
        studentRepository.findStudentByEmail(email);

  if(studentOptional.isPresent()){
     throw new IllegalStateException("email already taken!");
  }  
    }
}
