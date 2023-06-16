package com.tique.dev.rest.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/home")
public class HomeController {

    @GetMapping
    public String home(Authentication authentication){
        List<String> authorities = authentication.getAuthorities().stream().map(x -> x.getAuthority()).toList();
        Set<String> roles = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority).collect(Collectors.toSet());

        return "Hello, world " + authorities.toString() + " - " + roles.toString();
    }
}
