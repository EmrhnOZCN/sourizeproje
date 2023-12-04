package com.springsourize.dto;

import com.springsourize.model.CommentEntity;
import com.springsourize.model.LikeEntity;

public record LikeDto (long postId, long userId){
    public static LikeDto fromEntity(LikeEntity likeEntity) {
        return new LikeDto(

                likeEntity.getPost().getId(),
                likeEntity.getUser().getId()

        );
    }
}
