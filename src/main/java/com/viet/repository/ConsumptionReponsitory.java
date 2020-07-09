package com.viet.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.viet.model.Consumption;

@Transactional(readOnly = true)
public interface ConsumptionReponsitory extends JpaRepository<Consumption, Integer> {

    @Query(value = "SELECT * FROM `chitieu` WHERE DATEDIFF(?1, ngay_chi) = 0", nativeQuery = true)
    public List<Consumption> findByDateCreate(String dateCreate);

    @Query(value = "SELECT * FROM `chitieu` WHERE YEAR(ngay_chi) = ?1 AND MONTH(ngay_chi) = ?2 ORDER BY ngay_chi DESC", nativeQuery = true)
    public Page<Consumption> findByDateCreateMonth(String year, String month, Pageable pageable);

    @Query(value = "SELECT SUM(so_tien) FROM `chitieu` WHERE YEAR(ngay_chi) = ?1 AND MONTH(ngay_chi) = ?2", nativeQuery = true)
    public int totalAmount(String year, String month);
    
    @Query(value = "SELECT * FROM `chitieu` WHERE YEAR(ngay_chi) = ?1 AND MONTH(ngay_chi) = ?2 ORDER BY ngay_chi DESC", nativeQuery = true)
    public List<Consumption> findByDateCreateMonth(String year, String month);

}
