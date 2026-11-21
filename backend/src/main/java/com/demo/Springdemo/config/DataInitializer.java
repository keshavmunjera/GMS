package com.demo.Springdemo.config;

import com.demo.Springdemo.service.SeedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer implements CommandLineRunner {

    private final SeedService seedService;

    @Autowired
    public DataInitializer(SeedService seedService) {
        this.seedService = seedService;
    }

    @Override
    public void run(String... args) {
        seedService.seedInitialData(false);
    }
}
