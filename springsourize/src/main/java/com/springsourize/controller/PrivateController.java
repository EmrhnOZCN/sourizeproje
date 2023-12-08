package com.springsourize.controller;


import com.springsourize.repository.UserRepository;
import com.springsourize.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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


    @PutMapping("/update/{userId}")
    public ResponseEntity<String> updateRole(@PathVariable Long userId) {
        try {
            userService.upgradeToPremium(userId);
            return ResponseEntity.ok("Rol güncelleme başarılı");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
