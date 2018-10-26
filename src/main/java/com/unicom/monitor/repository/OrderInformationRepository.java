package com.unicom.monitor.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.unicom.monitor.entity.OrderInformation;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderInformationRepository extends JpaRepository<OrderInformation,Long> {
    @Query("select t from OrderInformation t where version_control = :version and rownum=1 order by t.record_time desc ")
    OrderInformation findByAll(@Param("version") String version);
}
