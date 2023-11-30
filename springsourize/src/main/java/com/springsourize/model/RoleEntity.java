package com.springsourize.model;


import org.springframework.security.core.GrantedAuthority;

public enum RoleEntity implements GrantedAuthority {

    ROLE_USER("USER"),
    ROLE_ADMIN("ADMIN"),

    ROLE_MOD("MOD"),
    ROLE_FSK("FSK");

    ;


    private String value;

    RoleEntity(String value) {
        this.value = value;
    }

    public String getValue() {
        return this.value;
    }

    @Override
    public String getAuthority() {
        return name();
    }
}