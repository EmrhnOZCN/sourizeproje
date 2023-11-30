package com.springsourize.model;




public enum RoleEntity  {

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


}