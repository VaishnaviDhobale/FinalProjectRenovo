package com.example.ReNovo.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Products")

public class ProductModel {

    @Id
    @GeneratedValue
    private long id;

    @Column
    private String productTitle;

    @Column
    private String category;

    @Column
    private String productCondition;

    @Column
    private String price;

    @Column
    private String sellPrice;

    @Column
    private String negotiable;

    @Column
    private String quantity;

    @Column
    private String description;

    @Column
    private String reason;

    @Column
    private String photo;
}
