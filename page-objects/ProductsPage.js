import {expect} from "@playwright/test"
import { Navigation } from "./Navigation"

export class ProductsPage{
    constructor(page) {
        this.page = page
        this.addButtons = page.locator('[data-qa="product-button"]')
        this.sortDropdown = page.locator('[data-qa="sort-dropdown"]')
        this.productTittle = page.locator('[data-qa="product-title"]')
    }  // metodas

    visit = async() => { 
        await this.page.goto("/")
    }

    addProductToBasket = async (index) => {
        const specificAddButton = this.addButtons.nth(index)
        await specificAddButton.waitFor()
        await expect(specificAddButton).toHaveText("Add to Basket")
        const navigation = new Navigation(this.page)
        // only desktop viewpoint naudojama if for mobile
        const basketCountBeforeAdding = await navigation.getbasketCount()
        await specificAddButton.click()
        await expect(specificAddButton).toHaveText("Remove from Basket")
        // only desktop viewport getbasketCount
        const basketCountAfterAdding = await navigation.getbasketCount()
        expect(basketCountAfterAdding).toBeGreaterThan(basketCountBeforeAdding)

    }
    sortByCheapest = async () => {
        await this.sortDropdown.waitFor()
        // get order of product
        await this.productTittle.first().waitFor()
        const producttittleBeforeSorting = await this.productTittle.allInnerTexts()
        await this.sortDropdown.selectOption("price-asc")
        // get order of product
        const producttittleAfterSorting = await this.productTittle.allInnerTexts()

        // expect tet was correct
        expect(producttittleAfterSorting).not.toEqual(producttittleBeforeSorting)
    }
}