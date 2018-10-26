package com.unicom.monitor.entity;

import javax.persistence.*;

/**
 * author:田宇寒
 * remark:实时话费实体类
 */
@Entity
@IdClass(UnionPK_nettype_time.class)
@Table(name = "BTOCB_MONITOR_REALFEE_REPORT")
public class LeaveRealFee {
    //记录时间点
    private String record_time;
    //记录网别
    private String net_type_code;
    //记录总金额
    private String sum_fee;
    //更新时间点
    private String update_time;
    //版本号
    private String version_control;

    @Id
    public String getRecord_time() {
        return record_time;
    }

    public void setRecord_time(String record_time) {
        this.record_time = record_time;
    }
    @Id
    public String getNet_type_code() {
        return net_type_code;
    }

    public void setNet_type_code(String net_type_code) {
        this.net_type_code = net_type_code;
    }

    public String getSum_fee() {
        return sum_fee;
    }

    public void setSum_fee(String sum_fee) {
        this.sum_fee = sum_fee;
    }

    public String getUpdate_time() {
        return update_time;
    }

    public void setUpdate_time(String update_time) {
        this.update_time = update_time;
    }

    public String getVersion_control() {
        return version_control;
    }

    public void setVersion_control(String version_control) {
        this.version_control = version_control;
    }
}
