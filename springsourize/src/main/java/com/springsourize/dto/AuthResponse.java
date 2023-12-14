package com.springsourize.dto;

import com.springsourize.model.LikeEntity;

import lombok.Data;

@Data
public class AuthResponse {

    String firstName;

    String lastName;
    Long userId;

    String role;
    boolean isEnabled;


}
