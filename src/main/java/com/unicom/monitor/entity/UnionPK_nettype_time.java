package com.unicom.monitor.entity;

import java.io.Serializable;

public class UnionPK_nettype_time implements Serializable {
    private String record_time;
    private String net_type_code;

    public String getRecord_time() {
        return record_time;
    }

    public void setRecord_time(String record_time) {
        this.record_time = record_time;
    }

    public String getNet_type_code() {
        return net_type_code;
    }

    public void setNet_type_code(String net_type_code) {
        this.net_type_code = net_type_code;
    }

    @Override
    public boolean equals(Object o) {
        if(o instanceof UnionPK_nettype_time) {
            UnionPK_nettype_time pk = (UnionPK_nettype_time)o;
            if(this.record_time.equals(pk.getRecord_time()) && this.net_type_code.equals(pk.getNet_type_code())) {
                return true;
            }
        }
        return false;
    }

    @Override
    public int hashCode() {
        return this.hashCode();
    }
}
