package com.tique.dev.rest.model;

import com.tique.dev.rest.repository.StudentRepository;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.Month;
import java.util.List;

@Component
public class StudentGenerator implements ApplicationRunner {

     private final StudentRepository studentRepository;

    public StudentGenerator(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }


    @Override
    public void run(ApplicationArguments args) throws Exception {
        if (studentRepository.Count() != 0)
                     return;

        Student s1 =   new Student(
                "luiz tique junior",
                "luiz@email.com",
                LocalDate.of(1990, Month.NOVEMBER, 23),
                "informatica",
                "M"
        );

        Student s2 =  new Student(
                "bernado paulo",
                "bernado@email.com",
                LocalDate.of(2000, Month.SEPTEMBER, 3),
                "economia",
                 "M");

        Student s3 =  new Student(
                "karina alexadre",
                "karina@email.com",
                LocalDate.of(2003, Month.NOVEMBER, 18),
                "psicologia",
                "M");

        Student s4 =  new Student(
                "Alicia Pedro",
                "alicia@gmail.com",
                LocalDate.of(2002, Month.APRIL, 16),
                "informatica",
                "F");

        Student s5 =  new Student(
                "jessica bruno",
                "jessica@gmail.com",
                LocalDate.of(1996, Month.AUGUST, 22),
                "economia",
                "F");

        Student s6 =  new Student(
                "diego brito",
                "diego@gmail.com",
                LocalDate.of(2000, Month.SEPTEMBER, 3),
                "economia",
                "M");

        Student s7 =  new Student(
                "joana sousa",
                "joana@gmail.com",
                LocalDate.of(2000, Month.SEPTEMBER, 3),
                "direito",
                "F");

        studentRepository.saveAll(
                List.of(s1, s2, s3, s4, s5, s6, s7)
        );
    }
}
