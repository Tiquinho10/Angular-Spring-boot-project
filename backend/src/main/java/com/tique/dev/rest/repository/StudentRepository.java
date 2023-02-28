package com.tique.dev.rest.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.tique.dev.rest.model.Student;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long>{
    @Query("select count(s) from Student s")
    long Count();
    @Query(" select p from Student p where p.email = ?1")
    Optional<Student> findStudentByEmail(String email);

}
