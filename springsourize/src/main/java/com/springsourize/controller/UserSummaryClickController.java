package com.springsourize.controller;

import com.springsourize.service.UserSummaryClickService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/public/summaryClick")
public class UserSummaryClickController {


    private final UserSummaryClickService userSummaryClickService;


    public UserSummaryClickController(UserSummaryClickService userSummaryClickService) {
        this.userSummaryClickService = userSummaryClickService;
    }


    @PostMapping("/click")
    public ResponseEntity<String> addSummaryClick(
            @RequestParam Long userId,
            @RequestParam Long postId
    ) {
        try {
            userSummaryClickService.addUserSummaryClick(userId, postId);
            return new ResponseEntity<>("Summary click added successfully.", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to add summary click: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
