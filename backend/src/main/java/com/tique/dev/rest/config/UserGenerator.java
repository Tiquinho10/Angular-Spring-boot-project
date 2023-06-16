package com.tique.dev.rest.config;

import com.tique.dev.rest.model.Roles;
import com.tique.dev.rest.model.User;
import com.tique.dev.rest.repository.UserRepository;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Component
public class UserGenerator implements ApplicationRunner {

    private final UserRepository repository;

    private final PasswordEncoder passwordEncoder;

    public UserGenerator(UserRepository repository, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        Set<Roles> roles = new HashSet<>();
        roles.add(Roles.ROLE_ADMIN);
        roles.add(Roles.ROLE_USER);
         if (repository.count() == 0){
             var admin = new User(
                     "tiquinho10",
                     passwordEncoder.encode( "123456"),
                     Set.of(Roles.ROLE_ADMIN)

             );

             var user = new User(
                     "cristina",
                     passwordEncoder.encode( "123456"),
                     Set.of(Roles.ROLE_USER)
             );

             repository.saveAll(List.of(admin, user));
         }
    }
}
