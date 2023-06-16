package com.tique.dev.rest.controller;

import com.tique.dev.rest.model.User;
import com.tique.dev.rest.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }


    @GetMapping
    public ResponseEntity<List<User>> getAll(){
        List<User> users = userService.getAll();

        return ResponseEntity.ok(users);
    }
}
