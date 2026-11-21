package com.demo.Springdemo.converter;

import com.demo.Springdemo.model.RubricCriterion;
import com.fasterxml.jackson.core.type.TypeReference;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.util.ArrayList;
import java.util.List;

@Converter(autoApply = false)
public class RubricCriteriaListConverter implements AttributeConverter<List<RubricCriterion>, String> {

    private static final TypeReference<List<RubricCriterion>> TYPE_REF = new TypeReference<>() {};

    @Override
    public String convertToDatabaseColumn(List<RubricCriterion> attribute) {
        return JsonConverterUtil.toJson(attribute);
    }

    @Override
    public List<RubricCriterion> convertToEntityAttribute(String dbData) {
        List<RubricCriterion> result = JsonConverterUtil.fromJson(dbData, TYPE_REF);
        return result != null ? result : new ArrayList<>();
    }
}
