package com.unicom.monitor.repository;

import com.unicom.monitor.entity.UserDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserDetailRepository extends JpaRepository<UserDetail,Long> {
    @Query("select t from UserDetail t where version_control = :version and rownum<=10 order by TO_NUMBER(t.leave_real_fee) desc")
    List<UserDetail> findAllByFee(@Param("version") String version);

    @Query("select t from UserDetail t where rownum<=10 order by TO_NUMBER(t.leave_real_fee) desc")
    List<UserDetail> findAllByFee();

    @Query("select t from UserDetail t where version_control = :version and t.is_innet='1' and rownum<=10 order by STOP_TIME desc")
    List<UserDetail> findAllByStop(@Param("version") String version);

    @Query("select t from UserDetail t where t.is_innet='1' and rownum<=10 order by STOP_TIME desc")
    List<UserDetail> findAllByStop();
}
