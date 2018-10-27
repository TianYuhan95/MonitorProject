package com.unicom.monitor.entity;

import javax.persistence.*;

/**
 * author:田宇寒
 * remark:详细用户实体类
 */
@Entity
@Table(name = "BTOCB_MONITOR_REALFEE_USER")
public class UserDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    //号码
    private String serial_number;
    //网别
    private String net_type_code;
    //费用
    private String leave_real_fee;
    //上月费用
    private String lastmonth_fee;
    //是否停机
    private String is_innet;
    //更新时间
    private String update_time;
    //停机时间
    private String stop_time;
    //版本号
    private String version_control;

    public String getNet_type_code() {
        return net_type_code;
    }

    public void setNet_type_code(String net_type_code) {
        this.net_type_code = net_type_code;
    }

    public String getSerial_number() {
        return serial_number;
    }

    public void setSerial_number(String serial_number) {
        this.serial_number = serial_number;
    }

    public String getLeave_real_fee() {
        return leave_real_fee;
    }

    public void setLeave_real_fee(String leave_real_fee) {
        this.leave_real_fee = leave_real_fee;
    }

    public String getIs_innet() {
        return is_innet;
    }

    public void setIs_innet(String is_innet) {
        this.is_innet = is_innet;
    }

    public String getUpdate_time() {
        return update_time;
    }

    public void setUpdate_time(String update_time) {
        this.update_time = update_time;
    }

    public String getLastmonth_fee() {
        return lastmonth_fee;
    }

    public void setLastmonth_fee(String lastmonth_fee) {
        this.lastmonth_fee = lastmonth_fee;
    }

    public String getStop_time() {
        return stop_time;
    }

    public void setStop_time(String stop_time) {
        this.stop_time = stop_time;
    }

    public String getVersion_control() {
        return version_control;
    }

    public void setVersion_control(String version_control) {
        this.version_control = version_control;
    }
}
