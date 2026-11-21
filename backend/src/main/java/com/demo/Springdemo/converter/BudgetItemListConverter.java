package com.demo.Springdemo.converter;

import com.demo.Springdemo.model.BudgetItem;
import com.fasterxml.jackson.core.type.TypeReference;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.util.ArrayList;
import java.util.List;

@Converter(autoApply = false)
public class BudgetItemListConverter implements AttributeConverter<List<BudgetItem>, String> {

    private static final TypeReference<List<BudgetItem>> TYPE_REF = new TypeReference<>() {};

    @Override
    public String convertToDatabaseColumn(List<BudgetItem> attribute) {
        return JsonConverterUtil.toJson(attribute);
    }

    @Override
    public List<BudgetItem> convertToEntityAttribute(String dbData) {
        List<BudgetItem> result = JsonConverterUtil.fromJson(dbData, TYPE_REF);
        return result != null ? result : new ArrayList<>();
    }
}
