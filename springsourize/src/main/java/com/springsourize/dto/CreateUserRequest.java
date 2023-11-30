package com.springsourize.dto;

import com.springsourize.model.RoleEntity;
import lombok.Builder;

import java.util.Set;


public record CreateUserRequest(


         String firstName,

         String lastName,

         String username,

         String password,

         Set<RoleEntity> authorities




) {
}
