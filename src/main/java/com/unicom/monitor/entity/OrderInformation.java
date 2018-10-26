package com.unicom.monitor.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

/**
 * author:田宇寒
 * remark:指令实体类
 */
@Entity
@Table(name = "BTOCB_MONITOR_ORDER_RESULT")
public class OrderInformation {
    //记录时间点
    private String record_time;
    //记录失败指令数
    private String order_fail;
    //记录等待指令数
    private String order_wait;
    //记录执行指令数
    private String order_exec;
    //记录成功指令数
    private String order_success;
    //记录总指令数
    private String order_sum;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public String getRecord_time() {
        return record_time;
    }

    public void setRecord_time(String record_time) {
        this.record_time = record_time;
    }

    public String getOrder_fail() {
        return order_fail;
    }

    public void setOrder_fail(String order_fail) {
        this.order_fail = order_fail;
    }

    public String getOrder_wait() {
        return order_wait;
    }

    public void setOrder_wait(String order_wait) {
        this.order_wait = order_wait;
    }

    public String getOrder_exec() {
        return order_exec;
    }

    public void setOrder_exec(String order_exec) {
        this.order_exec = order_exec;
    }

    public String getOrder_success() {
        return order_success;
    }

    public void setOrder_success(String order_success) {
        this.order_success = order_success;
    }

    public String getOrder_sum() {
        return order_sum;
    }

    public void setOrder_sum(String order_sum) {
        this.order_sum = order_sum;
    }
}
