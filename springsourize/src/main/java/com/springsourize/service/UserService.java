package com.springsourize.service;

import com.springsourize.dto.CreateUserRequest;
import com.springsourize.model.UserEntity;
import com.springsourize.repository.UserRepository;

import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {


    private final UserRepository userRepository;



    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;

    }





    public UserEntity createUser(CreateUserRequest createUserRequest){


        // Kullanıcı adının veritabanında mevcut olup olmadığını kontrol et
        Optional<UserEntity> existingUser = userRepository.findByUsername(createUserRequest.username());
        if (existingUser.isPresent()) {
            throw new IllegalArgumentException("Bu kullanıcı adı zaten kullanılmaktadır.");
        }
        else {
        UserEntity newUser = UserEntity.builder()
                .firstName(createUserRequest.firstName())
                .lastName(createUserRequest.lastName())
                .username(createUserRequest.username())
                .password(createUserRequest.password())
                .authorities(createUserRequest.authorities())
                .accountNonExpired(true)
                .isCredentialsNonExpired(true)
                .isEnabled(true)
                .accountNonLocked(true)
                .build();

        return userRepository.save(newUser);}
    }





}
