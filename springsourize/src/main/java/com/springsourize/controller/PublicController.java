package com.springsourize.controller;

import com.springsourize.dto.CreateUserRequest;
import com.springsourize.dto.LoginUserRequest;
import com.springsourize.model.UserEntity;
import com.springsourize.service.UserService;
import org.springframework.http.HttpStatus;
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
    public ResponseEntity<Object> login(@RequestBody LoginUserRequest loginUserRequest) {
        try {
            UserEntity user = userService.loginUser(loginUserRequest);

            // Başarılı giriş durumunda kullanıcı bilgilerini döndür
            return ResponseEntity.ok(user);
        } catch (IllegalArgumentException e) {
            // Hatalı giriş durumunda hata mesajını döndür
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

}

