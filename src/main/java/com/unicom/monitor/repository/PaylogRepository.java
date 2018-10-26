package com.unicom.monitor.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.unicom.monitor.entity.Paylog;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PaylogRepository extends JpaRepository<Paylog,Long> {
    @Query("select t from Paylog t where version_control = :version and rownum<=96 order by t.record_time desc,t.net_type_code desc ")
    List<Paylog> findByAll(@Param("version") String version);
}
