package com.unicom.monitor.repository;

import com.unicom.monitor.entity.TradeInformation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TradeInformationRepository extends JpaRepository<TradeInformation,Long> {
    @Query("select t from TradeInformation t where version_control = :version and rownum<=96 order by t.record_time desc ")
    List<TradeInformation> findByAll(@Param("version") String version);
}
