package com.springsourize.controller;


import com.springsourize.repository.UserRepository;
import com.springsourize.service.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/private")
public class PrivateController {


    private UserService userService;
    private UserRepository userRepository;


    public PrivateController(UserService userService, UserRepository userRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
    }

    @GetMapping
    public String getUserPrivate(){
        return "hello private";
    }
}
