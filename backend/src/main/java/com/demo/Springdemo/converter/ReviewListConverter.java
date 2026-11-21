package com.demo.Springdemo.converter;

import com.demo.Springdemo.model.Review;
import com.fasterxml.jackson.core.type.TypeReference;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.util.ArrayList;
import java.util.List;

@Converter(autoApply = false)
public class ReviewListConverter implements AttributeConverter<List<Review>, String> {

    private static final TypeReference<List<Review>> TYPE_REF = new TypeReference<>() {};

    @Override
    public String convertToDatabaseColumn(List<Review> attribute) {
        return JsonConverterUtil.toJson(attribute);
    }

    @Override
    public List<Review> convertToEntityAttribute(String dbData) {
        List<Review> result = JsonConverterUtil.fromJson(dbData, TYPE_REF);
        return result != null ? result : new ArrayList<>();
    }
}
