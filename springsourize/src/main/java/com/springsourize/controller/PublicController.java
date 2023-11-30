package com.springsourize.controller;

import com.springsourize.dto.CreateUserRequest;
import com.springsourize.dto.LoginUserRequest;
import com.springsourize.model.UserEntity;
import com.springsourize.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/public")
public class PublicController {

    private UserService userService ;


    public PublicController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public String getUserPublic() {
        return "hello";
    }

    @PostMapping("/register")
    public ResponseEntity<UserEntity> register(@RequestBody CreateUserRequest createUserRequest){

        return ResponseEntity.ok(userService.createUser(createUserRequest));
    }

    @PostMapping("/login")
    public ResponseEntity<UserEntity> login(@RequestBody LoginUserRequest loginUserRequest){


        return ResponseEntity.ok(userService.loginUser(loginUserRequest));

    }

}

