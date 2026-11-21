package com.demo.Springdemo.dto;

public class PaymentProcessRequest {
    private String paymentMethod;
    private String referenceCode;
    private String notes;
    private String role;

    public PaymentProcessRequest() {}

    public PaymentProcessRequest(String paymentMethod, String referenceCode, String notes, String role) {
        this.paymentMethod = paymentMethod;
        this.referenceCode = referenceCode;
        this.notes = notes;
        this.role = role;
    }

    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }

    public String getReferenceCode() { return referenceCode; }
    public void setReferenceCode(String referenceCode) { this.referenceCode = referenceCode; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}
