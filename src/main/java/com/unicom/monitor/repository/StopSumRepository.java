package com.unicom.monitor.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.unicom.monitor.entity.StopSum;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StopSumRepository extends JpaRepository<StopSum,Long> {
    @Query("select t from StopSum t where version_control = :version and rownum<=96 order by t.record_time desc,t.net_type_code desc ")
    List<StopSum> findByAll(@Param("version") String version);
}
