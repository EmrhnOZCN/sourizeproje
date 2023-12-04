package com.springsourize.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;
import org.springframework.context.support.ResourceBundleMessageSource;

@Configuration
public class RestTemplateConfig {

    public RestTemplate restTemplate(){

        return new RestTemplate();
    }

 
}
