package com.unicom.monitor.entity;

import javax.persistence.*;

@Entity
@Table(name = "BTOCB_MONITOR_TRADE_RESULT")
public class TradeInformation {
    //记录时间点
    private String record_time;
    //记录失败指令数
    private String trade_fail;
    //记录等待指令数
    private String trade_wait;
    //记录执行指令数
    private String trade_exec;
    //记录成功指令数
    private String trade_success;
    //记录总指令数
    private String trade_sum;
    //版本号
    private String version_control;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public String getRecord_time() {
        return record_time;
    }

    public void setRecord_time(String record_time) {
        this.record_time = record_time;
    }

    public String getTrade_fail() {
        return trade_fail;
    }

    public void setTrade_fail(String trade_fail) {
        this.trade_fail = trade_fail;
    }

    public String getTrade_wait() {
        return trade_wait;
    }

    public void setTrade_wait(String trade_wait) {
        this.trade_wait = trade_wait;
    }

    public String getTrade_exec() {
        return trade_exec;
    }

    public void setTrade_exec(String trade_exec) {
        this.trade_exec = trade_exec;
    }

    public String getTrade_success() {
        return trade_success;
    }

    public void setTrade_success(String trade_success) {
        this.trade_success = trade_success;
    }

    public String getTrade_sum() {
        return trade_sum;
    }

    public void setTrade_sum(String trade_sum) {
        this.trade_sum = trade_sum;
    }

    public String getVersion_control() {
        return version_control;
    }

    public void setVersion_control(String version_control) {
        this.version_control = version_control;
    }
}
