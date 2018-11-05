package com.unicom.monitor.configuration;

import org.springframework.boot.web.context.WebServerInitializedEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;
import org.springframework.util.Assert;

import java.net.InetAddress;
import java.net.UnknownHostException;

@Component
public class NetConfigInfo implements ApplicationListener<WebServerInitializedEvent> {

    private static int port;
    private static String ip = null;

    @Override
    public void onApplicationEvent(WebServerInitializedEvent event) {
        this.port = event.getWebServer().getPort();
        try{
            this.ip = InetAddress.getLocalHost().getHostAddress();
        }catch (UnknownHostException e){
            e.printStackTrace();
        }
    }

    public int getPort() {
        return this.port;
    }

    public String getIp() {
        return this.ip;
    }
}
