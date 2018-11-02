package com.unicom.monitor;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;

/**
 * author:田宇寒
 * remark:程序入口
 */
@SpringBootApplication
@ComponentScan(basePackages = "com.unicom.monitor")
public class MonitorApplication extends SpringBootServletInitializer {

    public static void main(String[] args) throws Exception{
        SpringApplication.run(MonitorApplication.class, args);
    }
}
