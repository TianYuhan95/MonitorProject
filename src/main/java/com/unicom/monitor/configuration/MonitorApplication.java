package com.unicom.monitor.configuration;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

/**
 * author:田宇寒
 * remark:程序入口
 */
@SpringBootApplication
@ComponentScan(basePackages = "com.unicom.monitor")
public class MonitorApplication {

    public static void main(String[] args) throws Exception{
        SpringApplication.run(MonitorApplication.class, args);
    }
}
