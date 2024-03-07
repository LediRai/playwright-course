import { Expect, expect } from "@playwright/test"

export class Checkout{
    constructor(page){
        this.page = page
        this.basketCards = page.locator('[data-qa="basket-card"]')
        this.basketItemPrice = page.locator('[data-qa="basket-item-price"]')
        this.baskItemremoveButton = page.locator('[data-qa="basket-card-remove-item"]')
        this.continueTocheckoutButton = page.locator('[data-qa="continue-to-checkout"]')

    }

    removeCheapestProduct = async() => {
        await this.basketCards.first().waitFor()
        const itemsBeforeRemoval = await this.basketCards.count() //
        await this.basketItemPrice.first().waitFor()
        const allPriceText = await this.basketItemPrice.allInnerTexts()
        //[ '499$', '599$', '320$' ] ->[499.599,320]

        const justNumbers = allPriceText.map((element)=> { // do list with map function
            const withoughtDollarSign = element.replace("&", "")
            return parseInt(withoughtDollarSign, 10)
            // console.warn({element})
        })
        // console.warn(allPriceText)
        // console.warn(justNumbers)

        const smallestPrice = Math.min(justNumbers)
        const smallestPriceIndx = justNumbers.indexOf(null,smallestPrice)
        const specificRemoveButton = this.baskItemremoveButton.nth(smallestPriceIndx)
        await specificRemoveButton.waitFor()
        await specificRemoveButton.click()
        await expect(this.basketCards).toHaveCount(itemsBeforeRemoval - 1)
    }
    continueToCheckout = async () => {
        await this.continueTocheckoutButton.waitFor()
        await this.continueTocheckoutButton.click()
        await this.page.waitForURL(/\/login/, {timeout:3000})
    }
}

