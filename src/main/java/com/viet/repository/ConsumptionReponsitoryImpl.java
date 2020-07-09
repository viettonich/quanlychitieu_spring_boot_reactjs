package com.viet.repository;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;

@Repository
public class ConsumptionReponsitoryImpl {
    @PersistenceContext
    private EntityManager entityManager;

    @SuppressWarnings("unchecked")
    public List<Object[]> reportTotalAmountByDay() {
        return this.entityManager.createNativeQuery(
                "SELECT ngay_chi, sum(so_tien) as so_tien FROM `chitieu` WHERE month(ngay_chi)=month(CURRENT_DATE) GROUP BY ngay_chi ORDER BY ngay_chi")
                .getResultList();
    }

}
