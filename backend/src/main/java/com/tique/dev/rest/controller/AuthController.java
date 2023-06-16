package com.tique.dev.rest.controller;

import com.tique.dev.rest.model.dto.Login;
import com.tique.dev.rest.service.TokenService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
public class AuthController {
      private static final Logger log = LoggerFactory.getLogger(AuthController.class);

    private  final AuthenticationManager authenticationManager;
    private final TokenService tokenService;

    public AuthController(AuthenticationManager authenticationManager, TokenService tokenService) {
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
    }


    @PostMapping("/token")
    public String login(@RequestBody Login login){
        log.info("cheguei");

        log.info(login.username() + " _ " + login.password());

        Authentication authenticate = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(login.username(),
                        login.password())
        );

        log.info(tokenService.generateToken(authenticate));
        return tokenService.generateToken(authenticate);
    }
}
