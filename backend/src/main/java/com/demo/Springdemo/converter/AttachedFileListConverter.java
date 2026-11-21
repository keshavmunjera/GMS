package com.demo.Springdemo.converter;

import com.demo.Springdemo.model.AttachedFile;
import com.fasterxml.jackson.core.type.TypeReference;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.util.ArrayList;
import java.util.List;

@Converter(autoApply = false)
public class AttachedFileListConverter implements AttributeConverter<List<AttachedFile>, String> {

    private static final TypeReference<List<AttachedFile>> TYPE_REF = new TypeReference<>() {};

    @Override
    public String convertToDatabaseColumn(List<AttachedFile> attribute) {
        return JsonConverterUtil.toJson(attribute);
    }

    @Override
    public List<AttachedFile> convertToEntityAttribute(String dbData) {
        List<AttachedFile> result = JsonConverterUtil.fromJson(dbData, TYPE_REF);
        return result != null ? result : new ArrayList<>();
    }
}
