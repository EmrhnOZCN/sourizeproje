package com.springsourize.model;


import jakarta.persistence.*;
import lombok.*;



import java.util.Collection;
import java.util.Set;

@Entity
@Table(name = "users")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserEntity  {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;

    private String lastName;

    private String username;

    private String password;


    private boolean accountNonExpired;

    private boolean isEnabled;

    private boolean accountNonLocked;

    private boolean isCredentialsNonExpired;




    @ManyToOne(cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    @JoinColumn(name = "role_id")
    private RoleEntity  rolesEntity;

    @OneToMany(mappedBy = "author", cascade = CascadeType.REMOVE)
    private Set<CommentEntity> comments;

    @OneToMany(mappedBy = "sender", cascade = CascadeType.REMOVE)
    private Set<SupportMessageEntity> sentMessages;

    @OneToMany(mappedBy = "recipient", cascade = CascadeType.REMOVE)
    private Set<SupportMessageEntity> receivedMessages;


    public void removeComment(CommentEntity comment) {
        comments.remove(comment);
    }


}
