package com.unicom.monitor.repository;

import com.unicom.monitor.entity.TradeInformation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TradeInformationRepository extends JpaRepository<TradeInformation,Long> {
    @Query("select t from TradeInformation t where version_control = :version  order by t.record_time desc ")
    TradeInformation findByAll(@Param("version") String version);
}
