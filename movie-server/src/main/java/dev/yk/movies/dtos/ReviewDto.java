package dev.yk.movies.dtos;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

public record ReviewDto(
        String reviewBody,
        String imdbId
) {}
