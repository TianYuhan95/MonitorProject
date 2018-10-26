package com.unicom.monitor.entity;

import javax.persistence.*;

@Entity
@Table(name = "BTOCB_MONITOR_ALLINFORMATION")
public class AllInformation {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    //迁转日期
    private String trans_date;
    //迁转名称
    private String trans_name;
    //迁转总数
    private String trans_all_num;
    //移网GSM数量
    private String trans_gsm_num;
    //宽固数量
    private String trans_adsl_num;
    //移网OCS数量
    private String trans_ocs_num;
    //APN数量
    private String trans_apn_num;
    //是否有效
    private String is_valid;
    //版本号为
    private String version_control;

    public String getTrans_date() {
        return trans_date;
    }

    public void setTrans_date(String trans_date) {
        this.trans_date = trans_date;
    }

    public String getTrans_name() {
        return trans_name;
    }

    public void setTrans_name(String trans_name) {
        this.trans_name = trans_name;
    }

    public String getTrans_all_num() {
        return trans_all_num;
    }

    public void setTrans_all_num(String trans_all_num) {
        this.trans_all_num = trans_all_num;
    }

    public String getTrans_gsm_num() {
        return trans_gsm_num;
    }

    public void setTrans_gsm_num(String trans_gsm_num) {
        this.trans_gsm_num = trans_gsm_num;
    }

    public String getTrans_adsl_num() {
        return trans_adsl_num;
    }

    public void setTrans_adsl_num(String trans_adsl_num) {
        this.trans_adsl_num = trans_adsl_num;
    }

    public String getTrans_ocs_num() {
        return trans_ocs_num;
    }

    public void setTrans_ocs_num(String trans_ocs_num) {
        this.trans_ocs_num = trans_ocs_num;
    }

    public String getTrans_apn_num() {
        return trans_apn_num;
    }

    public void setTrans_apn_num(String trans_apn_num) {
        this.trans_apn_num = trans_apn_num;
    }

    public String getIs_valid() {
        return is_valid;
    }

    public void setIs_valid(String is_valid) {
        this.is_valid = is_valid;
    }

    public String getVersion_control() {
        return version_control;
    }

    public void setVersion_control(String version_control) {
        this.version_control = version_control;
    }
}
