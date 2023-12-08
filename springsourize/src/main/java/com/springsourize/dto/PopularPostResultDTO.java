package com.springsourize.dto;


import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;

public record PopularPostResultDTO(
        Long postId,
        String topicTitle,
        Long likeCount,
        Timestamp likeDate  // Add the likeDate field
) {
    public static PopularPostResultDTO fromResultSet(ResultSet resultSet) throws SQLException {
        Long postId = resultSet.getLong("post_id");
        String topicTitle = resultSet.getString("topic_title");
        Long likeCount = resultSet.getLong("like_count");
        Timestamp likeDate = resultSet.getTimestamp("likeDate");  // Retrieve likeDate from ResultSet
        return new PopularPostResultDTO(postId, topicTitle, likeCount, likeDate);
    }
}


