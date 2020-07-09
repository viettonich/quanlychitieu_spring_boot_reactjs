package com.viet.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import com.viet.model.Category;

@Transactional(readOnly = true)
public interface CategoryRepository extends JpaRepository<Category, Integer> {

}
