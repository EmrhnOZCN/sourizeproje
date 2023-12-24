package com.springsourize.model;


import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;


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




    @ManyToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST}, fetch = FetchType.EAGER)
    @JoinColumn(name = "role_id")
    private RoleEntity rolesEntity;

    @OneToMany(mappedBy = "sender", cascade = CascadeType.MERGE)
    private Set<SupportMessageEntity> sentMessages;

    @OneToMany(mappedBy = "recipient", cascade = CascadeType.MERGE)
    private Set<SupportMessageEntity> receivedMessages;





}
