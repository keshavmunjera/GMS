package com.demo.Springdemo.model;

import java.io.Serializable;

public class AttachedFile implements Serializable {
    private String name;
    private String size;
    private String uploadedAt;

    public AttachedFile() {}

    public AttachedFile(String name, String size, String uploadedAt) {
        this.name = name;
        this.size = size;
        this.uploadedAt = uploadedAt;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getSize() { return size; }
    public void setSize(String size) { this.size = size; }

    public String getUploadedAt() { return uploadedAt; }
    public void setUploadedAt(String uploadedAt) { this.uploadedAt = uploadedAt; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private String name;
        private String size;
        private String uploadedAt;

        public Builder name(String name) { this.name = name; return this; }
        public Builder size(String size) { this.size = size; return this; }
        public Builder uploadedAt(String uploadedAt) { this.uploadedAt = uploadedAt; return this; }

        public AttachedFile build() {
            return new AttachedFile(name, size, uploadedAt);
        }
    }
}
