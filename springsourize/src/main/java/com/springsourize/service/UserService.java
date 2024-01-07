package com.springsourize.service;

import com.springsourize.dto.CreateUserRequest;
import com.springsourize.dto.LoginUserRequest;
import com.springsourize.model.RoleEntity;
import com.springsourize.model.UserEntity;
import com.springsourize.repository.UserRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class UserService {

    private final UserRepository userRepository;


    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;

    }

    public Optional<UserEntity> findByUsername(String username){

        Optional<UserEntity> user = userRepository.findByUsername(username);

        return user;


    }


    public Optional<UserEntity> findUserNameById(long id) {
        return userRepository.findById(id);
    }



    public UserEntity createUser(CreateUserRequest createUserRequest) {
        // Kullanıcı adının veritabanında mevcut olup olmadığını kontrol et
        Optional<UserEntity> existingUser = findByUsername(createUserRequest.username());
        if (existingUser.isPresent()) {
            throw new IllegalArgumentException("Bu kullanıcı adı zaten kullanılmaktadır.");
        } else {

            RoleEntity roleEntity = new RoleEntity();
            roleEntity.setRole("ROLE_USER");
            roleEntity.setLastUpdated(LocalDateTime.now() );
            UserEntity newUser = UserEntity.builder()
                    .firstName(createUserRequest.firstName())
                    .lastName(createUserRequest.lastName())
                    .username(createUserRequest.username())
                    .password(createUserRequest.password())
                    .rolesEntity(roleEntity)
                    .accountNonExpired(true)
                    .isCredentialsNonExpired(true)
                    .isEnabled(true)
                    .accountNonLocked(true)
                    .build();

            return userRepository.save(newUser);
        }

    }


    public UserEntity loginUser(LoginUserRequest loginUserRequest) {
        String username = loginUserRequest.username();
        String password = loginUserRequest.password();

        System.out.println(username);
        System.out.println(password);
        Optional<UserEntity> userOptional = userRepository.findByUsername(username);


        if (userOptional.isPresent()) {
            UserEntity user = userOptional.get();


            String passw = user.getPassword();

            // Şifreyi kontrol et (basit bir şifre kontrolü)
            if (password.equals( passw)) {


                // Başarılı giriş
                return user;
            } else {
                // Hatalı şifre
                throw new IllegalArgumentException("Hatalı şifre");
            }
        } else {
            // Kullanıcı bulunamadı
            throw new IllegalArgumentException("Kullanıcı bulunamadı");
        }
    }
    public void upgradeToPremium(Long userId) {
        Optional<UserEntity> userOptional = userRepository.findById(userId);

        if (userOptional.isPresent()) {
            UserEntity user = userOptional.get();

            if ("ROLE_USER".equals(user.getRolesEntity().getRole())) {
                // Kullanıcının rolünü güncelle
                user.getRolesEntity().setRole("ROLE_PREMIUM");

                // Kullanıcıyı kaydet
                userRepository.save(user);
            } else {
                throw new IllegalArgumentException("Kullanıcı zaten ROLE_PREMIUM rolüne sahip veya başka bir rolü var.");
            }
        } else {
            throw new IllegalArgumentException("Kullanıcı bulunamadı");
        }
    }

    public long getTotalUserCount() {
        return userRepository.count();
    }


    public long getCountUsersByRole(String roleName) {
        return userRepository.countByRolesEntityRole(roleName);
    }
}
