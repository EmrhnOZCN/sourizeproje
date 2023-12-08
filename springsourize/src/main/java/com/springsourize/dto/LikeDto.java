package com.springsourize.dto;

import com.springsourize.model.CommentEntity;
import com.springsourize.model.LikeEntity;

import java.util.Date;

public record LikeDto (long postId, long userId, Date likeDate){
    public static LikeDto fromEntity(LikeEntity likeEntity) {
        return new LikeDto(

                likeEntity.getPost().getId(),
                likeEntity.getUser().getId(),
                likeEntity.getLikeDate()

        );
    }
}
