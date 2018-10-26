package com.unicom.monitor.service;

import com.unicom.monitor.entity.*;
import com.unicom.monitor.repository.*;
import com.unicom.monitor.repository.TradeInformationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MonitorService {
    @Autowired
    private LeaveRealFeeRepository leaveRealFeeRepository;
    @Autowired
    private OrderInformationRepository orderInformationRepository;
    @Autowired
    private PaylogRepository paylogRepository;
    @Autowired
    private StopSumRepository stopSumRepository;
    @Autowired
    private UserDetailRepository userDetailRepository;
    @Autowired
    private AllInformationRepository allInformationRepository;
    @Autowired
    private TradeInformationRepository tradeInformationRepository;

    public List<LeaveRealFee> leaveRealFee_findAll(String version){
        List<LeaveRealFee> list = null;
        try{
            list = leaveRealFeeRepository.findByAll(version);
        }catch (Exception e){
            e.printStackTrace();
            System.out.println("Leave_Real_Fee Service Had Exception");
        }
        return list;
    }

    public OrderInformation Order_findAll(String version){
        OrderInformation list = null;
        try{
            list = orderInformationRepository.findByAll(version);
        }catch (Exception e){
            e.printStackTrace();
            System.out.println("Order Service Had Exception");
        }
        return list;
    }

    public List<TradeInformation> Trade_findAll(String version){
        List<TradeInformation> list = null;
        try{
            list = tradeInformationRepository.findByAll(version);
        }catch (Exception e){
            e.printStackTrace();
            System.out.println("Trade Service Had Exception");
        }
        return list;
    }

    public List<Paylog> Paylog_findAll(String version){
        List<Paylog> list = null;
        try{
            list = paylogRepository.findByAll(version);
        }catch (Exception e){
            e.printStackTrace();
            System.out.println("Paylog Service Had Exception");
        }
        return list;
    }

    public List<StopSum> StopSum_findAll(String version){
        List<StopSum> list = null;
        try{
            list = stopSumRepository.findByAll(version);
        }catch (Exception e){
            e.printStackTrace();
            System.out.println("StopSum Service Had Exception");
        }
        return list;
    }

    public List<UserDetail> UserDetail_findByFee(){
        List<UserDetail> list = null;
        try{
            list = userDetailRepository.findAllByFee();
        }catch (Exception e){
            e.printStackTrace();
            System.out.println("UserDetail Had Exception");
        }
        return list;
    }

    public List<UserDetail> UserDetail_findByFee(String version){
        List<UserDetail> list = null;
        try{
            list = userDetailRepository.findAllByFee(version);
        }catch (Exception e){
            e.printStackTrace();
            System.out.println("UserDetail Had Exception");
        }
        return list;
    }

    public List<UserDetail> UserDetail_findByStop(){
        List<UserDetail> list = null;
        try{
            list = userDetailRepository.findAllByStop();
        }catch (Exception e){
            e.printStackTrace();
            System.out.println("UserDetai_FindByStop Had Exception");
        }
        return list;
    }

    public List<UserDetail> UserDetail_findByStop(String version){
        List<UserDetail> list = null;
        try{
            list = userDetailRepository.findAllByStop(version);
        }catch (Exception e){
            e.printStackTrace();
            System.out.println("UserDetai_FindByStop Had Exception");
        }
        return list;
    }

    public List<AllInformation> AllInformation_findByAll(){
        List<AllInformation> list = null;
        try{
            list = allInformationRepository.findByAll();
        }catch (Exception e){
            e.printStackTrace();
            System.out.println("AllInformation_FindByAll Service Had Exception");
        }
        return list;
    }
}
