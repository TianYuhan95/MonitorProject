package com.unicom.monitor.repository;

import com.unicom.monitor.entity.AllInformation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AllInformationRepository extends JpaRepository<AllInformation,Long> {
    @Query("select t from AllInformation t where t.is_valid=1")
    List<AllInformation> findByAll();
}
