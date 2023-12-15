package com.springsourize.dto.NewsDto;

import lombok.Data;

import java.util.Date;

@Data
public class Article {

    private Source source;
    private String author;
    private String title;
    private String description;
    private String url;
    private String urlToImage;
    private Date publishedAt;
    private String content;

}
