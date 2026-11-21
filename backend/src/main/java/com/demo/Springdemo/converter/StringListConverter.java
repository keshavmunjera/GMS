package com.demo.Springdemo.converter;

import com.fasterxml.jackson.core.type.TypeReference;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.util.ArrayList;
import java.util.List;

@Converter(autoApply = false)
public class StringListConverter implements AttributeConverter<List<String>, String> {

    private static final TypeReference<List<String>> TYPE_REF = new TypeReference<>() {};

    @Override
    public String convertToDatabaseColumn(List<String> attribute) {
        return JsonConverterUtil.toJson(attribute);
    }

    @Override
    public List<String> convertToEntityAttribute(String dbData) {
        List<String> result = JsonConverterUtil.fromJson(dbData, TYPE_REF);
        return result != null ? result : new ArrayList<>();
    }
}
