package com.viet.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.viet.model.Category;
import com.viet.repository.CategoryRepository;

@RestController
@RequestMapping(value = "/api/categories", produces = {MediaType.APPLICATION_JSON_VALUE})
@CrossOrigin(origins = "http://localhost:3000")
public class CategoryController {
    @Autowired
    private CategoryRepository categoryRepository;

    @RequestMapping(value = "", method = RequestMethod.GET)
    public ResponseEntity<List<Category>> findAll() {
        List<Category> categoryList = categoryRepository.findAll();
        return new ResponseEntity<>(categoryList, HttpStatus.OK);
        // hello
        // hi
    }
}
