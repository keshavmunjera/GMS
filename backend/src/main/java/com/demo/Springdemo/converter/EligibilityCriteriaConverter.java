package com.demo.Springdemo.converter;

import com.demo.Springdemo.model.EligibilityCriteria;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = false)
public class EligibilityCriteriaConverter implements AttributeConverter<EligibilityCriteria, String> {

    @Override
    public String convertToDatabaseColumn(EligibilityCriteria attribute) {
        return JsonConverterUtil.toJson(attribute);
    }

    @Override
    public EligibilityCriteria convertToEntityAttribute(String dbData) {
        return JsonConverterUtil.fromJson(dbData, EligibilityCriteria.class);
    }
}
