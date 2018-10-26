package com.unicom.monitor.entity;

import javax.persistence.*;

/**
 * author:田宇寒
 * remark:停机汇总实体类
 */
@Entity
@IdClass(UnionPK_nettype_time.class)
@Table(name = "BTOCB_MONITOR_STOP_SUM")
public class StopSum {
    //记录时间点
    private String record_time;
    //网别
    private String net_type_code;
    //记录总数
    private String sum_num;
    //更新时间
    private String update_time;
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

    public String getSum_num() {
        return sum_num;
    }

    public void setSum_num(String sum_num) {
        this.sum_num = sum_num;
    }

    public String getUpdate_time() {
        return update_time;
    }

    public void setUpdate_time(String update_time) {
        this.update_time = update_time;
    }
}
