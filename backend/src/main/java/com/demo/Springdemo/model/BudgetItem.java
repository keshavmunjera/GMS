package com.demo.Springdemo.model;

import java.io.Serializable;

public class BudgetItem implements Serializable {
    private String category;
    private Double amount;

    public BudgetItem() {}

    public BudgetItem(String category, Double amount) {
        this.category = category;
        this.amount = amount;
    }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private String category;
        private Double amount;

        public Builder category(String category) { this.category = category; return this; }
        public Builder amount(Double amount) { this.amount = amount; return this; }

        public BudgetItem build() {
            return new BudgetItem(category, amount);
        }
    }
}
