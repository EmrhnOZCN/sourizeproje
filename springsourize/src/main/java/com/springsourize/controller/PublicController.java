package com.springsourize.controller;

import com.springsourize.dto.AuthResponse;
import com.springsourize.dto.CreateUserRequest;
import com.springsourize.dto.LoginUserRequest;
import com.springsourize.dto.UserResponse;
import com.springsourize.model.UserEntity;

import com.springsourize.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/public")
@Slf4j
@CrossOrigin
public class PublicController {

    private UserService userService ;





    public PublicController(UserService userService) {
        this.userService = userService;


    }



    @PostMapping("/register")
    public ResponseEntity<UserEntity> register(@RequestBody CreateUserRequest createUserRequest){

        return ResponseEntity.ok(userService.createUser(createUserRequest));
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody LoginUserRequest loginUserRequest) {
        try {
            UserEntity user = userService.loginUser(loginUserRequest);

            AuthResponse authResponse = new AuthResponse();

            authResponse.setUserId(user.getId());
            authResponse.setFirstName(user.getFirstName());
            authResponse.setLastName(user.getLastName());
            return ResponseEntity.ok(authResponse);
        } catch (IllegalArgumentException e) {

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @GetMapping("/getUser/{userId}")
    public ResponseEntity<Object> getUserData(@PathVariable long userId) {
        Optional<UserEntity> user = userService.findUserNameById(userId);

        if (user.isPresent()) {
            UserResponse userResponse = new UserResponse();
            userResponse.setFirstName(user.get().getFirstName());
            userResponse.setLastName(user.get().getLastName());
            return ResponseEntity.ok(userResponse);
        } else {
            return ResponseEntity.notFound().build(); // User not found
        }
    }





}

