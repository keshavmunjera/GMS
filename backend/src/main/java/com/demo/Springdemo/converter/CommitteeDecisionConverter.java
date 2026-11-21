package com.demo.Springdemo.converter;

import com.demo.Springdemo.model.CommitteeDecision;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = false)
public class CommitteeDecisionConverter implements AttributeConverter<CommitteeDecision, String> {

    @Override
    public String convertToDatabaseColumn(CommitteeDecision attribute) {
        return JsonConverterUtil.toJson(attribute);
    }

    @Override
    public CommitteeDecision convertToEntityAttribute(String dbData) {
        return JsonConverterUtil.fromJson(dbData, CommitteeDecision.class);
    }
}
