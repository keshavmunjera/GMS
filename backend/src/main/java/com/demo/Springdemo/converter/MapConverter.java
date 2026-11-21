package com.demo.Springdemo.converter;

import com.fasterxml.jackson.core.type.TypeReference;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.util.HashMap;
import java.util.Map;

@Converter(autoApply = false)
public class MapConverter implements AttributeConverter<Map<String, Object>, String> {

    private static final TypeReference<Map<String, Object>> TYPE_REF = new TypeReference<>() {};

    @Override
    public String convertToDatabaseColumn(Map<String, Object> attribute) {
        return JsonConverterUtil.toJson(attribute);
    }

    @Override
    public Map<String, Object> convertToEntityAttribute(String dbData) {
        Map<String, Object> result = JsonConverterUtil.fromJson(dbData, TYPE_REF);
        return result != null ? result : new HashMap<>();
    }
}
