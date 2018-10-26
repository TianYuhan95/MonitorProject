package com.unicom.monitor.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.unicom.monitor.entity.LeaveRealFee;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LeaveRealFeeRepository extends JpaRepository<LeaveRealFee,Long> {
    @Query("SELECT t from LeaveRealFee t where version_control = :version and rownum<=96 order by t.record_time desc,t.net_type_code desc")
    List<LeaveRealFee> findByAll(@Param("version") String version);
}
