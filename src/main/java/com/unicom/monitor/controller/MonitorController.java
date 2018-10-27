package com.unicom.monitor.controller;

import com.unicom.monitor.entity.*;
import com.unicom.monitor.service.MonitorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class MonitorController {
    @Autowired
    private MonitorService monitorService;

    public static List<LeaveRealFee> list_leave_real_fee = null;
    public static OrderInformation list_orderInformation = null;
    public static List<Paylog> list_payLog = null;
    public static List<StopSum> list_stopSum = null;
    public static  List<TradeInformation> list_tradeInformation = null;

    @RequestMapping(value = "/index",method = RequestMethod.GET)
    public String Index(Model model){
        try{
            model.addAttribute("allInformation",monitorService.AllInformation_findByAll().get(0));
            model.addAttribute("userDetail_byFee",monitorService.UserDetail_findByFee());
            model.addAttribute("userDetail_byStop",monitorService.UserDetail_findByStop());
            
        }catch (Exception e){
            e.printStackTrace();
            System.out.println("Index Controller Had Exception");
        }
        return "temp";
    }

    @ResponseBody
    @RequestMapping(value = "/index/allInformation", method = RequestMethod.POST)
    public List<AllInformation> allInformations() {
        List<AllInformation> list = null;
        list = monitorService.AllInformation_findByAll();
        return list;
    }

    @RequestMapping(value = "/index",method = RequestMethod.POST)
    public String Index(Model model, @RequestParam(value = "version") String version){
        System.out.println(version);
        try{
            model.addAttribute("allInformation",monitorService.AllInformation_findByAll(version));
            model.addAttribute("userDetail_byFee",monitorService.UserDetail_findByFee(version));
            model.addAttribute("userDetail_byStop",monitorService.UserDetail_findByStop(version));

        }catch (Exception e){
            e.printStackTrace();
            System.out.println("Index Controller Had Exception");
        }
        return "temp";
    }

    @CrossOrigin(origins = "*")
    @ResponseBody
    @RequestMapping(value = "/index/order",method = RequestMethod.POST)
    public OrderInformation orderInformation( @RequestParam(value = "version") String version){
        System.out.println(version);
        if(!(monitorService.Order_findAll(version)==null)){
            list_orderInformation = null;
            list_orderInformation = monitorService.Order_findAll(version);
        }
        return list_orderInformation;
    }

    @CrossOrigin(origins = "*")
    @ResponseBody
    @RequestMapping(value = "/index/trade",method = RequestMethod.POST)
    public List<TradeInformation> tradeInformation( @RequestParam(value = "version") String version){
        System.out.println(version);
        if(!(monitorService.Trade_findAll(version).isEmpty())){
            list_tradeInformation = null;
            list_tradeInformation = monitorService.Trade_findAll(version);
        }
        return list_tradeInformation;
    }

    @CrossOrigin(origins = "*")
    @ResponseBody
    @RequestMapping(value = "/index/leave_real_fee",method = RequestMethod.POST)
    public List<LeaveRealFee> leaveRealFee( @RequestParam(value = "version") String version){
        if(!(monitorService.leaveRealFee_findAll(version).isEmpty())){
            list_leave_real_fee = null;
            list_leave_real_fee = monitorService.leaveRealFee_findAll(version);
        }
        return list_leave_real_fee;
    }

    @CrossOrigin(origins = "*")
    @ResponseBody
    @RequestMapping(value = "/index/paylog",method = RequestMethod.POST)
    public List<Paylog> payLog( @RequestParam(value = "version") String version){
        if(!(monitorService.Paylog_findAll(version).isEmpty())){
            list_payLog = null;
            list_payLog = monitorService.Paylog_findAll(version);
        }
        return list_payLog;
    }

    @CrossOrigin(origins = "http://localhost:8080")
    @ResponseBody
    @RequestMapping(value = "/index/stop_sum",method = RequestMethod.POST)
    public List<StopSum> stopSum( @RequestParam(value = "version") String version){
        if(!(monitorService.StopSum_findAll(version).isEmpty())){
            list_stopSum = null;
            list_stopSum = monitorService.StopSum_findAll(version);
        }
        return list_stopSum;
    }

    /*@ResponseBody
    @RequestMapping(value = "/index/userdetail_byfee",method = RequestMethod.GET)
    public List<UserDetail> userDetailByFee(){
        List<UserDetail> userDetails = null;
        try{
            userDetails = monitorService.UserDetail_findByFee();
        }catch (Exception e){
            e.printStackTrace();
            System.out.println("Index Controller Had Exception");
        }
        return userDetails;
    }*/

    /*@ResponseBody
    @RequestMapping(value = "/index/userdetail_bystop",method = RequestMethod.GET)
    public List<UserDetail> userDetailByStop(){
        List<UserDetail> userDetails = null;
        try{
            userDetails = monitorService.UserDetail_findByStop();
        }catch (Exception e){
            e.printStackTrace();
            System.out.println("userDetailByStopController Had Exception");
        }
        return userDetails;
    }*/
}
